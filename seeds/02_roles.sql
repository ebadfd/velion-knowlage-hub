INSERT INTO roles (id, name, description, "createdAt", "updatedAt") VALUES
('b1c2d3e4-1111-1111-1111-111111111111', 'user', 'Basic user with ability to submit ideas, vote, and comment', NOW(), NOW()),
('b1c2d3e4-2222-2222-2222-222222222222', 'knowledge_champion', 'Mentors users, reviews ideas, and moderates comments', NOW(), NOW()),
('b1c2d3e4-3333-3333-3333-333333333333', 'innovation_manager', 'Reviews ideas, creates projects, and awards rewards', NOW(), NOW()),
('b1c2d3e4-4444-4444-4444-444444444444', 'local_office_admin', 'Manages users within their local office', NOW(), NOW()),
('b1c2d3e4-5555-5555-5555-555555555555', 'system_admin', 'Full system access with ability to manage all users and roles', NOW(), NOW());
