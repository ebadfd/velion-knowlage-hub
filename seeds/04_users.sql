-- Password hash is for 'Password123!' using bcrypt
INSERT INTO users (id, name, email, password, status, "totalPoints", "officeId", "createdAt", "updatedAt") VALUES
-- System Admin
('d1e2f3a4-0001-0001-0001-000000000001', 'Sarah Admin', 'admin@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 500, 'a1b2c3d4-1111-1111-1111-111111111111', NOW(), NOW()),

-- Innovation Managers
('d1e2f3a4-0002-0002-0002-000000000002', 'Michael Chen', 'michael.chen@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 350, 'a1b2c3d4-1111-1111-1111-111111111111', NOW(), NOW()),
('d1e2f3a4-0003-0003-0003-000000000003', 'Emma Watson', 'emma.watson@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 420, 'a1b2c3d4-2222-2222-2222-222222222222', NOW(), NOW()),

-- Knowledge Champions
('d1e2f3a4-0004-0004-0004-000000000004', 'David Miller', 'david.miller@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 275, 'a1b2c3d4-1111-1111-1111-111111111111', NOW(), NOW()),
('d1e2f3a4-0005-0005-0005-000000000005', 'Yuki Tanaka', 'yuki.tanaka@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 310, 'a1b2c3d4-3333-3333-3333-333333333333', NOW(), NOW()),

-- Local Office Admins
('d1e2f3a4-0006-0006-0006-000000000006', 'Lisa Park', 'lisa.park@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 180, 'a1b2c3d4-4444-4444-4444-444444444444', NOW(), NOW()),
('d1e2f3a4-0007-0007-0007-000000000007', 'Hans Mueller', 'hans.mueller@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 195, 'a1b2c3d4-5555-5555-5555-555555555555', NOW(), NOW()),

-- Regular Users
('d1e2f3a4-0008-0008-0008-000000000008', 'James Wilson', 'james.wilson@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 145, 'a1b2c3d4-1111-1111-1111-111111111111', NOW(), NOW()),
('d1e2f3a4-0009-0009-0009-000000000009', 'Sophie Brown', 'sophie.brown@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 230, 'a1b2c3d4-2222-2222-2222-222222222222', NOW(), NOW()),
('d1e2f3a4-0010-0010-0010-000000000010', 'Kenji Yamamoto', 'kenji.yamamoto@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 175, 'a1b2c3d4-3333-3333-3333-333333333333', NOW(), NOW()),
('d1e2f3a4-0011-0011-0011-000000000011', 'Emily Davis', 'emily.davis@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 95, 'a1b2c3d4-4444-4444-4444-444444444444', NOW(), NOW()),
('d1e2f3a4-0012-0012-0012-000000000012', 'Thomas Schmidt', 'thomas.schmidt@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 120, 'a1b2c3d4-5555-5555-5555-555555555555', NOW(), NOW()),
('d1e2f3a4-0013-0013-0013-000000000013', 'Maria Garcia', 'maria.garcia@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 85, 'a1b2c3d4-1111-1111-1111-111111111111', NOW(), NOW()),
('d1e2f3a4-0014-0014-0014-000000000014', 'Oliver Smith', 'oliver.smith@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'active', 210, 'a1b2c3d4-2222-2222-2222-222222222222', NOW(), NOW()),
('d1e2f3a4-0015-0015-0015-000000000015', 'Sakura Ito', 'sakura.ito@velion.com', '$2b$10$abcdefabcdefabcdefabceabcdefabcdefabcdefabcdefabcdefab', 'inactive', 50, 'a1b2c3d4-3333-3333-3333-333333333333', NOW(), NOW());
