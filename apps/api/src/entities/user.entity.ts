import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AccountStatus } from '../common/enums';
import { Office } from './office.entity';
import { Role } from './role.entity';
import { Idea } from './idea.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';
import { Review } from './review.entity';
import { Project } from './project.entity';
import { ProgressUpdate } from './progress-update.entity';
import { Reward } from './reward.entity';
import { Nomination } from './nomination.entity';
import { AuditLog } from './audit-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  status: AccountStatus;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;

  @Column({ default: 0 })
  totalPoints: number;

  @ManyToOne(() => Office, (office) => office.users, { nullable: true })
  @JoinColumn({ name: 'officeId' })
  office: Office;

  @Column({ nullable: true })
  officeId: string;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];

  @OneToMany(() => Idea, (idea) => idea.submittedBy)
  ideas: Idea[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.voter)
  votes: Vote[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @ManyToMany(() => Project, (project) => project.teamMembers)
  projects: Project[];

  @OneToMany(() => ProgressUpdate, (update) => update.updatedBy)
  progressUpdates: ProgressUpdate[];

  @OneToMany(() => Reward, (reward) => reward.recipient)
  rewards: Reward[];

  @OneToMany(() => Nomination, (nomination) => nomination.nominatedUser)
  nominations: Nomination[];

  @OneToMany(() => AuditLog, (audit) => audit.actor)
  auditLogs: AuditLog[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
