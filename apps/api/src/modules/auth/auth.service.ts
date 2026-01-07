import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User, Role } from '../../entities';
import { AccountStatus, SystemRole } from '../../common/enums';
import { RegisterDto, RequestPasswordResetDto, ResetPasswordDto, UpdateProfileDto, ChangePasswordDto } from './dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private jwtService: JwtService,
    private auditService: AuditService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'office'],
    });

    if (!user) {
      return null;
    }

    if (user.status === AccountStatus.LOCKED) {
      throw new UnauthorizedException('Account is locked');
    }

    if (user.status === AccountStatus.INACTIVE) {
      throw new UnauthorizedException('Account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    await this.auditService.log({
      action: 'LOGIN',
      entityType: 'User',
      entityId: user.id,
      actorId: user.id,
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        office: user.office,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const defaultRole = await this.roleRepository.findOne({
      where: { name: SystemRole.USER },
    });

    const user = this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      officeId: registerDto.officeId,
      roles: defaultRole ? [defaultRole] : [],
      status: AccountStatus.ACTIVE,
    });

    const savedUser = await this.userRepository.save(user);

    await this.auditService.log({
      action: 'REGISTER',
      entityType: 'User',
      entityId: savedUser.id,
      actorId: savedUser.id,
      newValues: { name: savedUser.name, email: savedUser.email },
    });

    const payload = { sub: savedUser.id, email: savedUser.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    };
  }

  async requestPasswordReset(dto: RequestPasswordResetDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const resetToken = uuidv4();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1);

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await this.userRepository.save(user);

    await this.auditService.log({
      action: 'PASSWORD_RESET_REQUESTED',
      entityType: 'User',
      entityId: user.id,
      actorId: user.id,
    });

    return { message: 'If the email exists, a reset link has been sent', token: resetToken };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        passwordResetToken: dto.token,
        passwordResetExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = null as unknown as string;
    user.passwordResetExpires = null as unknown as Date;
    await this.userRepository.save(user);

    await this.auditService.log({
      action: 'PASSWORD_RESET_COMPLETED',
      entityType: 'User',
      entityId: user.id,
      actorId: user.id,
    });

    return { message: 'Password has been reset successfully' };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'office'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      totalPoints: user.totalPoints,
      roles: user.roles,
      office: user.office,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'office'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const previousValues = { name: user.name, officeId: user.officeId };

    if (dto.name) {
      user.name = dto.name;
    }

    if (dto.officeId !== undefined) {
      user.officeId = dto.officeId;
    }

    await this.userRepository.save(user);
    
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'office'],
    });

    await this.auditService.log({
      action: 'UPDATE_PROFILE',
      entityType: 'User',
      entityId: user.id,
      actorId: user.id,
      previousValues,
      newValues: { name: updatedUser?.name, officeId: updatedUser?.officeId },
    });

    return {
      id: updatedUser!.id,
      name: updatedUser!.name,
      email: updatedUser!.email,
      status: updatedUser!.status,
      totalPoints: updatedUser!.totalPoints,
      roles: updatedUser!.roles,
      office: updatedUser!.office,
      createdAt: updatedUser!.createdAt,
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    await this.auditService.log({
      action: 'CHANGE_PASSWORD',
      entityType: 'User',
      entityId: user.id,
      actorId: user.id,
    });

    return { message: 'Password changed successfully' };
  }
}
