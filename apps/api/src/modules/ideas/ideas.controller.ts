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
import { IdeasService } from './ideas.service';
import { CreateIdeaDto, UpdateIdeaDto, SearchIdeasDto, CreateCommentDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { SystemRole } from '../../common/enums';
import { User } from '../../entities';

@ApiTags('ideas')
@Controller('ideas')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new idea' })
  @ApiResponse({ status: 201, description: 'Idea submitted successfully' })
  create(@Body() createIdeaDto: CreateIdeaDto, @CurrentUser() user: User) {
    return this.ideasService.create(createIdeaDto, user);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all active categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  getCategories() {
    return this.ideasService.getCategories();
  }

  @Get()
  @ApiOperation({ summary: 'Search and list ideas' })
  @ApiResponse({ status: 200, description: 'Ideas retrieved successfully' })
  findAll(@Query() searchDto: SearchIdeasDto) {
    return this.ideasService.findAll(searchDto);
  }

  @Get('my-ideas')
  @ApiOperation({ summary: 'Get current user ideas' })
  @ApiResponse({ status: 200, description: 'Ideas retrieved successfully' })
  getMyIdeas(@Query() searchDto: SearchIdeasDto, @CurrentUser() user: User) {
    return this.ideasService.getMyIdeas(user, searchDto);
  }

  @Get('for-review')
  @Roles(SystemRole.KNOWLEDGE_CHAMPION, SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Get ideas pending review' })
  @ApiResponse({ status: 200, description: 'Ideas retrieved successfully' })
  getIdeasForReview(@Query() searchDto: SearchIdeasDto) {
    return this.ideasService.getIdeasForReview(searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get idea by ID' })
  @ApiResponse({ status: 200, description: 'Idea retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Idea not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ideasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update idea' })
  @ApiResponse({ status: 200, description: 'Idea updated successfully' })
  @ApiResponse({ status: 404, description: 'Idea not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateIdeaDto: UpdateIdeaDto,
    @CurrentUser() user: User,
  ) {
    return this.ideasService.update(id, updateIdeaDto, user);
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Add comment to idea' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  @ApiResponse({ status: 404, description: 'Idea not found' })
  addComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.ideasService.addComment(id, createCommentDto, user);
  }

  @Delete(':id/comments/:commentId')
  @ApiOperation({ summary: 'Delete comment from idea' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  deleteComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @CurrentUser() user: User,
  ) {
    return this.ideasService.deleteComment(id, commentId, user);
  }

  @Post(':id/vote')
  @ApiOperation({ summary: 'Vote for an idea' })
  @ApiResponse({ status: 201, description: 'Vote recorded successfully' })
  @ApiResponse({ status: 404, description: 'Idea not found' })
  @ApiResponse({ status: 400, description: 'Already voted or voting on own idea' })
  vote(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.ideasService.vote(id, user);
  }

  @Delete(':id/vote')
  @ApiOperation({ summary: 'Remove vote from idea' })
  @ApiResponse({ status: 200, description: 'Vote removed successfully' })
  @ApiResponse({ status: 404, description: 'Vote not found' })
  unvote(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.ideasService.unvote(id, user);
  }
}
