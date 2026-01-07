import { IsString, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNominationDto {
  @ApiProperty()
  @IsUUID('all')
  projectId: string;

  @ApiProperty()
  @IsUUID('all')
  nominatedUserId: string;

  @ApiProperty()
  @IsString()
  @MinLength(20)
  justification: string;
}
