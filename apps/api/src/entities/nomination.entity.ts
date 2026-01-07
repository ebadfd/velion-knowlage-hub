import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NominationStatus } from '../common/enums';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('nominations')
export class Nomination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  justification: string;

  @Column({
    type: 'enum',
    enum: NominationStatus,
    default: NominationStatus.PENDING,
  })
  status: NominationStatus;

  @ManyToOne(() => Project, (project) => project.nominations)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => User, (user) => user.nominations)
  @JoinColumn({ name: 'nominatedUserId' })
  nominatedUser: User;

  @Column()
  nominatedUserId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'nominatedById' })
  nominatedBy: User;

  @Column()
  nominatedById: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
