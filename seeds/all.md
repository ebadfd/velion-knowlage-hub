INSERT INTO offices (id, name, region, address, "isActive", "createdAt", "updatedAt") VALUES
('a1b2c3d4-1111-1111-1111-111111111111', 'New York Headquarters', 'North America', '350 Fifth Avenue, New York, NY 10118', true, NOW(), NOW()),
('a1b2c3d4-2222-2222-2222-222222222222', 'London Office', 'Europe', '30 St Mary Axe, London EC3A 8BF', true, NOW(), NOW()),
('a1b2c3d4-3333-3333-3333-333333333333', 'Tokyo Office', 'Asia Pacific', '1-1-1 Shibuya, Shibuya-ku, Tokyo', true, NOW(), NOW()),
('a1b2c3d4-4444-4444-4444-444444444444', 'Sydney Office', 'Asia Pacific', '1 Macquarie Place, Sydney NSW 2000', true, NOW(), NOW()),
('a1b2c3d4-5555-5555-5555-555555555555', 'Berlin Office', 'Europe', 'Friedrichstraße 123, 10117 Berlin', true, NOW(), NOW());
INSERT INTO roles (id, name, description, "createdAt", "updatedAt") VALUES
('b1c2d3e4-1111-1111-1111-111111111111', 'user', 'Basic user with ability to submit ideas, vote, and comment', NOW(), NOW()),
('b1c2d3e4-2222-2222-2222-222222222222', 'knowledge_champion', 'Mentors users, reviews ideas, and moderates comments', NOW(), NOW()),
('b1c2d3e4-3333-3333-3333-333333333333', 'innovation_manager', 'Reviews ideas, creates projects, and awards rewards', NOW(), NOW()),
('b1c2d3e4-4444-4444-4444-444444444444', 'local_office_admin', 'Manages users within their local office', NOW(), NOW()),
('b1c2d3e4-5555-5555-5555-555555555555', 'system_admin', 'Full system access with ability to manage all users and roles', NOW(), NOW());
INSERT INTO categories (id, name, description, "isActive", "createdAt", "updatedAt") VALUES
('c1d2e3f4-1111-1111-1111-111111111111', 'Process Improvement', 'Ideas related to improving existing business processes', true, NOW(), NOW()),
('c1d2e3f4-2222-2222-2222-222222222222', 'Cost Reduction', 'Ideas focused on reducing operational costs', true, NOW(), NOW()),
('c1d2e3f4-3333-3333-3333-333333333333', 'Customer Experience', 'Ideas to enhance customer satisfaction and experience', true, NOW(), NOW()),
('c1d2e3f4-4444-4444-4444-444444444444', 'Product Innovation', 'New product ideas or significant product improvements', true, NOW(), NOW()),
('c1d2e3f4-5555-5555-5555-555555555555', 'Technology & Automation', 'Ideas leveraging technology to automate or improve operations', true, NOW(), NOW()),
('c1d2e3f4-6666-6666-6666-666666666666', 'Sustainability', 'Ideas focused on environmental sustainability and green initiatives', true, NOW(), NOW()),
('c1d2e3f4-7777-7777-7777-777777777777', 'Employee Wellbeing', 'Ideas to improve employee satisfaction and workplace culture', true, NOW(), NOW());
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
INSERT INTO user_roles ("userId", "roleId") VALUES
-- Sarah Admin - System Admin
('d1e2f3a4-0001-0001-0001-000000000001', 'b1c2d3e4-5555-5555-5555-555555555555'),
('d1e2f3a4-0001-0001-0001-000000000001', 'b1c2d3e4-1111-1111-1111-111111111111'),

-- Michael Chen - Innovation Manager
('d1e2f3a4-0002-0002-0002-000000000002', 'b1c2d3e4-3333-3333-3333-333333333333'),
('d1e2f3a4-0002-0002-0002-000000000002', 'b1c2d3e4-1111-1111-1111-111111111111'),

-- Emma Watson - Innovation Manager
('d1e2f3a4-0003-0003-0003-000000000003', 'b1c2d3e4-3333-3333-3333-333333333333'),
('d1e2f3a4-0003-0003-0003-000000000003', 'b1c2d3e4-1111-1111-1111-111111111111'),

-- David Miller - Knowledge Champion
('d1e2f3a4-0004-0004-0004-000000000004', 'b1c2d3e4-2222-2222-2222-222222222222'),
('d1e2f3a4-0004-0004-0004-000000000004', 'b1c2d3e4-1111-1111-1111-111111111111'),

-- Yuki Tanaka - Knowledge Champion
('d1e2f3a4-0005-0005-0005-000000000005', 'b1c2d3e4-2222-2222-2222-222222222222'),
('d1e2f3a4-0005-0005-0005-000000000005', 'b1c2d3e4-1111-1111-1111-111111111111'),

-- Lisa Park - Local Office Admin
('d1e2f3a4-0006-0006-0006-000000000006', 'b1c2d3e4-4444-4444-4444-444444444444'),
('d1e2f3a4-0006-0006-0006-000000000006', 'b1c2d3e4-1111-1111-1111-111111111111'),

-- Hans Mueller - Local Office Admin
('d1e2f3a4-0007-0007-0007-000000000007', 'b1c2d3e4-4444-4444-4444-444444444444'),
('d1e2f3a4-0007-0007-0007-000000000007', 'b1c2d3e4-1111-1111-1111-111111111111'),

-- Regular Users
('d1e2f3a4-0008-0008-0008-000000000008', 'b1c2d3e4-1111-1111-1111-111111111111'),
('d1e2f3a4-0009-0009-0009-000000000009', 'b1c2d3e4-1111-1111-1111-111111111111'),
('d1e2f3a4-0010-0010-0010-000000000010', 'b1c2d3e4-1111-1111-1111-111111111111'),
('d1e2f3a4-0011-0011-0011-000000000011', 'b1c2d3e4-1111-1111-1111-111111111111'),
('d1e2f3a4-0012-0012-0012-000000000012', 'b1c2d3e4-1111-1111-1111-111111111111'),
('d1e2f3a4-0013-0013-0013-000000000013', 'b1c2d3e4-1111-1111-1111-111111111111'),
('d1e2f3a4-0014-0014-0014-000000000014', 'b1c2d3e4-1111-1111-1111-111111111111'),
('d1e2f3a4-0015-0015-0015-000000000015', 'b1c2d3e4-1111-1111-1111-111111111111');
INSERT INTO ideas (id, title, description, status, "isOriginal", "originalityScore", "voteCount", "submittedById", "officeId", "categoryId", "submissionDate", "updatedAt") VALUES
-- Approved Ideas
('e1f2a3b4-0001-0001-0001-000000000001', 'AI-Powered Customer Support Chatbot', 'Implement an AI chatbot to handle tier-1 customer support inquiries, reducing wait times by 60% and freeing up human agents for complex issues.', 'approved', true, 0.92, 24, 'd1e2f3a4-0008-0008-0008-000000000008', 'a1b2c3d4-1111-1111-1111-111111111111', 'c1d2e3f4-5555-5555-5555-555555555555', NOW() - INTERVAL '45 days', NOW()),
('e1f2a3b4-0002-0002-0002-000000000002', 'Paperless Office Initiative', 'Transition to fully digital document management, eliminating 90% of paper usage and reducing storage costs by $50k annually.', 'approved', true, 0.88, 31, 'd1e2f3a4-0009-0009-0009-000000000009', 'a1b2c3d4-2222-2222-2222-222222222222', 'c1d2e3f4-6666-6666-6666-666666666666', NOW() - INTERVAL '60 days', NOW()),
('e1f2a3b4-0003-0003-0003-000000000003', 'Remote Work Equipment Subsidy', 'Provide employees with a monthly stipend for home office equipment and utilities to improve remote work productivity.', 'approved', true, 0.85, 42, 'd1e2f3a4-0010-0010-0010-000000000010', 'a1b2c3d4-3333-3333-3333-333333333333', 'c1d2e3f4-7777-7777-7777-777777777777', NOW() - INTERVAL '30 days', NOW()),

-- Under Review Ideas
('e1f2a3b4-0004-0004-0004-000000000004', 'Automated Invoice Processing', 'Use OCR and machine learning to automatically process and categorize incoming invoices, reducing manual data entry by 80%.', 'under_review', true, 0.79, 15, 'd1e2f3a4-0011-0011-0011-000000000011', 'a1b2c3d4-4444-4444-4444-444444444444', 'c1d2e3f4-5555-5555-5555-555555555555', NOW() - INTERVAL '10 days', NOW()),
('e1f2a3b4-0005-0005-0005-000000000005', 'Cross-Department Mentorship Program', 'Create a structured mentorship program connecting employees across departments to foster knowledge sharing and career growth.', 'under_review', true, 0.91, 18, 'd1e2f3a4-0012-0012-0012-000000000012', 'a1b2c3d4-5555-5555-5555-555555555555', 'c1d2e3f4-7777-7777-7777-777777777777', NOW() - INTERVAL '7 days', NOW()),
('e1f2a3b4-0006-0006-0006-000000000006', 'Solar Panel Installation', 'Install solar panels on office buildings to reduce energy costs by 40% and demonstrate commitment to sustainability.', 'under_review', true, 0.82, 28, 'd1e2f3a4-0013-0013-0013-000000000013', 'a1b2c3d4-1111-1111-1111-111111111111', 'c1d2e3f4-6666-6666-6666-666666666666', NOW() - INTERVAL '5 days', NOW()),

-- Submitted Ideas
('e1f2a3b4-0007-0007-0007-000000000007', 'Customer Feedback Portal Redesign', 'Redesign the customer feedback portal with better UX and real-time analytics dashboard for product teams.', 'submitted', true, 0.75, 8, 'd1e2f3a4-0014-0014-0014-000000000014', 'a1b2c3d4-2222-2222-2222-222222222222', 'c1d2e3f4-3333-3333-3333-333333333333', NOW() - INTERVAL '3 days', NOW()),
('e1f2a3b4-0008-0008-0008-000000000008', 'Quarterly Innovation Hackathons', 'Host quarterly hackathons where employees can work on passion projects that could benefit the company.', 'submitted', true, 0.87, 12, 'd1e2f3a4-0008-0008-0008-000000000008', 'a1b2c3d4-1111-1111-1111-111111111111', 'c1d2e3f4-4444-4444-4444-444444444444', NOW() - INTERVAL '2 days', NOW()),
('e1f2a3b4-0009-0009-0009-000000000009', 'Vendor Management Platform', 'Build a centralized platform for managing vendor relationships, contracts, and performance metrics.', 'submitted', true, 0.71, 5, 'd1e2f3a4-0009-0009-0009-000000000009', 'a1b2c3d4-2222-2222-2222-222222222222', 'c1d2e3f4-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', NOW()),

-- Rejected Ideas
('e1f2a3b4-0010-0010-0010-000000000010', 'Unlimited Vacation Policy', 'Implement an unlimited vacation policy to improve employee satisfaction and trust.', 'rejected', true, 0.65, 35, 'd1e2f3a4-0010-0010-0010-000000000010', 'a1b2c3d4-3333-3333-3333-333333333333', 'c1d2e3f4-7777-7777-7777-777777777777', NOW() - INTERVAL '20 days', NOW()),

-- Duplicate Ideas
('e1f2a3b4-0011-0011-0011-000000000011', 'Green Office Initiative', 'Reduce paper usage and implement recycling programs across all offices.', 'duplicate', false, 0.45, 3, 'd1e2f3a4-0011-0011-0011-000000000011', 'a1b2c3d4-4444-4444-4444-444444444444', 'c1d2e3f4-6666-6666-6666-666666666666', NOW() - INTERVAL '55 days', NOW()),

-- Changes Requested
('e1f2a3b4-0012-0012-0012-000000000012', 'Mobile App for Field Workers', 'Develop a mobile application for field workers to submit reports and access resources offline.', 'changes_requested', true, 0.83, 19, 'd1e2f3a4-0012-0012-0012-000000000012', 'a1b2c3d4-5555-5555-5555-555555555555', 'c1d2e3f4-5555-5555-5555-555555555555', NOW() - INTERVAL '15 days', NOW());

UPDATE ideas SET "duplicateOfId" = 'e1f2a3b4-0002-0002-0002-000000000002' WHERE id = 'e1f2a3b4-0011-0011-0011-000000000011';
INSERT INTO votes (id, "ideaId", "voterId", timestamp) VALUES
-- Votes for AI Chatbot idea
('f1a2b3c4-0001-0001-0001-000000000001', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '44 days'),
('f1a2b3c4-0001-0001-0001-000000000002', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '43 days'),
('f1a2b3c4-0001-0001-0001-000000000003', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '42 days'),
('f1a2b3c4-0001-0001-0001-000000000004', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0009-0009-0009-000000000009', NOW() - INTERVAL '41 days'),
('f1a2b3c4-0001-0001-0001-000000000005', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0010-0010-0010-000000000010', NOW() - INTERVAL '40 days'),

-- Votes for Paperless Office idea
('f1a2b3c4-0002-0002-0002-000000000001', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0001-0001-0001-000000000001', NOW() - INTERVAL '59 days'),
('f1a2b3c4-0002-0002-0002-000000000002', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '58 days'),
('f1a2b3c4-0002-0002-0002-000000000003', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0005-0005-0005-000000000005', NOW() - INTERVAL '57 days'),
('f1a2b3c4-0002-0002-0002-000000000004', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0008-0008-0008-000000000008', NOW() - INTERVAL '56 days'),
('f1a2b3c4-0002-0002-0002-000000000005', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0010-0010-0010-000000000010', NOW() - INTERVAL '55 days'),
('f1a2b3c4-0002-0002-0002-000000000006', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0012-0012-0012-000000000012', NOW() - INTERVAL '54 days'),

-- Votes for Remote Work Equipment idea
('f1a2b3c4-0003-0003-0003-000000000001', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0001-0001-0001-000000000001', NOW() - INTERVAL '29 days'),
('f1a2b3c4-0003-0003-0003-000000000002', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '28 days'),
('f1a2b3c4-0003-0003-0003-000000000003', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '27 days'),
('f1a2b3c4-0003-0003-0003-000000000004', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0008-0008-0008-000000000008', NOW() - INTERVAL '26 days'),
('f1a2b3c4-0003-0003-0003-000000000005', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0009-0009-0009-000000000009', NOW() - INTERVAL '25 days'),
('f1a2b3c4-0003-0003-0003-000000000006', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0011-0011-0011-000000000011', NOW() - INTERVAL '24 days'),
('f1a2b3c4-0003-0003-0003-000000000007', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0012-0012-0012-000000000012', NOW() - INTERVAL '23 days'),
('f1a2b3c4-0003-0003-0003-000000000008', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0013-0013-0013-000000000013', NOW() - INTERVAL '22 days'),

-- Votes for Solar Panel idea
('f1a2b3c4-0006-0006-0006-000000000001', 'e1f2a3b4-0006-0006-0006-000000000006', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '4 days'),
('f1a2b3c4-0006-0006-0006-000000000002', 'e1f2a3b4-0006-0006-0006-000000000006', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '4 days'),
('f1a2b3c4-0006-0006-0006-000000000003', 'e1f2a3b4-0006-0006-0006-000000000006', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '3 days'),
('f1a2b3c4-0006-0006-0006-000000000004', 'e1f2a3b4-0006-0006-0006-000000000006', 'd1e2f3a4-0009-0009-0009-000000000009', NOW() - INTERVAL '3 days'),
('f1a2b3c4-0006-0006-0006-000000000005', 'e1f2a3b4-0006-0006-0006-000000000006', 'd1e2f3a4-0010-0010-0010-000000000010', NOW() - INTERVAL '2 days');
INSERT INTO comments (id, content, "ideaId", "authorId", timestamp, "updatedAt") VALUES
-- Comments on AI Chatbot idea
('a1b2c3d4-c001-c001-c001-000000000001', 'This would significantly reduce our support ticket backlog. I suggest we start with FAQ-based responses.', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '44 days', NOW() - INTERVAL '44 days'),
('a1b2c3d4-c001-c001-c001-000000000002', 'Have we considered integration with our existing CRM? That would make this even more powerful.', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '43 days', NOW() - INTERVAL '43 days'),
('a1b2c3d4-c001-c001-c001-000000000003', 'Great idea! We should also include sentiment analysis to escalate frustrated customers quickly.', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0009-0009-0009-000000000009', NOW() - INTERVAL '42 days', NOW() - INTERVAL '42 days'),

-- Comments on Paperless Office idea
('a1b2c3d4-c002-c002-c002-000000000001', 'We tried this partially last year. The key is getting buy-in from senior leadership first.', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0005-0005-0005-000000000005', NOW() - INTERVAL '58 days', NOW() - INTERVAL '58 days'),
('a1b2c3d4-c002-c002-c002-000000000002', 'What about legal documents that require physical signatures? We need to address that.', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0001-0001-0001-000000000001', NOW() - INTERVAL '57 days', NOW() - INTERVAL '57 days'),
('a1b2c3d4-c002-c002-c002-000000000003', 'DocuSign or similar e-signature solutions could handle the legal requirement issue.', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '56 days', NOW() - INTERVAL '56 days'),
('a1b2c3d4-c002-c002-c002-000000000004', 'The environmental impact alone makes this worth pursuing. Full support!', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0012-0012-0012-000000000012', NOW() - INTERVAL '55 days', NOW() - INTERVAL '55 days'),

-- Comments on Remote Work Equipment idea
('a1b2c3d4-c003-c003-c003-000000000001', 'This would be a game changer for those of us working from home permanently.', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0008-0008-0008-000000000008', NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
('a1b2c3d4-c003-c003-c003-000000000002', 'What amount are we thinking? $100/month seems reasonable for utilities and minor equipment.', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '27 days', NOW() - INTERVAL '27 days'),
('a1b2c3d4-c003-c003-c003-000000000003', 'We should also consider ergonomic assessments as part of this program.', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0011-0011-0011-000000000011', NOW() - INTERVAL '26 days', NOW() - INTERVAL '26 days'),

-- Comments on Solar Panel idea
('a1b2c3d4-c006-c006-c006-000000000001', 'The ROI on this could be substantial. Has anyone done a cost-benefit analysis?', 'e1f2a3b4-0006-0006-0006-000000000006', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('a1b2c3d4-c006-c006-c006-000000000002', 'We could also look into government incentives for green energy installations.', 'e1f2a3b4-0006-0006-0006-000000000006', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

-- Comments on Hackathon idea
('a1b2c3d4-c008-c008-c008-000000000001', 'Love this! Some of the best features at my previous company came from hackathons.', 'e1f2a3b4-0008-0008-0008-000000000008', 'd1e2f3a4-0014-0014-0014-000000000014', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('a1b2c3d4-c008-c008-c008-000000000002', 'We should offer prizes or recognition for winning teams to boost participation.', 'e1f2a3b4-0008-0008-0008-000000000008', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');
INSERT INTO reviews (id, decision, comments, "ideaId", "reviewerId", "reviewDate") VALUES
-- Reviews for AI Chatbot (Approved)
('b1c2d3e4-a001-a001-a001-000000000001', 'approved', 'Excellent idea with clear ROI. The implementation plan is solid and addresses scalability concerns.', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '40 days'),
('b1c2d3e4-a001-a001-a001-000000000002', 'approved', 'Strong alignment with our digital transformation strategy. Recommend proceeding with pilot.', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '39 days'),

-- Reviews for Paperless Office (Approved)
('b1c2d3e4-a002-a002-a002-000000000001', 'approved', 'Aligns perfectly with our sustainability goals. The cost savings projection is conservative and achievable.', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0005-0005-0005-000000000005', NOW() - INTERVAL '50 days'),
('b1c2d3e4-a002-a002-a002-000000000002', 'approved', 'Well researched proposal. Recommend phased rollout starting with HQ.', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '49 days'),

-- Reviews for Remote Work Equipment (Approved)
('b1c2d3e4-a003-a003-a003-000000000001', 'approved', 'Essential for maintaining productivity in our hybrid work model. Budget impact is manageable.', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '25 days'),

-- Reviews for Automated Invoice Processing (Under Review - partial)
('b1c2d3e4-a004-a004-a004-000000000001', 'changes_requested', 'Good concept but need more details on vendor selection and integration with existing ERP.', 'e1f2a3b4-0004-0004-0004-000000000004', 'd1e2f3a4-0005-0005-0005-000000000005', NOW() - INTERVAL '8 days'),

-- Reviews for Unlimited Vacation (Rejected)
('b1c2d3e4-a010-a010-a010-000000000001', 'rejected', 'While well-intentioned, research shows unlimited vacation policies often lead to less time off. Need alternative approach.', 'e1f2a3b4-0010-0010-0010-000000000010', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '18 days'),
('b1c2d3e4-a010-a010-a010-000000000002', 'rejected', 'Does not align with our current HR policies and would require significant cultural change not feasible at this time.', 'e1f2a3b4-0010-0010-0010-000000000010', 'd1e2f3a4-0004-0004-0004-000000000004', NOW() - INTERVAL '17 days'),

-- Reviews for Mobile App (Changes Requested)
('b1c2d3e4-a012-a012-a012-000000000001', 'changes_requested', 'Great potential but need offline-first architecture details and security considerations for field data.', 'e1f2a3b4-0012-0012-0012-000000000012', 'd1e2f3a4-0005-0005-0005-000000000005', NOW() - INTERVAL '12 days');
INSERT INTO projects (id, title, objective, description, status, "startDate", "endDate", "basedOnIdeaId", "createdById", "createdAt", "updatedAt") VALUES
-- Active Projects
('c1d2e3f4-a001-a001-a001-000000000001', 'AI Customer Support Bot', 'Deploy AI-powered chatbot for tier-1 customer support by Q2', 'Implementation of conversational AI to handle customer inquiries, integrated with CRM and ticketing systems.', 'active', '2025-11-15', '2026-03-31', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '35 days', NOW()),
('c1d2e3f4-a002-a002-a002-000000000002', 'Digital Document Transformation', 'Achieve 90% paperless operations across all offices', 'Complete digital transformation of document workflows including e-signatures, cloud storage, and automated archiving.', 'active', '2025-10-01', '2026-06-30', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '45 days', NOW()),

-- Completed Project
('c1d2e3f4-a003-a003-a003-000000000003', 'Remote Work Stipend Program', 'Launch monthly stipend program for remote employees', 'Established $150/month stipend for home office equipment and utilities for all remote-eligible employees.', 'completed', '2025-10-15', '2025-12-15', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '20 days', NOW());
INSERT INTO project_team_members ("projectId", "userId") VALUES
-- AI Customer Support Bot team
('c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-0002-0002-0002-000000000002'),
('c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-0008-0008-0008-000000000008'),
('c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-0009-0009-0009-000000000009'),
('c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-0014-0014-0014-000000000014'),

-- Digital Document Transformation team
('c1d2e3f4-a002-a002-a002-000000000002', 'd1e2f3a4-0003-0003-0003-000000000003'),
('c1d2e3f4-a002-a002-a002-000000000002', 'd1e2f3a4-0009-0009-0009-000000000009'),
('c1d2e3f4-a002-a002-a002-000000000002', 'd1e2f3a4-0012-0012-0012-000000000012'),

-- Remote Work Stipend Program team (completed project)
('c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0002-0002-0002-000000000002'),
('c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0010-0010-0010-000000000010'),
('c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0006-0006-0006-000000000006');
INSERT INTO milestones (id, title, description, "dueDate", status, "orderIndex", "projectId", "createdAt", "updatedAt") VALUES
-- AI Customer Support Bot milestones
('d1e2f3a4-aa01-aa01-aa01-000000000001', 'Requirements Gathering', 'Document technical and business requirements for chatbot implementation', '2025-12-01', 'completed', 1, 'c1d2e3f4-a001-a001-a001-000000000001', NOW() - INTERVAL '35 days', NOW()),
('d1e2f3a4-aa01-aa01-aa01-000000000002', 'Vendor Selection', 'Evaluate and select AI platform vendor', '2025-12-15', 'completed', 2, 'c1d2e3f4-a001-a001-a001-000000000001', NOW() - INTERVAL '35 days', NOW()),
('d1e2f3a4-aa01-aa01-aa01-000000000003', 'CRM Integration', 'Integrate chatbot with existing CRM system', '2026-01-31', 'in_progress', 3, 'c1d2e3f4-a001-a001-a001-000000000001', NOW() - INTERVAL '35 days', NOW()),
('d1e2f3a4-aa01-aa01-aa01-000000000004', 'Pilot Launch', 'Launch pilot with select customer segment', '2026-02-28', 'pending', 4, 'c1d2e3f4-a001-a001-a001-000000000001', NOW() - INTERVAL '35 days', NOW()),
('d1e2f3a4-aa01-aa01-aa01-000000000005', 'Full Rollout', 'Complete production deployment for all customers', '2026-03-31', 'pending', 5, 'c1d2e3f4-a001-a001-a001-000000000001', NOW() - INTERVAL '35 days', NOW()),

-- Digital Document Transformation milestones
('d1e2f3a4-aa02-aa02-aa02-000000000001', 'Current State Assessment', 'Audit existing paper-based processes across all offices', '2025-10-31', 'completed', 1, 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '45 days', NOW()),
('d1e2f3a4-aa02-aa02-aa02-000000000002', 'E-Signature Implementation', 'Deploy DocuSign for legal documents', '2025-12-31', 'completed', 2, 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '45 days', NOW()),
('d1e2f3a4-aa02-aa02-aa02-000000000003', 'Cloud Storage Migration', 'Migrate documents to cloud storage solution', '2026-02-28', 'in_progress', 3, 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '45 days', NOW()),
('d1e2f3a4-aa02-aa02-aa02-000000000004', 'Training Program', 'Train all employees on new digital workflows', '2026-04-30', 'pending', 4, 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '45 days', NOW()),
('d1e2f3a4-aa02-aa02-aa02-000000000005', 'Legacy System Retirement', 'Decommission paper-based systems', '2026-06-30', 'pending', 5, 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '45 days', NOW()),

-- Remote Work Stipend Program milestones (all completed)
('d1e2f3a4-aa03-aa03-aa03-000000000001', 'Policy Development', 'Draft stipend policy and eligibility criteria', '2025-10-31', 'completed', 1, 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '60 days', NOW()),
('d1e2f3a4-aa03-aa03-aa03-000000000002', 'HR System Updates', 'Update payroll and HR systems for stipend processing', '2025-11-15', 'completed', 2, 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '60 days', NOW()),
('d1e2f3a4-aa03-aa03-aa03-000000000003', 'Employee Communication', 'Announce program and enrollment process', '2025-11-30', 'completed', 3, 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '60 days', NOW()),
('d1e2f3a4-aa03-aa03-aa03-000000000004', 'Program Launch', 'First stipend payments processed', '2025-12-15', 'completed', 4, 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '60 days', NOW());
INSERT INTO progress_updates (id, notes, "projectId", "milestoneId", "updatedById", "isReviewed", "reviewComments", timestamp) VALUES
-- AI Customer Support Bot updates
('e1f2a3b4-ab01-ab01-ab01-000000000001', 'Completed stakeholder interviews. Documented 45 common customer inquiry types.', 'c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-aa01-aa01-aa01-000000000001', 'd1e2f3a4-0008-0008-0008-000000000008', true, 'Excellent documentation. This will be valuable for training data.', NOW() - INTERVAL '30 days'),
('e1f2a3b4-ab01-ab01-ab01-000000000002', 'Selected DialogFlow as our AI platform after POC with 3 vendors.', 'c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-aa01-aa01-aa01-000000000002', 'd1e2f3a4-0008-0008-0008-000000000008', true, 'Good choice. Please ensure we have the enterprise support tier.', NOW() - INTERVAL '20 days'),
('e1f2a3b4-ab01-ab01-ab01-000000000003', 'CRM API integration 60% complete. Working on ticket creation flow.', 'c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-aa01-aa01-aa01-000000000003', 'd1e2f3a4-0009-0009-0009-000000000009', false, NULL, NOW() - INTERVAL '5 days'),
('e1f2a3b4-ab01-ab01-ab01-000000000004', 'Added sentiment analysis module. Can now detect frustrated customers with 85% accuracy.', 'c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-aa01-aa01-aa01-000000000003', 'd1e2f3a4-0014-0014-0014-000000000014', false, NULL, NOW() - INTERVAL '2 days'),

-- Digital Document Transformation updates
('e1f2a3b4-ab02-ab02-ab02-000000000001', 'Completed audit of NY and London offices. Identified 230 paper-dependent processes.', 'c1d2e3f4-a002-a002-a002-000000000002', 'd1e2f3a4-aa02-aa02-aa02-000000000001', 'd1e2f3a4-0009-0009-0009-000000000009', true, 'Comprehensive audit. Prioritize high-volume processes first.', NOW() - INTERVAL '40 days'),
('e1f2a3b4-ab02-ab02-ab02-000000000002', 'DocuSign deployed to legal and HR departments. 150 users trained.', 'c1d2e3f4-a002-a002-a002-000000000002', 'd1e2f3a4-aa02-aa02-aa02-000000000002', 'd1e2f3a4-0012-0012-0012-000000000012', true, 'Great progress. Monitor adoption rates closely.', NOW() - INTERVAL '25 days'),
('e1f2a3b4-ab02-ab02-ab02-000000000003', 'Migrated 40% of legacy documents to SharePoint. On track for February target.', 'c1d2e3f4-a002-a002-a002-000000000002', 'd1e2f3a4-aa02-aa02-aa02-000000000003', 'd1e2f3a4-0009-0009-0009-000000000009', false, NULL, NOW() - INTERVAL '7 days'),

-- Remote Work Stipend Program updates
('e1f2a3b4-ab03-ab03-ab03-000000000001', 'Policy approved by executive team. $150/month stipend confirmed.', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-aa03-aa03-aa03-000000000001', 'd1e2f3a4-0010-0010-0010-000000000010', true, 'Well structured policy. Good work on eligibility criteria.', NOW() - INTERVAL '55 days'),
('e1f2a3b4-ab03-ab03-ab03-000000000002', 'Payroll system updated. First batch of 450 employees enrolled.', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-aa03-aa03-aa03-000000000002', 'd1e2f3a4-0006-0006-0006-000000000006', true, 'Smooth implementation. No payroll issues reported.', NOW() - INTERVAL '45 days'),
('e1f2a3b4-ab03-ab03-ab03-000000000003', 'All-hands announcement completed. FAQ published on intranet.', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-aa03-aa03-aa03-000000000003', 'd1e2f3a4-0010-0010-0010-000000000010', true, 'Positive employee feedback received.', NOW() - INTERVAL '35 days'),
('e1f2a3b4-ab03-ab03-ab03-000000000004', 'December stipends processed successfully for 520 employees. Program complete!', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-aa03-aa03-aa03-000000000004', 'd1e2f3a4-0006-0006-0006-000000000006', true, 'Excellent execution. Employee satisfaction up 15%.', NOW() - INTERVAL '20 days');
INSERT INTO evaluations (id, score, comments, "impactScore", "innovationScore", "executionScore", "projectId", "evaluatedById", "evaluationDate") VALUES
-- Evaluation for completed Remote Work Stipend Program
('f1a2b3c4-ae01-ae01-ae01-000000000001', 85, 'Successfully implemented stipend program with minimal issues. Strong employee adoption and positive feedback.', 90, 70, 95, 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '18 days'),
('f1a2b3c4-ae01-ae01-ae01-000000000002', 88, 'Well-executed project that directly addresses employee needs. Good communication throughout.', 85, 75, 95, 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '17 days');
INSERT INTO nominations (id, justification, status, "projectId", "nominatedUserId", "nominatedById", "createdAt", "updatedAt") VALUES
-- Nominations for Remote Work Stipend Program (completed project)
('a1b2c3d4-ab01-ab01-ab01-000000000001', 'Kenji led the policy development and ensured the program met the needs of our diverse workforce across regions.', 'approved', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0010-0010-0010-000000000010', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '16 days', NOW() - INTERVAL '14 days'),
('a1b2c3d4-ab01-ab01-ab01-000000000002', 'Lisa handled the complex payroll integration flawlessly with zero errors in the first payment cycle.', 'approved', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0006-0006-0006-000000000006', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '16 days', NOW() - INTERVAL '14 days'),

-- Pending nominations for active projects
('a1b2c3d4-ab02-ab02-ab02-000000000001', 'James has been instrumental in documenting requirements and liaising with vendors for the chatbot project.', 'pending', 'c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-0008-0008-0008-000000000008', 'd1e2f3a4-0009-0009-0009-000000000009', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days');
INSERT INTO rewards (id, "rewardType", points, "badgeName", "certificateTitle", description, "recipientId", "awardedById", "projectId", "awardedAt") VALUES
-- Points rewards
('b1c2d3e4-ab01-ab01-ab01-000000000001', 'points', 100, NULL, NULL, 'Recognition for successful Remote Work Stipend Program implementation', 'd1e2f3a4-0010-0010-0010-000000000010', 'd1e2f3a4-0002-0002-0002-000000000002', 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '14 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000002', 'points', 100, NULL, NULL, 'Recognition for successful Remote Work Stipend Program implementation', 'd1e2f3a4-0006-0006-0006-000000000006', 'd1e2f3a4-0002-0002-0002-000000000002', 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '14 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000003', 'points', 50, NULL, NULL, 'Active participation in idea discussions and voting', 'd1e2f3a4-0009-0009-0009-000000000009', 'd1e2f3a4-0003-0003-0003-000000000003', NULL, NOW() - INTERVAL '10 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000004', 'points', 50, NULL, NULL, 'Valuable contributions to Paperless Office initiative', 'd1e2f3a4-0012-0012-0012-000000000012', 'd1e2f3a4-0003-0003-0003-000000000003', 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '8 days'),

-- Badge rewards
('b1c2d3e4-ab02-ab02-ab02-000000000001', 'badge', 0, 'Innovation Champion', NULL, 'Awarded for submitting multiple approved ideas', 'd1e2f3a4-0008-0008-0008-000000000008', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '30 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000002', 'badge', 0, 'Team Player', NULL, 'Exceptional collaboration across multiple projects', 'd1e2f3a4-0009-0009-0009-000000000009', 'd1e2f3a4-0003-0003-0003-000000000003', NULL, NOW() - INTERVAL '25 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000003', 'badge', 0, 'Sustainability Advocate', NULL, 'Leading green initiatives in the organization', 'd1e2f3a4-0013-0013-0013-000000000013', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '20 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000004', 'badge', 0, 'First Idea', NULL, 'Welcome badge for submitting first idea', 'd1e2f3a4-0014-0014-0014-000000000014', 'd1e2f3a4-0001-0001-0001-000000000001', NULL, NOW() - INTERVAL '5 days'),

-- Certificate rewards
('b1c2d3e4-ab03-ab03-ab03-000000000001', 'certificate', 0, NULL, 'Project Excellence Award', 'Certificate of Excellence for outstanding project delivery', 'd1e2f3a4-0010-0010-0010-000000000010', 'd1e2f3a4-0001-0001-0001-000000000001', 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '12 days'),
('b1c2d3e4-ab03-ab03-ab03-000000000002', 'certificate', 0, NULL, 'Digital Transformation Leader', 'Recognition for leading digital transformation efforts', 'd1e2f3a4-0003-0003-0003-000000000003', 'd1e2f3a4-0001-0001-0001-000000000001', 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '7 days');
INSERT INTO attachments (id, "fileName", "fileType", "filePath", "fileSize", "ideaId", "uploadedAt") VALUES
-- AI Chatbot attachments
('a1b2c3d4-ac01-ac01-ac01-000000000001', 'chatbot_architecture.pdf', 'application/pdf', '/uploads/ideas/e1f2a3b4-0001/chatbot_architecture.pdf', 245000, 'e1f2a3b4-0001-0001-0001-000000000001', NOW() - INTERVAL '45 days'),
('a1b2c3d4-ac01-ac01-ac01-000000000002', 'roi_analysis.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/uploads/ideas/e1f2a3b4-0001/roi_analysis.xlsx', 78000, 'e1f2a3b4-0001-0001-0001-000000000001', NOW() - INTERVAL '45 days'),

-- Paperless Office attachments
('a1b2c3d4-ac02-ac02-ac02-000000000001', 'current_paper_usage.pdf', 'application/pdf', '/uploads/ideas/e1f2a3b4-0002/current_paper_usage.pdf', 156000, 'e1f2a3b4-0002-0002-0002-000000000002', NOW() - INTERVAL '60 days'),
('a1b2c3d4-ac02-ac02-ac02-000000000002', 'cost_savings_projection.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/uploads/ideas/e1f2a3b4-0002/cost_savings_projection.xlsx', 92000, 'e1f2a3b4-0002-0002-0002-000000000002', NOW() - INTERVAL '60 days'),

-- Solar Panel attachments
('a1b2c3d4-ac06-ac06-ac06-000000000001', 'solar_installation_proposal.pdf', 'application/pdf', '/uploads/ideas/e1f2a3b4-0006/solar_installation_proposal.pdf', 320000, 'e1f2a3b4-0006-0006-0006-000000000006', NOW() - INTERVAL '5 days'),
('a1b2c3d4-ac06-ac06-ac06-000000000002', 'energy_audit_results.pdf', 'application/pdf', '/uploads/ideas/e1f2a3b4-0006/energy_audit_results.pdf', 185000, 'e1f2a3b4-0006-0006-0006-000000000006', NOW() - INTERVAL '5 days'),

-- Mobile App attachments
('a1b2c3d4-ac12-ac12-ac12-000000000001', 'mobile_app_wireframes.png', 'image/png', '/uploads/ideas/e1f2a3b4-0012/mobile_app_wireframes.png', 420000, 'e1f2a3b4-0012-0012-0012-000000000012', NOW() - INTERVAL '15 days');
INSERT INTO audit_logs (id, action, "entityType", "entityId", "previousValues", "newValues", "ipAddress", "userAgent", "actorId", timestamp) VALUES
-- User login events
('01020304-a101-a101-a101-000000000001', 'LOGIN', 'User', 'd1e2f3a4-0001-0001-0001-000000000001', NULL, '{"status": "success"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0', 'd1e2f3a4-0001-0001-0001-000000000001', NOW() - INTERVAL '1 day'),
('01020304-a101-a101-a101-000000000002', 'LOGIN', 'User', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, '{"status": "success"}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.0', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '1 day'),

-- Idea submissions
('01020304-a102-a102-a102-000000000001', 'CREATE', 'Idea', 'e1f2a3b4-0007-0007-0007-000000000007', NULL, '{"title": "Customer Feedback Portal Redesign", "status": "submitted"}', '192.168.1.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/121.0', 'd1e2f3a4-0014-0014-0014-000000000014', NOW() - INTERVAL '3 days'),
('01020304-a102-a102-a102-000000000002', 'CREATE', 'Idea', 'e1f2a3b4-0008-0008-0008-000000000008', NULL, '{"title": "Quarterly Innovation Hackathons", "status": "submitted"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0', 'd1e2f3a4-0008-0008-0008-000000000008', NOW() - INTERVAL '2 days'),

-- Idea status changes
('01020304-a103-a103-a103-000000000001', 'UPDATE', 'Idea', 'e1f2a3b4-0001-0001-0001-000000000001', '{"status": "under_review"}', '{"status": "approved"}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.0', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '39 days'),
('01020304-a103-a103-a103-000000000002', 'UPDATE', 'Idea', 'e1f2a3b4-0010-0010-0010-000000000010', '{"status": "under_review"}', '{"status": "rejected"}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.0', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '17 days'),

-- Project creation
('01020304-a104-a104-a104-000000000001', 'CREATE', 'Project', 'c1d2e3f4-a001-a001-a001-000000000001', NULL, '{"title": "AI Customer Support Bot", "status": "active"}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.0', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '35 days'),
('01020304-a104-a104-a104-000000000002', 'CREATE', 'Project', 'c1d2e3f4-a002-a002-a002-000000000002', NULL, '{"title": "Digital Document Transformation", "status": "active"}', '192.168.1.102', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '45 days'),

-- Project completion
('01020304-a105-a105-a105-000000000001', 'UPDATE', 'Project', 'c1d2e3f4-a003-a003-a003-000000000003', '{"status": "active"}', '{"status": "completed"}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.0', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '18 days'),

-- Reward creation
('01020304-a106-a106-a106-000000000001', 'CREATE', 'Reward', 'b1c2d3e4-ab01-ab01-ab01-000000000001', NULL, '{"recipientId": "d1e2f3a4-0010-0010-0010-000000000010", "points": 100}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.0', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '14 days'),
('01020304-a106-a106-a106-000000000002', 'CREATE', 'Reward', 'b1c2d3e4-ab02-ab02-ab02-000000000001', NULL, '{"recipientId": "d1e2f3a4-0008-0008-0008-000000000008", "badgeName": "Innovation Champion"}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.0', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '30 days');
-- Velion Knowledge Hub - Complete Seed Data
-- Run this file to populate all tables with sample data

-- Clear existing data (in reverse order of dependencies)
TRUNCATE TABLE audit_logs CASCADE;
TRUNCATE TABLE attachments CASCADE;
TRUNCATE TABLE rewards CASCADE;
TRUNCATE TABLE nominations CASCADE;
TRUNCATE TABLE evaluations CASCADE;
TRUNCATE TABLE progress_updates CASCADE;
TRUNCATE TABLE milestones CASCADE;
TRUNCATE TABLE project_team_members CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE reviews CASCADE;
TRUNCATE TABLE comments CASCADE;
TRUNCATE TABLE votes CASCADE;
TRUNCATE TABLE ideas CASCADE;
TRUNCATE TABLE user_roles CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE roles CASCADE;
TRUNCATE TABLE offices CASCADE;

-- Import seed data in order
\i 01_offices.sql
\i 02_roles.sql
\i 03_categories.sql
\i 04_users.sql
\i 05_user_roles.sql
\i 06_ideas.sql
\i 07_votes.sql
\i 08_comments.sql
\i 09_reviews.sql
\i 10_projects.sql
\i 11_project_team_members.sql
\i 12_milestones.sql
\i 13_progress_updates.sql
\i 14_evaluations.sql
\i 15_nominations.sql
\i 16_rewards.sql
\i 17_attachments.sql
\i 18_audit_logs.sql

-- Verify counts
SELECT 'offices' as table_name, COUNT(*) as count FROM offices
UNION ALL SELECT 'roles', COUNT(*) FROM roles
UNION ALL SELECT 'categories', COUNT(*) FROM categories
UNION ALL SELECT 'users', COUNT(*) FROM users
UNION ALL SELECT 'ideas', COUNT(*) FROM ideas
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'votes', COUNT(*) FROM votes
UNION ALL SELECT 'comments', COUNT(*) FROM comments
UNION ALL SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL SELECT 'milestones', COUNT(*) FROM milestones
UNION ALL SELECT 'rewards', COUNT(*) FROM rewards;
