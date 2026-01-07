import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward, Nomination, Project, User } from '../../entities';
import { CreateNominationDto, UpdateNominationDto, CreateRewardDto, SearchRewardsDto } from './dto';
import { AuditService } from '../audit/audit.service';
import { NominationStatus, RewardType } from '../../common/enums';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(Nomination)
    private nominationRepository: Repository<Nomination>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private auditService: AuditService,
  ) {}

  async createNomination(createNominationDto: CreateNominationDto, nominatorId: string) {
    const project = await this.projectRepository.findOne({
      where: { id: createNominationDto.projectId },
      relations: ['teamMembers'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const nominatedUser = await this.userRepository.findOne({
      where: { id: createNominationDto.nominatedUserId },
    });

    if (!nominatedUser) {
      throw new NotFoundException('Nominated user not found');
    }

    const isTeamMember = project.teamMembers?.some((m) => m.id === createNominationDto.nominatedUserId);
    if (!isTeamMember && project.createdById !== createNominationDto.nominatedUserId) {
      throw new BadRequestException('Nominated user must be a team member of the project');
    }

    if (createNominationDto.nominatedUserId === nominatorId) {
      throw new BadRequestException('Cannot nominate yourself');
    }

    const existingNomination = await this.nominationRepository.findOne({
      where: {
        projectId: createNominationDto.projectId,
        nominatedUserId: createNominationDto.nominatedUserId,
        nominatedById: nominatorId,
      },
    });

    if (existingNomination) {
      throw new BadRequestException('You have already nominated this user for this project');
    }

    const nomination = this.nominationRepository.create({
      ...createNominationDto,
      nominatedById: nominatorId,
      status: NominationStatus.PENDING,
    });

    const savedNomination = await this.nominationRepository.save(nomination);

    await this.auditService.log({
      action: 'CREATE_NOMINATION',
      entityType: 'Nomination',
      entityId: savedNomination.id,
      actorId: nominatorId,
      newValues: {
        projectId: createNominationDto.projectId,
        nominatedUserId: createNominationDto.nominatedUserId,
      },
    });

    return this.getNomination(savedNomination.id);
  }

  async getNomination(id: string) {
    const nomination = await this.nominationRepository.findOne({
      where: { id },
      relations: ['project', 'nominatedUser', 'nominatedBy'],
    });

    if (!nomination) {
      throw new NotFoundException('Nomination not found');
    }

    return nomination;
  }

  async getPendingNominations(page = 1, limit = 20) {
    const [nominations, total] = await this.nominationRepository.findAndCount({
      where: { status: NominationStatus.PENDING },
      relations: ['project', 'nominatedUser', 'nominatedBy'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items: nominations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateNomination(id: string, updateNominationDto: UpdateNominationDto, actorId: string) {
    const nomination = await this.nominationRepository.findOne({
      where: { id },
      relations: ['nominatedUser'],
    });

    if (!nomination) {
      throw new NotFoundException('Nomination not found');
    }

    const previousStatus = nomination.status;
    nomination.status = updateNominationDto.status;
    await this.nominationRepository.save(nomination);

    if (updateNominationDto.status === NominationStatus.APPROVED) {
      await this.createReward(
        {
          recipientId: nomination.nominatedUserId,
          rewardType: RewardType.BADGE,
          badgeName: 'Team Excellence',
          points: 50,
          description: `Nominated for excellent contribution to project`,
          projectId: nomination.projectId,
        },
        actorId,
      );
    }

    await this.auditService.log({
      action: 'UPDATE_NOMINATION',
      entityType: 'Nomination',
      entityId: id,
      actorId,
      previousValues: { status: previousStatus },
      newValues: { status: updateNominationDto.status },
    });

    return this.getNomination(id);
  }

  async createReward(createRewardDto: CreateRewardDto, awarderId: string) {
    const recipient = await this.userRepository.findOne({
      where: { id: createRewardDto.recipientId },
    });

    if (!recipient) {
      throw new NotFoundException('Recipient not found');
    }

    if (createRewardDto.projectId) {
      const project = await this.projectRepository.findOne({
        where: { id: createRewardDto.projectId },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
    }

    const reward = this.rewardRepository.create({
      ...createRewardDto,
      awardedById: awarderId,
    });

    const savedReward = await this.rewardRepository.save(reward);

    await this.auditService.log({
      action: 'CREATE_REWARD',
      entityType: 'Reward',
      entityId: savedReward.id,
      actorId: awarderId,
      newValues: {
        recipientId: createRewardDto.recipientId,
        rewardType: createRewardDto.rewardType,
        points: createRewardDto.points,
      },
    });

    return this.rewardRepository.findOne({
      where: { id: savedReward.id },
      relations: ['recipient', 'awardedBy', 'project'],
    });
  }

  async findAllRewards(searchDto: SearchRewardsDto) {
    const { recipientId, rewardType, projectId, page = 1, limit = 20 } = searchDto;

    const queryBuilder = this.rewardRepository
      .createQueryBuilder('reward')
      .leftJoinAndSelect('reward.recipient', 'recipient')
      .leftJoinAndSelect('reward.awardedBy', 'awardedBy')
      .leftJoinAndSelect('reward.project', 'project');

    if (recipientId) {
      queryBuilder.andWhere('reward.recipientId = :recipientId', { recipientId });
    }

    if (rewardType) {
      queryBuilder.andWhere('reward.rewardType = :rewardType', { rewardType });
    }

    if (projectId) {
      queryBuilder.andWhere('reward.projectId = :projectId', { projectId });
    }

    queryBuilder.orderBy('reward.awardedAt', 'DESC');

    const [rewards, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: rewards,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getMyRewards(userId: string, searchDto: SearchRewardsDto) {
    return this.findAllRewards({ ...searchDto, recipientId: userId });
  }

  async getLeaderboard(limit = 10) {
    const leaderboard = await this.rewardRepository
      .createQueryBuilder('reward')
      .select('reward.recipientId', 'userId')
      .addSelect('user.id', 'id')
      .addSelect('user.name', 'name')
      .addSelect('user.email', 'email')
      .addSelect('user.totalPoints', 'userTotalPoints')
      .addSelect('user.officeId', 'officeId')
      .addSelect('SUM(reward.points)', 'totalPoints')
      .addSelect('COUNT(DISTINCT CASE WHEN reward.rewardType = :badgeType THEN reward.id END)', 'badgeCount')
      .addSelect('COUNT(DISTINCT CASE WHEN reward.rewardType = :certType THEN reward.id END)', 'certificateCount')
      .innerJoin('reward.recipient', 'user')
      .leftJoin('user.office', 'office')
      .addSelect('office.name', 'officeName')
      .setParameter('badgeType', RewardType.BADGE)
      .setParameter('certType', RewardType.CERTIFICATE)
      .groupBy('reward.recipientId')
      .addGroupBy('user.id')
      .addGroupBy('user.name')
      .addGroupBy('user.email')
      .addGroupBy('user.totalPoints')
      .addGroupBy('user.officeId')
      .addGroupBy('office.name')
      .orderBy('SUM(reward.points)', 'DESC')
      .limit(limit)
      .getRawMany();

    return leaderboard.map((entry, index) => ({
      rank: index + 1,
      id: entry.id,
      userId: entry.userId,
      name: entry.name,
      email: entry.email,
      totalPoints: parseInt(entry.totalPoints, 10) || 0,
      badgeCount: parseInt(entry.badgeCount, 10) || 0,
      badgesEarned: parseInt(entry.badgeCount, 10) || 0,
      certificateCount: parseInt(entry.certificateCount, 10) || 0,
      office: entry.officeName ? { name: entry.officeName } : null,
      ideasSubmitted: 0,
      ideasApproved: 0,
    }));
  }

  async getUserStats(userId: string) {
    const rewards = await this.rewardRepository.find({
      where: { recipientId: userId },
    });

    const totalPoints = rewards.reduce((sum, r) => sum + (r.points || 0), 0);
    const badges = rewards.filter((r) => r.rewardType === RewardType.BADGE);
    const certificates = rewards.filter((r) => r.rewardType === RewardType.CERTIFICATE);

    const rank = await this.rewardRepository
      .createQueryBuilder('reward')
      .select('reward.recipientId')
      .addSelect('SUM(reward.points)', 'totalPoints')
      .groupBy('reward.recipientId')
      .having('SUM(reward.points) > :userPoints', { userPoints: totalPoints })
      .getCount();

    return {
      userId,
      totalPoints,
      badgeCount: badges.length,
      certificateCount: certificates.length,
      rank: rank + 1,
      recentRewards: rewards.slice(0, 5),
    };
  }
}
