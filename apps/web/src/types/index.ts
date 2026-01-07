export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  status?: 'active' | 'inactive' | 'locked';
  accountStatus?: 'active' | 'inactive' | 'suspended';
  officeId?: string;
  office?: Office;
  roles?: Role[];
  bio?: string;
  lastLogin?: string;
  ideasSubmitted?: number;
  ideasApproved?: number;
  totalPoints?: number;
  rewards?: Reward[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface Office {
  id: string;
  name: string;
  code?: string;
  location?: string;
  region?: string;
  address?: string;
  description?: string;
  isActive: boolean;
  userCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  isOriginal: boolean;
  duplicateOfId?: string;
  originalityScore: number;
  voteCount: number;
  submittedBy: User;
  submittedById: string;
  office?: Office;
  officeId?: string;
  category?: Category;
  categoryId?: string;
  attachments: Attachment[];
  comments: Comment[];
  votes: Vote[];
  submissionDate: string;
  updatedAt: string;
}

export type IdeaStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'duplicate'
  | 'rejected'
  | 'changes_requested';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Attachment {
  id: string;
  url: string;
  filename?: string;
  ideaId: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  authorId: string;
  ideaId: string;
  timestamp: string;
}

export interface Vote {
  id: string;
  voter: User;
  voterId: string;
  ideaId: string;
  timestamp: string;
}

export interface Review {
  id: string;
  decision: ReviewDecision;
  comments?: string;
  idea: Idea;
  ideaId: string;
  reviewer: User;
  reviewerId: string;
  reviewDate: string;
}

export type ReviewDecision = 'approved' | 'rejected' | 'changes_requested';

export interface Project {
  id: string;
  name: string;
  title?: string;
  objective?: string;
  description?: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  sourceIdea?: Idea;
  sourceIdeaId?: string;
  basedOnIdea?: Idea;
  basedOnIdeaId?: string;
  manager?: User;
  managerId?: string;
  createdBy?: User;
  createdById?: string;
  teamMembers?: User[];
  milestones?: Milestone[];
  progressUpdates?: ProgressUpdate[];
  milestoneCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'active' | 'completed' | 'archived';

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: MilestoneStatus;
  orderIndex?: number;
  projectId: string;
  createdAt?: string;
  updatedAt?: string;
}

export type MilestoneStatus = 'pending' | 'in_progress' | 'completed';

export interface ProgressUpdate {
  id: string;
  notes: string;
  attachmentPaths?: string[];
  project: Project;
  projectId: string;
  milestone?: Milestone;
  milestoneId?: string;
  updatedBy: User;
  updatedById: string;
  isReviewed: boolean;
  reviewComments?: string;
  timestamp: string;
}

export interface Reward {
  id: string;
  type: RewardType;
  rewardType?: RewardType;
  name?: string;
  points?: number;
  pointValue?: number;
  badgeName?: string;
  certificateTitle?: string;
  description?: string;
  user?: User;
  recipient?: User;
  recipientId?: string;
  awardedBy?: User;
  awardedById?: string;
  project?: Project;
  projectId?: string;
  awardedAt: string;
}

export type RewardType = 'badge' | 'certificate' | 'points';

export interface Nomination {
  id: string;
  justification?: string;
  reason?: string;
  status: NominationStatus;
  rewardType?: string;
  project?: Project;
  projectId?: string;
  nominee?: User;
  nominatedUser?: User;
  nominatedUserId?: string;
  nominatedBy?: User;
  nominatedById?: string;
  createdAt: string;
  updatedAt?: string;
}

export type NominationStatus = 'pending' | 'approved' | 'rejected';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  email: string;
  totalPoints: number;
  badgeCount: number;
  certificateCount: number;
}

export interface UserStats {
  userId: string;
  totalPoints: number;
  badgeCount: number;
  certificateCount: number;
  rank: number;
  recentRewards: Reward[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actor: User;
  actorId: string;
  previousValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  timestamp: string;
}
