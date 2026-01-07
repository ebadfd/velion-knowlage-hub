import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { OfficesModule } from '../modules/offices/offices.module';
import { IdeasModule } from '../modules/ideas/ideas.module';
import { ReviewsModule } from '../modules/reviews/reviews.module';
import { ProjectsModule } from '../modules/projects/projects.module';
import { RewardsModule } from '../modules/rewards/rewards.module';
import { AuditModule } from '../modules/audit/audit.module';
import {
  User,
  Role,
  Office,
  Idea,
  Category,
  Attachment,
  Comment,
  Vote,
  Review,
  Project,
  Milestone,
  ProgressUpdate,
  Evaluation,
  Nomination,
  Reward,
  AuditLog,
} from '../entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'velion_dkn'),
        entities: [
          User,
          Role,
          Office,
          Idea,
          Category,
          Attachment,
          Comment,
          Vote,
          Review,
          Project,
          Milestone,
          ProgressUpdate,
          Evaluation,
          Nomination,
          Reward,
          AuditLog,
        ],
        synchronize: configService.get('DB_SYNCHRONIZE', 'true') === 'true',
        logging: configService.get('DB_LOGGING', 'false') === 'true',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    OfficesModule,
    IdeasModule,
    ReviewsModule,
    ProjectsModule,
    RewardsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
