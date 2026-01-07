import { IsString, IsOptional, IsUUID, IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RewardType } from '../../../common/enums';

export class CreateRewardDto {
  @ApiProperty()
  @IsUUID()
  recipientId: string;

  @ApiProperty({ enum: RewardType })
  @IsEnum(RewardType)
  rewardType: RewardType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  badgeName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  certificateTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  projectId?: string;
}
