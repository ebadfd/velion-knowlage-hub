import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Idea } from './idea.entity';
import { User } from './user.entity';

@Entity('votes')
@Unique(['ideaId', 'voterId'])
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Idea, (idea) => idea.votes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ideaId' })
  idea: Idea;

  @Column()
  ideaId: string;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: 'voterId' })
  voter: User;

  @Column()
  voterId: string;

  @CreateDateColumn()
  timestamp: Date;
}
