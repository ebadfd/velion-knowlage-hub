import { IsOptional, IsString, IsEnum, IsUUID, IsNumber, Min, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IdeaStatus } from '../../../common/enums';

export class SearchIdeasDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  officeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  submittedById?: string;

  @ApiPropertyOptional({ enum: IdeaStatus })
  @IsOptional()
  @IsEnum(IdeaStatus)
  status?: IdeaStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isOriginal?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: ['submissionDate', 'voteCount', 'title'] })
  @IsOptional()
  @IsString()
  sortBy?: 'submissionDate' | 'voteCount' | 'title' = 'submissionDate';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
