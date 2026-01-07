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
import { RewardsService } from './rewards.service';
import { CreateNominationDto, UpdateNominationDto, CreateRewardDto, SearchRewardsDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { SystemRole } from '../../common/enums';
import { User } from '../../entities';

@ApiTags('rewards')
@Controller('rewards')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post('nominations')
  @ApiOperation({ summary: 'Nominate a team member for recognition' })
  @ApiResponse({ status: 201, description: 'Nomination created successfully' })
  createNomination(@Body() createNominationDto: CreateNominationDto, @CurrentUser() user: User) {
    return this.rewardsService.createNomination(createNominationDto, user.id);
  }

  @Get('nominations/pending')
  @Roles(SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Get pending nominations for review' })
  @ApiResponse({ status: 200, description: 'Nominations retrieved successfully' })
  getPendingNominations(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.rewardsService.getPendingNominations(page, limit);
  }

  @Get('nominations/:id')
  @ApiOperation({ summary: 'Get nomination by ID' })
  @ApiResponse({ status: 200, description: 'Nomination retrieved successfully' })
  getNomination(@Param('id', ParseUUIDPipe) id: string) {
    return this.rewardsService.getNomination(id);
  }

  @Patch('nominations/:id')
  @Roles(SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Approve or reject a nomination' })
  @ApiResponse({ status: 200, description: 'Nomination updated successfully' })
  updateNomination(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNominationDto: UpdateNominationDto,
    @CurrentUser() user: User,
  ) {
    return this.rewardsService.updateNomination(id, updateNominationDto, user.id);
  }

  @Post()
  @Roles(SystemRole.INNOVATION_MANAGER, SystemRole.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Award a reward to a user' })
  @ApiResponse({ status: 201, description: 'Reward created successfully' })
  createReward(@Body() createRewardDto: CreateRewardDto, @CurrentUser() user: User) {
    return this.rewardsService.createReward(createRewardDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Search and list rewards' })
  @ApiResponse({ status: 200, description: 'Rewards retrieved successfully' })
  findAll(@Query() searchDto: SearchRewardsDto) {
    return this.rewardsService.findAllRewards(searchDto);
  }

  @Get('my-rewards')
  @ApiOperation({ summary: 'Get current user rewards' })
  @ApiResponse({ status: 200, description: 'Rewards retrieved successfully' })
  getMyRewards(@Query() searchDto: SearchRewardsDto, @CurrentUser() user: User) {
    return this.rewardsService.getMyRewards(user.id, searchDto);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get rewards leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard retrieved successfully' })
  getLeaderboard(@Query('limit') limit?: number) {
    return this.rewardsService.getLeaderboard(limit);
  }

  @Get('stats/:userId')
  @ApiOperation({ summary: 'Get user reward statistics' })
  @ApiResponse({ status: 200, description: 'Stats retrieved successfully' })
  getUserStats(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.rewardsService.getUserStats(userId);
  }

  @Get('my-stats')
  @ApiOperation({ summary: 'Get current user reward statistics' })
  @ApiResponse({ status: 200, description: 'Stats retrieved successfully' })
  getMyStats(@CurrentUser() user: User) {
    return this.rewardsService.getUserStats(user.id);
  }
}
