import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role, Office } from '../../entities';
import { CreateUserDto, UpdateUserDto, SearchUsersDto, AssignRolesDto } from './dto';
import { AuditService } from '../audit/audit.service';
import { SystemRole, AccountStatus } from '../../common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,
    private auditService: AuditService,
  ) {}

  async create(createUserDto: CreateUserDto, actorId: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    if (createUserDto.officeId) {
      const office = await this.officeRepository.findOne({
        where: { id: createUserDto.officeId },
      });
      if (!office) {
        throw new NotFoundException('Office not found');
      }
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let roles: Role[] = [];
    if (createUserDto.roleIds?.length) {
      roles = await this.roleRepository.find({
        where: { id: In(createUserDto.roleIds) },
      });
    } else {
      const defaultRole = await this.roleRepository.findOne({
        where: { name: SystemRole.USER },
      });
      if (defaultRole) {
        roles = [defaultRole];
      }
    }

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      officeId: createUserDto.officeId,
      roles,
      status: AccountStatus.ACTIVE,
    });

    const savedUser = await this.userRepository.save(user);

    await this.auditService.log({
      action: 'CREATE_USER',
      entityType: 'User',
      entityId: savedUser.id,
      actorId,
      newValues: { name: savedUser.name, email: savedUser.email },
    });

    return this.sanitizeUser(savedUser);
  }

  async findAll(searchDto: SearchUsersDto) {
    const { name, email, officeId, roleId, status, page = 1, limit = 20 } = searchDto;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('user.office', 'office');

    if (name) {
      queryBuilder.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (email) {
      queryBuilder.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (officeId) {
      queryBuilder.andWhere('user.officeId = :officeId', { officeId });
    }

    if (roleId) {
      queryBuilder.andWhere('role.id = :roleId', { roleId });
    }

    if (status) {
      queryBuilder.andWhere('user.status = :status', { status });
    }

    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: users.map((u) => this.sanitizeUser(u)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'office'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto, actorId: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'office'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const previousValues = {
      name: user.name,
      email: user.email,
      status: user.status,
      officeId: user.officeId,
    };

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }

    if (updateUserDto.officeId) {
      const office = await this.officeRepository.findOne({
        where: { id: updateUserDto.officeId },
      });
      if (!office) {
        throw new NotFoundException('Office not found');
      }
    }

    Object.assign(user, updateUserDto);
    const savedUser = await this.userRepository.save(user);

    await this.auditService.log({
      action: 'UPDATE_USER',
      entityType: 'User',
      entityId: savedUser.id,
      actorId,
      previousValues,
      newValues: updateUserDto,
    });

    return this.sanitizeUser(savedUser);
  }

  async assignRoles(id: string, assignRolesDto: AssignRolesDto, actorId: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const previousRoles = user.roles.map((r) => r.id);

    const roles = await this.roleRepository.find({
      where: { id: In(assignRolesDto.roleIds) },
    });

    user.roles = roles;
    const savedUser = await this.userRepository.save(user);

    await this.auditService.log({
      action: 'ASSIGN_ROLES',
      entityType: 'User',
      entityId: savedUser.id,
      actorId,
      previousValues: { roleIds: previousRoles },
      newValues: { roleIds: assignRolesDto.roleIds },
    });

    return this.sanitizeUser(savedUser);
  }

  async deactivate(id: string, actorId: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = AccountStatus.INACTIVE;
    await this.userRepository.save(user);

    await this.auditService.log({
      action: 'DEACTIVATE_USER',
      entityType: 'User',
      entityId: user.id,
      actorId,
    });

    return { message: 'User deactivated successfully' };
  }

  async activate(id: string, actorId: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = AccountStatus.ACTIVE;
    await this.userRepository.save(user);

    await this.auditService.log({
      action: 'ACTIVATE_USER',
      entityType: 'User',
      entityId: user.id,
      actorId,
    });

    return { message: 'User activated successfully' };
  }

  async getAllRoles() {
    return this.roleRepository.find();
  }

  private sanitizeUser(user: User) {
    const { password, passwordResetToken, passwordResetExpires, ...result } = user;
    return result;
  }
}
