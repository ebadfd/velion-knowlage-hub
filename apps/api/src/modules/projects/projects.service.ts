import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project, Milestone, ProgressUpdate, Idea, User } from '../../entities';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateMilestoneDto,
  UpdateMilestoneDto,
  CreateProgressUpdateDto,
  SearchProjectsDto,
} from './dto';
import { AuditService } from '../audit/audit.service';
import { IdeaStatus, ProjectStatus, MilestoneStatus, SystemRole } from '../../common/enums';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Milestone)
    private milestoneRepository: Repository<Milestone>,
    @InjectRepository(ProgressUpdate)
    private progressUpdateRepository: Repository<ProgressUpdate>,
    @InjectRepository(Idea)
    private ideaRepository: Repository<Idea>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private auditService: AuditService,
  ) {}

  async create(createProjectDto: CreateProjectDto, creator: User) {
    const idea = await this.ideaRepository.findOne({
      where: { id: createProjectDto.basedOnIdeaId },
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    if (idea.status !== IdeaStatus.APPROVED) {
      throw new BadRequestException('Can only create projects from approved ideas');
    }

    let teamMembers: User[] = [];
    if (createProjectDto.teamMemberIds?.length) {
      teamMembers = await this.userRepository.find({
        where: { id: In(createProjectDto.teamMemberIds) },
      });
    }

    const project = this.projectRepository.create({
      title: createProjectDto.title,
      objective: createProjectDto.objective,
      description: createProjectDto.description,
      basedOnIdeaId: createProjectDto.basedOnIdeaId,
      createdById: creator.id,
      startDate: createProjectDto.startDate ? new Date(createProjectDto.startDate) : null,
      endDate: createProjectDto.endDate ? new Date(createProjectDto.endDate) : null,
      status: ProjectStatus.ACTIVE,
      teamMembers,
    });

    const savedProject = await this.projectRepository.save(project);

    await this.auditService.log({
      action: 'CREATE_PROJECT',
      entityType: 'Project',
      entityId: savedProject.id,
      actorId: creator.id,
      newValues: { title: savedProject.title, basedOnIdeaId: idea.id },
    });

    return this.findOne(savedProject.id);
  }

  async findAll(searchDto: SearchProjectsDto) {
    const { title, basedOnIdeaId, createdById, status, page = 1, limit = 20 } = searchDto;

    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.createdBy', 'createdBy')
      .leftJoinAndSelect('project.basedOnIdea', 'basedOnIdea')
      .leftJoinAndSelect('project.teamMembers', 'teamMembers')
      .loadRelationCountAndMap('project.milestoneCount', 'project.milestones');

    if (title) {
      queryBuilder.andWhere('project.title ILIKE :title', { title: `%${title}%` });
    }

    if (basedOnIdeaId) {
      queryBuilder.andWhere('project.basedOnIdeaId = :basedOnIdeaId', { basedOnIdeaId });
    }

    if (createdById) {
      queryBuilder.andWhere('project.createdById = :createdById', { createdById });
    }

    if (status) {
      queryBuilder.andWhere('project.status = :status', { status });
    }

    queryBuilder.orderBy('project.createdAt', 'DESC');

    const [projects, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['createdBy', 'basedOnIdea', 'teamMembers', 'milestones', 'progressUpdates', 'progressUpdates.updatedBy'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, user: User) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['teamMembers'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const canEdit = this.canEditProject(project, user);
    if (!canEdit) {
      throw new ForbiddenException('Not authorized to update this project');
    }

    const previousValues = {
      title: project.title,
      status: project.status,
    };

    if (updateProjectDto.teamMemberIds) {
      const teamMembers = await this.userRepository.find({
        where: { id: In(updateProjectDto.teamMemberIds) },
      });
      project.teamMembers = teamMembers;
    }

    if (updateProjectDto.startDate) {
      project.startDate = new Date(updateProjectDto.startDate);
    }
    if (updateProjectDto.endDate) {
      project.endDate = new Date(updateProjectDto.endDate);
    }

    const { teamMemberIds, startDate, endDate, ...rest } = updateProjectDto;
    Object.assign(project, rest);

    const savedProject = await this.projectRepository.save(project);

    await this.auditService.log({
      action: 'UPDATE_PROJECT',
      entityType: 'Project',
      entityId: savedProject.id,
      actorId: user.id,
      previousValues,
      newValues: updateProjectDto,
    });

    return this.findOne(savedProject.id);
  }

  async addMilestone(projectId: string, createMilestoneDto: CreateMilestoneDto, user: User) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['milestones'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const canEdit = this.canEditProject(project, user);
    if (!canEdit) {
      throw new ForbiddenException('Not authorized to add milestones');
    }

    const orderIndex = createMilestoneDto.orderIndex ?? project.milestones?.length ?? 0;

    const milestone = this.milestoneRepository.create({
      title: createMilestoneDto.title,
      description: createMilestoneDto.description,
      dueDate: new Date(createMilestoneDto.dueDate),
      projectId,
      status: MilestoneStatus.PENDING,
      orderIndex,
    });

    const savedMilestone = await this.milestoneRepository.save(milestone);

    await this.auditService.log({
      action: 'ADD_MILESTONE',
      entityType: 'Milestone',
      entityId: savedMilestone.id,
      actorId: user.id,
      newValues: { projectId, title: savedMilestone.title },
    });

    return savedMilestone;
  }

  async updateMilestone(projectId: string, milestoneId: string, updateMilestoneDto: UpdateMilestoneDto, user: User) {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: milestoneId, projectId },
      relations: ['project'],
    });

    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }

    const canEdit = this.canEditProject(milestone.project, user);
    if (!canEdit) {
      throw new ForbiddenException('Not authorized to update milestone');
    }

    const previousValues = {
      title: milestone.title,
      status: milestone.status,
    };

    if (updateMilestoneDto.dueDate) {
      milestone.dueDate = new Date(updateMilestoneDto.dueDate);
    }

    const { dueDate, ...rest } = updateMilestoneDto;
    Object.assign(milestone, rest);

    const savedMilestone = await this.milestoneRepository.save(milestone);

    await this.auditService.log({
      action: 'UPDATE_MILESTONE',
      entityType: 'Milestone',
      entityId: savedMilestone.id,
      actorId: user.id,
      previousValues,
      newValues: updateMilestoneDto,
    });

    return savedMilestone;
  }

  async deleteMilestone(projectId: string, milestoneId: string, user: User) {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: milestoneId, projectId },
      relations: ['project'],
    });

    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }

    const canEdit = this.canEditProject(milestone.project, user);
    if (!canEdit) {
      throw new ForbiddenException('Not authorized to delete milestone');
    }

    await this.milestoneRepository.remove(milestone);

    await this.auditService.log({
      action: 'DELETE_MILESTONE',
      entityType: 'Milestone',
      entityId: milestoneId,
      actorId: user.id,
      previousValues: { title: milestone.title },
    });

    return { message: 'Milestone deleted successfully' };
  }

  async addProgressUpdate(projectId: string, createProgressUpdateDto: CreateProgressUpdateDto, user: User) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['teamMembers'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isTeamMember = project.teamMembers?.some((m) => m.id === user.id) || project.createdById === user.id;
    const isAdmin = user.roles?.some((r) => [SystemRole.SYSTEM_ADMIN, SystemRole.INNOVATION_MANAGER].includes(r.name as SystemRole));

    if (!isTeamMember && !isAdmin) {
      throw new ForbiddenException('Only team members can add progress updates');
    }

    if (createProgressUpdateDto.milestoneId) {
      const milestone = await this.milestoneRepository.findOne({
        where: { id: createProgressUpdateDto.milestoneId, projectId },
      });
      if (!milestone) {
        throw new NotFoundException('Milestone not found in this project');
      }
    }

    const progressUpdate = this.progressUpdateRepository.create({
      notes: createProgressUpdateDto.notes,
      projectId,
      milestoneId: createProgressUpdateDto.milestoneId,
      attachmentPaths: createProgressUpdateDto.attachmentPaths,
      updatedById: user.id,
    });

    const savedUpdate = await this.progressUpdateRepository.save(progressUpdate);

    await this.auditService.log({
      action: 'ADD_PROGRESS_UPDATE',
      entityType: 'ProgressUpdate',
      entityId: savedUpdate.id,
      actorId: user.id,
      newValues: { projectId, milestoneId: createProgressUpdateDto.milestoneId },
    });

    return this.progressUpdateRepository.findOne({
      where: { id: savedUpdate.id },
      relations: ['updatedBy', 'milestone'],
    });
  }

  async getProjectProgress(projectId: string) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['milestones'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const totalMilestones = project.milestones?.length || 0;
    const completedMilestones = project.milestones?.filter((m) => m.status === MilestoneStatus.COMPLETED).length || 0;
    const inProgressMilestones = project.milestones?.filter((m) => m.status === MilestoneStatus.IN_PROGRESS).length || 0;

    return {
      projectId,
      status: project.status,
      totalMilestones,
      completedMilestones,
      inProgressMilestones,
      pendingMilestones: totalMilestones - completedMilestones - inProgressMilestones,
      progressPercentage: totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0,
    };
  }

  async getMyProjects(user: User, searchDto: SearchProjectsDto) {
    const { title, status, page = 1, limit = 20 } = searchDto;

    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.createdBy', 'createdBy')
      .leftJoinAndSelect('project.basedOnIdea', 'basedOnIdea')
      .leftJoin('project.teamMembers', 'teamMember')
      .where('(project.createdById = :userId OR teamMember.id = :userId)', { userId: user.id });

    if (title) {
      queryBuilder.andWhere('project.title ILIKE :title', { title: `%${title}%` });
    }

    if (status) {
      queryBuilder.andWhere('project.status = :status', { status });
    }

    queryBuilder.orderBy('project.createdAt', 'DESC');

    const [projects, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async addTeamMember(projectId: string, userId: string, currentUser: User) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['teamMembers'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (!this.canEditProject(project, currentUser)) {
      throw new ForbiddenException('Not authorized to manage team members');
    }

    const userToAdd = await this.userRepository.findOne({ where: { id: userId } });
    if (!userToAdd) {
      throw new NotFoundException('User not found');
    }

    const alreadyMember = project.teamMembers?.some((m) => m.id === userId);
    if (alreadyMember) {
      throw new ForbiddenException('User is already a team member');
    }

    project.teamMembers = [...(project.teamMembers || []), userToAdd];
    await this.projectRepository.save(project);

    await this.auditService.log({
      action: 'ADD_TEAM_MEMBER',
      entityType: 'Project',
      entityId: project.id,
      actorId: currentUser.id,
      newValues: { userId, userName: userToAdd.name },
    });

    return this.findOne(projectId);
  }

  async removeTeamMember(projectId: string, userId: string, currentUser: User) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['teamMembers'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (!this.canEditProject(project, currentUser)) {
      throw new ForbiddenException('Not authorized to manage team members');
    }

    const memberIndex = project.teamMembers?.findIndex((m) => m.id === userId);
    if (memberIndex === undefined || memberIndex === -1) {
      throw new NotFoundException('User is not a team member');
    }

    const removedUser = project.teamMembers[memberIndex];
    project.teamMembers = project.teamMembers.filter((m) => m.id !== userId);
    await this.projectRepository.save(project);

    await this.auditService.log({
      action: 'REMOVE_TEAM_MEMBER',
      entityType: 'Project',
      entityId: project.id,
      actorId: currentUser.id,
      previousValues: { userId, userName: removedUser.name },
    });

    return this.findOne(projectId);
  }

  private canEditProject(project: Project, user: User): boolean {
    const isCreator = project.createdById === user.id;
    const isTeamMember = project.teamMembers?.some((m) => m.id === user.id);
    const isAdmin = user.roles?.some((r) =>
      [SystemRole.SYSTEM_ADMIN, SystemRole.INNOVATION_MANAGER].includes(r.name as SystemRole),
    );
    return isCreator || isTeamMember || isAdmin;
  }
}
