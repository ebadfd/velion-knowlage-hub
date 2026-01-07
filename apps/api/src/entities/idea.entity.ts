import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IdeaStatus } from '../common/enums';
import { User } from './user.entity';
import { Office } from './office.entity';
import { Category } from './category.entity';
import { Attachment } from './attachment.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';
import { Review } from './review.entity';
import { Project } from './project.entity';

@Entity('ideas')
export class Idea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: IdeaStatus,
    default: IdeaStatus.SUBMITTED,
  })
  status: IdeaStatus;

  @Column({ default: false })
  isOriginal: boolean;

  @Column({ nullable: true })
  duplicateOfId: string;

  @Column({ type: 'float', default: 0 })
  originalityScore: number;

  @Column({ default: 0 })
  voteCount: number;

  @ManyToOne(() => User, (user) => user.ideas)
  @JoinColumn({ name: 'submittedById' })
  submittedBy: User;

  @Column()
  submittedById: string;

  @ManyToOne(() => Office, { nullable: true })
  @JoinColumn({ name: 'officeId' })
  office: Office;

  @Column({ nullable: true })
  officeId: string;

  @ManyToOne(() => Category, (category) => category.ideas, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: string;

  @OneToMany(() => Attachment, (attachment) => attachment.idea, { cascade: true })
  attachments: Attachment[];

  @OneToMany(() => Comment, (comment) => comment.idea, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.idea, { cascade: true })
  votes: Vote[];

  @OneToMany(() => Review, (review) => review.idea, { cascade: true })
  reviews: Review[];

  @OneToMany(() => Project, (project) => project.basedOnIdea)
  projects: Project[];

  @CreateDateColumn()
  submissionDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
