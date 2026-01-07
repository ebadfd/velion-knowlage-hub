import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AuditLog } from '../../entities';

interface LogParams {
  action: string;
  entityType: string;
  entityId?: string;
  actorId?: string;
  previousValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(params: LogParams): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      actorId: params.actorId,
      previousValues: params.previousValues,
      newValues: params.newValues,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });

    return this.auditLogRepository.save(auditLog);
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    entityType?: string;
    action?: string;
    actorId?: string;
    search?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const { page = 1, limit = 20, entityType, action, actorId, search, startDate, endDate } = params;

    const queryBuilder = this.auditLogRepository
      .createQueryBuilder('audit')
      .leftJoinAndSelect('audit.actor', 'actor')
      .orderBy('audit.timestamp', 'DESC');

    if (entityType) {
      queryBuilder.andWhere('audit.entityType = :entityType', { entityType });
    }

    if (action) {
      queryBuilder.andWhere('audit.action ILIKE :action', { action: `%${action}%` });
    }

    if (actorId) {
      queryBuilder.andWhere('audit.actorId = :actorId', { actorId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(actor.name ILIKE :search OR actor.email ILIKE :search OR audit.entityType ILIKE :search OR audit.action ILIKE :search OR CAST(audit.entityId AS TEXT) ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('audit.timestamp BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const [items, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByEntityId(entityType: string, entityId: string) {
    return this.auditLogRepository.find({
      where: { entityType, entityId },
      relations: ['actor'],
      order: { timestamp: 'DESC' },
    });
  }

  async findByActor(actorId: string, limit = 50) {
    return this.auditLogRepository.find({
      where: { actorId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }
}
