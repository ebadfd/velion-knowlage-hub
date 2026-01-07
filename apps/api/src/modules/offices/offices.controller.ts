import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OfficesService } from './offices.service';
import { CreateOfficeDto, UpdateOfficeDto, SearchOfficesDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { SystemRole } from '../../common/enums';
import { User } from '../../entities';

@ApiTags('offices')
@Controller('offices')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  @Roles(SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Create a new office (system admin only)' })
  @ApiResponse({ status: 201, description: 'Office created successfully' })
  create(@Body() createOfficeDto: CreateOfficeDto, @CurrentUser() user: User) {
    return this.officesService.create(createOfficeDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Search and list offices' })
  @ApiResponse({ status: 200, description: 'Offices retrieved successfully' })
  findAll(@Query() searchDto: SearchOfficesDto) {
    return this.officesService.findAll(searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get office by ID' })
  @ApiResponse({ status: 200, description: 'Office retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Office not found' })
  findOne(@Param('id', new ParseUUIDPipe({ version: undefined })) id: string) {
    return this.officesService.findOne(id);
  }

  @Patch(':id')
  @Roles(SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Update office (system admin only)' })
  @ApiResponse({ status: 200, description: 'Office updated successfully' })
  @ApiResponse({ status: 404, description: 'Office not found' })
  update(
    @Param('id', new ParseUUIDPipe({ version: undefined })) id: string,
    @Body() updateOfficeDto: UpdateOfficeDto,
    @CurrentUser() user: User,
  ) {
    return this.officesService.update(id, updateOfficeDto, user.id);
  }

  @Delete(':id')
  @Roles(SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Delete office (system admin only)' })
  @ApiResponse({ status: 200, description: 'Office deleted successfully' })
  @ApiResponse({ status: 404, description: 'Office not found' })
  remove(@Param('id', new ParseUUIDPipe({ version: undefined })) id: string, @CurrentUser() user: User) {
    return this.officesService.remove(id, user.id);
  }
}
