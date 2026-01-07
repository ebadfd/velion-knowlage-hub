import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idea, Comment, Vote, Category, Attachment, User } from '../../entities';
import { CreateIdeaDto, UpdateIdeaDto, SearchIdeasDto, CreateCommentDto } from './dto';
import { AuditService } from '../audit/audit.service';
import { IdeaStatus, SystemRole } from '../../common/enums';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea)
    private ideaRepository: Repository<Idea>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
    private auditService: AuditService,
  ) { }

  async create(createIdeaDto: CreateIdeaDto, user: User) {
    if (createIdeaDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: createIdeaDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    const { originalityScore, duplicateOfId } = await this.checkOriginality(createIdeaDto.title, createIdeaDto.description);

    const idea = this.ideaRepository.create({
      title: createIdeaDto.title,
      description: createIdeaDto.description,
      categoryId: createIdeaDto.categoryId,
      officeId: createIdeaDto.officeId || user.officeId,
      submittedById: user.id,
      status: IdeaStatus.SUBMITTED,
      isOriginal: originalityScore >= 0.7,
      originalityScore,
      duplicateOfId,
    });

    const savedIdea = await this.ideaRepository.save(idea);

    if (createIdeaDto.attachmentUrls?.length) {
      const attachments = createIdeaDto.attachmentUrls.map((url) =>
        this.attachmentRepository.create({ url, ideaId: savedIdea.id }),
      );
      await this.attachmentRepository.save(attachments);
    }

    await this.auditService.log({
      action: 'CREATE_IDEA',
      entityType: 'Idea',
      entityId: savedIdea.id,
      actorId: user.id,
      newValues: { title: savedIdea.title, status: savedIdea.status },
    });

    return this.findOne(savedIdea.id);
  }

  async findAll(searchDto: SearchIdeasDto) {
    const {
      title,
      keyword,
      categoryId,
      officeId,
      submittedById,
      status,
      isOriginal,
      page = 1,
      limit = 20,
      sortBy = 'submissionDate',
      sortOrder = 'DESC',
    } = searchDto;

    const queryBuilder = this.ideaRepository
      .createQueryBuilder('idea')
      .leftJoinAndSelect('idea.submittedBy', 'submittedBy')
      .leftJoinAndSelect('idea.category', 'category')
      .leftJoinAndSelect('idea.office', 'office');

    if (title) {
      queryBuilder.andWhere('idea.title ILIKE :title', { title: `%${title}%` });
    }

    if (keyword) {
      queryBuilder.andWhere(
        '(idea.title ILIKE :keyword OR idea.description ILIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    if (categoryId) {
      queryBuilder.andWhere('idea.categoryId = :categoryId', { categoryId });
    }

    if (officeId) {
      queryBuilder.andWhere('idea.officeId = :officeId', { officeId });
    }

    if (submittedById) {
      queryBuilder.andWhere('idea.submittedById = :submittedById', { submittedById });
    }

    if (status) {
      queryBuilder.andWhere('idea.status = :status', { status });
    }

    if (isOriginal !== undefined) {
      queryBuilder.andWhere('idea.isOriginal = :isOriginal', { isOriginal });
    }

    queryBuilder.orderBy(`idea.${sortBy}`, sortOrder);

    const [ideas, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: ideas,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['submittedBy', 'category', 'office', 'attachments', 'comments', 'comments.author', 'votes'],
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    return idea;
  }

  async update(id: string, updateIdeaDto: UpdateIdeaDto, user: User) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['submittedBy'],
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    const isOwner = idea.submittedById === user.id;
    const isAdmin = user.roles?.some((r) =>
      [SystemRole.SYSTEM_ADMIN, SystemRole.LOCAL_OFFICE_ADMIN, SystemRole.INNOVATION_MANAGER].includes(r.name as SystemRole),
    );

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not authorized to update this idea');
    }

    if (isOwner && !isAdmin && idea.status !== IdeaStatus.SUBMITTED && idea.status !== IdeaStatus.CHANGES_REQUESTED) {
      throw new BadRequestException('Can only edit ideas in SUBMITTED or CHANGES_REQUESTED status');
    }

    const previousValues = {
      title: idea.title,
      description: idea.description,
      status: idea.status,
    };

    if (updateIdeaDto.title || updateIdeaDto.description) {
      const { originalityScore, duplicateOfId } = await this.checkOriginality(
        updateIdeaDto.title || idea.title,
        updateIdeaDto.description || idea.description,
        idea.id,
      );
      idea.originalityScore = originalityScore;
      idea.isOriginal = originalityScore >= 0.7;
      idea.duplicateOfId = duplicateOfId;
    }

    Object.assign(idea, updateIdeaDto);
    const savedIdea = await this.ideaRepository.save(idea);

    await this.auditService.log({
      action: 'UPDATE_IDEA',
      entityType: 'Idea',
      entityId: savedIdea.id,
      actorId: user.id,
      previousValues,
      newValues: updateIdeaDto,
    });

    return this.findOne(savedIdea.id);
  }

  async addComment(ideaId: string, createCommentDto: CreateCommentDto, user: User) {
    const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      ideaId,
      authorId: user.id,
    });

    const savedComment = await this.commentRepository.save(comment);

    await this.auditService.log({
      action: 'ADD_COMMENT',
      entityType: 'Comment',
      entityId: savedComment.id,
      actorId: user.id,
      newValues: { ideaId, content: createCommentDto.content },
    });

    return this.commentRepository.findOne({
      where: { id: savedComment.id },
      relations: ['author'],
    });
  }

  async deleteComment(ideaId: string, commentId: string, user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, ideaId },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const isOwner = comment.authorId === user.id;
    const isModerator = user.roles?.some((r) =>
      [SystemRole.SYSTEM_ADMIN, SystemRole.KNOWLEDGE_CHAMPION, SystemRole.INNOVATION_MANAGER].includes(r.name as SystemRole),
    );

    if (!isOwner && !isModerator) {
      throw new ForbiddenException('Not authorized to delete this comment');
    }

    await this.commentRepository.remove(comment);

    await this.auditService.log({
      action: 'DELETE_COMMENT',
      entityType: 'Comment',
      entityId: commentId,
      actorId: user.id,
      previousValues: { content: comment.content },
    });

    return { message: 'Comment deleted successfully' };
  }

  async vote(ideaId: string, user: User) {
    const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    if (idea.submittedById === user.id) {
      throw new BadRequestException('Cannot vote on your own idea');
    }

    const existingVote = await this.voteRepository.findOne({
      where: { ideaId, voterId: user.id },
    });

    if (existingVote) {
      throw new BadRequestException('Already voted on this idea');
    }

    const vote = this.voteRepository.create({
      ideaId,
      voterId: user.id,
    });

    await this.voteRepository.save(vote);

    idea.voteCount += 1;
    await this.ideaRepository.save(idea);

    await this.auditService.log({
      action: 'VOTE_IDEA',
      entityType: 'Vote',
      entityId: vote.id,
      actorId: user.id,
      newValues: { ideaId },
    });

    return { message: 'Vote recorded successfully', voteCount: idea.voteCount };
  }

  async unvote(ideaId: string, user: User) {
    const vote = await this.voteRepository.findOne({
      where: { ideaId, voterId: user.id },
    });

    if (!vote) {
      throw new NotFoundException('Vote not found');
    }

    await this.voteRepository.remove(vote);

    const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
    if (idea) {
      idea.voteCount = Math.max(0, idea.voteCount - 1);
      await this.ideaRepository.save(idea);
    }

    await this.auditService.log({
      action: 'UNVOTE_IDEA',
      entityType: 'Vote',
      entityId: vote.id,
      actorId: user.id,
      previousValues: { ideaId },
    });

    return { message: 'Vote removed successfully', voteCount: idea?.voteCount || 0 };
  }

  async getMyIdeas(user: User, searchDto: SearchIdeasDto) {
    return this.findAll({ ...searchDto, submittedById: user.id });
  }

  async getIdeasForReview(searchDto: SearchIdeasDto) {
    return this.findAll({ ...searchDto, status: IdeaStatus.SUBMITTED });
  }

  async getCategories() {
    return this.categoryRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  private async checkOriginality(
    title: string,
    description: string,
    excludeId?: string,
  ): Promise<{ originalityScore: number; duplicateOfId: string | null }> {
    const queryBuilder = this.ideaRepository
      .createQueryBuilder('idea')
      .where('idea.title ILIKE :title', { title: `%${title.substring(0, 50)}%` });

    if (excludeId) {
      queryBuilder.andWhere('idea.id != :excludeId', { excludeId });
    }

    const similar = await queryBuilder.getMany();

    if (similar.length === 0) {
      return { originalityScore: 1.0, duplicateOfId: null };
    }

    const titleLower = title.toLowerCase();
    for (const existing of similar) {
      const existingTitleLower = existing.title.toLowerCase();
      if (titleLower === existingTitleLower) {
        return { originalityScore: 0, duplicateOfId: existing.id };
      }

      const similarity = this.calculateSimilarity(titleLower, existingTitleLower);
      if (similarity > 0.8) {
        return { originalityScore: 1 - similarity, duplicateOfId: existing.id };
      }
    }

    return { originalityScore: 0.85, duplicateOfId: null };
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = new Set(str1.split(/\s+/));
    const words2 = new Set(str2.split(/\s+/));
    const intersection = new Set([...words1].filter((x) => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }
}
