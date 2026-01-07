import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, SearchUsersDto, AssignRolesDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { SystemRole } from '../../common/enums';
import { User } from '../../entities';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(SystemRole.SYSTEM_ADMIN, SystemRole.LOCAL_OFFICE_ADMIN)
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() user: User) {
    return this.usersService.create(createUserDto, user.id);
  }

  @Get()
  @Roles(SystemRole.SYSTEM_ADMIN, SystemRole.LOCAL_OFFICE_ADMIN, SystemRole.INNOVATION_MANAGER)
  @ApiOperation({ summary: 'Search and list users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  findAll(@Query() searchDto: SearchUsersDto) {
    return this.usersService.findAll(searchDto);
  }

  @Get('roles')
  @Roles(SystemRole.SYSTEM_ADMIN, SystemRole.LOCAL_OFFICE_ADMIN)
  @ApiOperation({ summary: 'Get all available roles' })
  @ApiResponse({ status: 200, description: 'Roles retrieved successfully' })
  getAllRoles() {
    return this.usersService.getAllRoles();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search users by name (for dropdowns)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  searchUsers(@Query() searchDto: SearchUsersDto) {
    return this.usersService.findAll({ ...searchDto, status: 'active' as never });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(SystemRole.SYSTEM_ADMIN, SystemRole.LOCAL_OFFICE_ADMIN)
  @ApiOperation({ summary: 'Update user (admin only)' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.update(id, updateUserDto, user.id);
  }

  @Patch(':id/roles')
  @Roles(SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Assign roles to user (system admin only)' })
  @ApiResponse({ status: 200, description: 'Roles assigned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  assignRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignRolesDto: AssignRolesDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.assignRoles(id, assignRolesDto, user.id);
  }

  @Patch(':id/deactivate')
  @Roles(SystemRole.SYSTEM_ADMIN, SystemRole.LOCAL_OFFICE_ADMIN)
  @ApiOperation({ summary: 'Deactivate user (admin only)' })
  @ApiResponse({ status: 200, description: 'User deactivated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deactivate(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.usersService.deactivate(id, user.id);
  }

  @Patch(':id/activate')
  @Roles(SystemRole.SYSTEM_ADMIN, SystemRole.LOCAL_OFFICE_ADMIN)
  @ApiOperation({ summary: 'Activate user (admin only)' })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  activate(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.usersService.activate(id, user.id);
  }
}
