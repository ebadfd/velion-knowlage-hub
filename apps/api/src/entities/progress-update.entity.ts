import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Milestone } from './milestone.entity';
import { User } from './user.entity';

@Entity('progress_updates')
export class ProgressUpdate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  notes: string;

  @Column('simple-array', { nullable: true })
  attachmentPaths: string[];

  @ManyToOne(() => Project, (project) => project.progressUpdates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => Milestone, { nullable: true })
  @JoinColumn({ name: 'milestoneId' })
  milestone: Milestone;

  @Column({ nullable: true })
  milestoneId: string;

  @ManyToOne(() => User, (user) => user.progressUpdates)
  @JoinColumn({ name: 'updatedById' })
  updatedBy: User;

  @Column()
  updatedById: string;

  @Column({ default: false })
  isReviewed: boolean;

  @Column({ nullable: true })
  reviewComments: string;

  @CreateDateColumn()
  timestamp: Date;
}
