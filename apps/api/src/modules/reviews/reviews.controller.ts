import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, SearchReviewsDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { SystemRole } from '../../common/enums';
import { User } from '../../entities';

@ApiTags('reviews')
@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles(SystemRole.KNOWLEDGE_CHAMPION, SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Submit a review for an idea' })
  @ApiResponse({ status: 201, description: 'Review submitted successfully' })
  @ApiResponse({ status: 404, description: 'Idea not found' })
  @ApiResponse({ status: 400, description: 'Cannot review own idea or idea not available' })
  create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewsService.create(createReviewDto, user);
  }

  @Get()
  @Roles(SystemRole.KNOWLEDGE_CHAMPION, SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Search and list reviews' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  findAll(@Query() searchDto: SearchReviewsDto) {
    return this.reviewsService.findAll(searchDto);
  }

  @Get('my-reviews')
  @Roles(SystemRole.KNOWLEDGE_CHAMPION, SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Get reviews by current user' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  getMyReviews(@Query() searchDto: SearchReviewsDto, @CurrentUser() user: User) {
    return this.reviewsService.getMyReviews(user.id, searchDto);
  }

  @Get('idea/:ideaId')
  @ApiOperation({ summary: 'Get reviews for a specific idea' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  getReviewsByIdea(@Param('ideaId', ParseUUIDPipe) ideaId: string) {
    return this.reviewsService.getReviewsByIdea(ideaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiResponse({ status: 200, description: 'Review retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.findOne(id);
  }
}
