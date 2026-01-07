import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  score: number;

  @Column('text', { nullable: true })
  comments: string;

  @Column({ type: 'int', nullable: true })
  impactScore: number;

  @Column({ type: 'int', nullable: true })
  innovationScore: number;

  @Column({ type: 'int', nullable: true })
  executionScore: number;

  @ManyToOne(() => Project, (project) => project.evaluations)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'evaluatedById' })
  evaluatedBy: User;

  @Column()
  evaluatedById: string;

  @CreateDateColumn()
  evaluationDate: Date;
}
