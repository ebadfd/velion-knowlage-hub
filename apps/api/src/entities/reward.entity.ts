import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RewardType } from '../common/enums';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RewardType,
  })
  rewardType: RewardType;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({ nullable: true })
  badgeName: string;

  @Column({ nullable: true })
  certificateTitle: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.rewards)
  @JoinColumn({ name: 'recipientId' })
  recipient: User;

  @Column()
  recipientId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'awardedById' })
  awardedBy: User;

  @Column()
  awardedById: string;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ nullable: true })
  projectId: string;

  @CreateDateColumn()
  awardedAt: Date;
}
