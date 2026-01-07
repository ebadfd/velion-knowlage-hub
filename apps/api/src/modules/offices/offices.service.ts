import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from '../../entities';
import { CreateOfficeDto, UpdateOfficeDto, SearchOfficesDto } from './dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,
    private auditService: AuditService,
  ) {}

  async create(createOfficeDto: CreateOfficeDto, actorId: string) {
    const existing = await this.officeRepository.findOne({
      where: { name: createOfficeDto.name },
    });

    if (existing) {
      throw new BadRequestException('Office with this name already exists');
    }

    const office = this.officeRepository.create(createOfficeDto);
    const savedOffice = await this.officeRepository.save(office);

    await this.auditService.log({
      action: 'CREATE_OFFICE',
      entityType: 'Office',
      entityId: savedOffice.id,
      actorId,
      newValues: createOfficeDto,
    });

    return savedOffice;
  }

  async findAll(searchDto: SearchOfficesDto) {
    const { name, region, isActive, page = 1, limit = 20 } = searchDto;

    const queryBuilder = this.officeRepository
      .createQueryBuilder('office')
      .loadRelationCountAndMap('office.userCount', 'office.users');

    if (name) {
      queryBuilder.andWhere('office.name ILIKE :name', { name: `%${name}%` });
    }

    if (region) {
      queryBuilder.andWhere('office.region ILIKE :region', { region: `%${region}%` });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('office.isActive = :isActive', { isActive });
    }

    const [offices, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: offices,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const office = await this.officeRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!office) {
      throw new NotFoundException('Office not found');
    }

    return office;
  }

  async update(id: string, updateOfficeDto: UpdateOfficeDto, actorId: string) {
    const office = await this.officeRepository.findOne({ where: { id } });

    if (!office) {
      throw new NotFoundException('Office not found');
    }

    const previousValues = {
      name: office.name,
      region: office.region,
      address: office.address,
      isActive: office.isActive,
    };

    if (updateOfficeDto.name && updateOfficeDto.name !== office.name) {
      const existing = await this.officeRepository.findOne({
        where: { name: updateOfficeDto.name },
      });
      if (existing) {
        throw new BadRequestException('Office with this name already exists');
      }
    }

    Object.assign(office, updateOfficeDto);
    const savedOffice = await this.officeRepository.save(office);

    await this.auditService.log({
      action: 'UPDATE_OFFICE',
      entityType: 'Office',
      entityId: savedOffice.id,
      actorId,
      previousValues,
      newValues: updateOfficeDto,
    });

    return savedOffice;
  }

  async remove(id: string, actorId: string) {
    const office = await this.officeRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!office) {
      throw new NotFoundException('Office not found');
    }

    if (office.users?.length > 0) {
      throw new BadRequestException('Cannot delete office with assigned users');
    }

    await this.officeRepository.remove(office);

    await this.auditService.log({
      action: 'DELETE_OFFICE',
      entityType: 'Office',
      entityId: id,
      actorId,
      previousValues: { name: office.name },
    });

    return { message: 'Office deleted successfully' };
  }
}
