export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LOCKED = 'locked',
}

export enum SystemRole {
  USER = 'user',
  KNOWLEDGE_CHAMPION = 'knowledge_champion',
  INNOVATION_MANAGER = 'innovation_manager',
  LOCAL_OFFICE_ADMIN = 'local_office_admin',
  SYSTEM_ADMIN = 'system_admin',
}

export enum IdeaStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  DUPLICATE = 'duplicate',
  REJECTED = 'rejected',
  CHANGES_REQUESTED = 'changes_requested',
}

export enum ReviewDecision {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CHANGES_REQUESTED = 'changes_requested',
}

export enum ProjectStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum RewardType {
  BADGE = 'badge',
  CERTIFICATE = 'certificate',
  POINTS = 'points',
}

export enum NominationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
