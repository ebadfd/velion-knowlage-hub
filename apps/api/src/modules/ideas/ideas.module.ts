import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea, Comment, Vote, Category, Attachment } from '../../entities';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Idea, Comment, Vote, Category, Attachment])],
  controllers: [IdeasController],
  providers: [IdeasService],
  exports: [IdeasService],
})
export class IdeasModule {}
