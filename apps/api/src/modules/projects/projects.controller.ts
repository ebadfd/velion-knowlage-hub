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
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateMilestoneDto,
  UpdateMilestoneDto,
  CreateProgressUpdateDto,
  SearchProjectsDto,
} from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { SystemRole } from '../../common/enums';
import { User } from '../../entities';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Create a new project from approved idea' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  create(@Body() createProjectDto: CreateProjectDto, @CurrentUser() user: User) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Search and list projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  findAll(@Query() searchDto: SearchProjectsDto) {
    return this.projectsService.findAll(searchDto);
  }

  @Get('my-projects')
  @ApiOperation({ summary: 'Get projects where user is creator or team member' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  getMyProjects(@Query() searchDto: SearchProjectsDto, @CurrentUser() user: User) {
    return this.projectsService.getMyProjects(user, searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: 'Get project progress summary' })
  @ApiResponse({ status: 200, description: 'Progress retrieved successfully' })
  getProgress(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.getProjectProgress(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.update(id, updateProjectDto, user);
  }

  @Post(':id/milestones')
  @ApiOperation({ summary: 'Add milestone to project' })
  @ApiResponse({ status: 201, description: 'Milestone added successfully' })
  addMilestone(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createMilestoneDto: CreateMilestoneDto,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.addMilestone(id, createMilestoneDto, user);
  }

  @Patch(':id/milestones/:milestoneId')
  @ApiOperation({ summary: 'Update milestone' })
  @ApiResponse({ status: 200, description: 'Milestone updated successfully' })
  updateMilestone(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('milestoneId', ParseUUIDPipe) milestoneId: string,
    @Body() updateMilestoneDto: UpdateMilestoneDto,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.updateMilestone(id, milestoneId, updateMilestoneDto, user);
  }

  @Delete(':id/milestones/:milestoneId')
  @ApiOperation({ summary: 'Delete milestone' })
  @ApiResponse({ status: 200, description: 'Milestone deleted successfully' })
  deleteMilestone(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('milestoneId', ParseUUIDPipe) milestoneId: string,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.deleteMilestone(id, milestoneId, user);
  }

  @Post(':id/progress-updates')
  @ApiOperation({ summary: 'Add progress update to project' })
  @ApiResponse({ status: 201, description: 'Progress update added successfully' })
  addProgressUpdate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createProgressUpdateDto: CreateProgressUpdateDto,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.addProgressUpdate(id, createProgressUpdateDto, user);
  }

  @Post(':id/team')
  @ApiOperation({ summary: 'Add team member to project' })
  @ApiResponse({ status: 201, description: 'Team member added successfully' })
  addTeamMember(
    @Param('id', new ParseUUIDPipe({ version: undefined })) id: string,
    @Body() body: { userId: string },
    @CurrentUser() user: User,
  ) {
    return this.projectsService.addTeamMember(id, body.userId, user);
  }

  @Delete(':id/team/:userId')
  @ApiOperation({ summary: 'Remove team member from project' })
  @ApiResponse({ status: 200, description: 'Team member removed successfully' })
  removeTeamMember(
    @Param('id', new ParseUUIDPipe({ version: undefined })) id: string,
    @Param('userId', new ParseUUIDPipe({ version: undefined })) userId: string,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.removeTeamMember(id, userId, user);
  }
}
