import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { ProjectStatus } from '../common/enums';
import { User } from './user.entity';
import { Idea } from './idea.entity';
import { Milestone } from './milestone.entity';
import { ProgressUpdate } from './progress-update.entity';
import { Evaluation } from './evaluation.entity';
import { Nomination } from './nomination.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  objective: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => Idea, (idea) => idea.projects)
  @JoinColumn({ name: 'basedOnIdeaId' })
  basedOnIdea: Idea;

  @Column()
  basedOnIdeaId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: string;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: 'project_team_members',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  teamMembers: User[];

  @OneToMany(() => Milestone, (milestone) => milestone.project, { cascade: true })
  milestones: Milestone[];

  @OneToMany(() => ProgressUpdate, (update) => update.project, { cascade: true })
  progressUpdates: ProgressUpdate[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.project)
  evaluations: Evaluation[];

  @OneToMany(() => Nomination, (nomination) => nomination.project)
  nominations: Nomination[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
