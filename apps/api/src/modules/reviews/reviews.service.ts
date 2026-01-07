import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, Idea, User } from '../../entities';
import { CreateReviewDto, SearchReviewsDto } from './dto';
import { AuditService } from '../audit/audit.service';
import { ReviewDecision, IdeaStatus } from '../../common/enums';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Idea)
    private ideaRepository: Repository<Idea>,
    private auditService: AuditService,
  ) {}

  async create(createReviewDto: CreateReviewDto, reviewer: User) {
    const idea = await this.ideaRepository.findOne({
      where: { id: createReviewDto.ideaId },
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    if (idea.submittedById === reviewer.id) {
      throw new BadRequestException('Cannot review your own idea');
    }

    if (idea.status !== IdeaStatus.SUBMITTED && idea.status !== IdeaStatus.UNDER_REVIEW) {
      throw new BadRequestException('Idea is not available for review');
    }

    const review = this.reviewRepository.create({
      ideaId: createReviewDto.ideaId,
      decision: createReviewDto.decision,
      comments: createReviewDto.comments,
      reviewerId: reviewer.id,
    });

    const savedReview = await this.reviewRepository.save(review);

    const newIdeaStatus = this.mapDecisionToIdeaStatus(createReviewDto.decision);
    idea.status = newIdeaStatus;
    await this.ideaRepository.save(idea);

    await this.auditService.log({
      action: 'CREATE_REVIEW',
      entityType: 'Review',
      entityId: savedReview.id,
      actorId: reviewer.id,
      newValues: {
        ideaId: idea.id,
        decision: createReviewDto.decision,
        newIdeaStatus,
      },
    });

    return this.findOne(savedReview.id);
  }

  async findAll(searchDto: SearchReviewsDto) {
    const { ideaId, reviewerId, decision, page = 1, limit = 20 } = searchDto;

    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.reviewer', 'reviewer')
      .leftJoinAndSelect('review.idea', 'idea');

    if (ideaId) {
      queryBuilder.andWhere('review.ideaId = :ideaId', { ideaId });
    }

    if (reviewerId) {
      queryBuilder.andWhere('review.reviewerId = :reviewerId', { reviewerId });
    }

    if (decision) {
      queryBuilder.andWhere('review.decision = :decision', { decision });
    }

    queryBuilder.orderBy('review.reviewDate', 'DESC');

    const [reviews, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: reviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['reviewer', 'idea', 'idea.submittedBy'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async getReviewsByIdea(ideaId: string) {
    return this.reviewRepository.find({
      where: { ideaId },
      relations: ['reviewer'],
      order: { reviewDate: 'DESC' },
    });
  }

  async getMyReviews(reviewerId: string, searchDto: SearchReviewsDto) {
    return this.findAll({ ...searchDto, reviewerId });
  }

  private mapDecisionToIdeaStatus(decision: ReviewDecision): IdeaStatus {
    switch (decision) {
      case ReviewDecision.APPROVED:
        return IdeaStatus.APPROVED;
      case ReviewDecision.REJECTED:
        return IdeaStatus.REJECTED;
      case ReviewDecision.CHANGES_REQUESTED:
        return IdeaStatus.CHANGES_REQUESTED;
      default:
        return IdeaStatus.UNDER_REVIEW;
    }
  }
}
