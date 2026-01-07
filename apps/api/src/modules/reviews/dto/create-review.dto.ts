import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReviewDecision } from '../../../common/enums';

export class CreateReviewDto {
  @ApiProperty()
  @IsUUID()
  ideaId: string;

  @ApiProperty({ enum: ReviewDecision })
  @IsEnum(ReviewDecision)
  decision: ReviewDecision;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comments?: string;
}
