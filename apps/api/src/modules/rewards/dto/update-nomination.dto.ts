import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NominationStatus } from '../../../common/enums';

export class UpdateNominationDto {
  @ApiProperty({ enum: NominationStatus })
  @IsEnum(NominationStatus)
  status: NominationStatus;
}
