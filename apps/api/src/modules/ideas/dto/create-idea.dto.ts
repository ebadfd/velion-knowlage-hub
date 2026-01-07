import { IsString, IsOptional, IsUUID, IsArray, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIdeaDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(20)
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  officeId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachmentUrls?: string[];
}
