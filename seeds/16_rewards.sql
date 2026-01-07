INSERT INTO rewards (id, "rewardType", points, "badgeName", "certificateTitle", description, "recipientId", "awardedById", "projectId", "awardedAt") VALUES
-- Points rewards for project work
('b1c2d3e4-ab01-ab01-ab01-000000000001', 'points', 100, NULL, NULL, 'Recognition for successful Remote Work Stipend Program implementation', 'd1e2f3a4-0010-0010-0010-000000000010', 'd1e2f3a4-0002-0002-0002-000000000002', 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '14 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000002', 'points', 100, NULL, NULL, 'Recognition for successful Remote Work Stipend Program implementation', 'd1e2f3a4-0006-0006-0006-000000000006', 'd1e2f3a4-0002-0002-0002-000000000002', 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '14 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000003', 'points', 50, NULL, NULL, 'Active participation in idea discussions and voting', 'd1e2f3a4-0009-0009-0009-000000000009', 'd1e2f3a4-0003-0003-0003-000000000003', NULL, NOW() - INTERVAL '10 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000004', 'points', 50, NULL, NULL, 'Valuable contributions to Paperless Office initiative', 'd1e2f3a4-0012-0012-0012-000000000012', 'd1e2f3a4-0003-0003-0003-000000000003', 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '8 days'),

-- Additional points for various users (to populate leaderboard)
('b1c2d3e4-ab01-ab01-ab01-000000000005', 'points', 150, NULL, NULL, 'Outstanding idea submission', 'd1e2f3a4-0008-0008-0008-000000000008', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '35 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000006', 'points', 75, NULL, NULL, 'Mentoring new team members', 'd1e2f3a4-0004-0004-0004-000000000004', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '20 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000007', 'points', 125, NULL, NULL, 'Excellence in project delivery', 'd1e2f3a4-0009-0009-0009-000000000009', 'd1e2f3a4-0002-0002-0002-000000000002', 'c1d2e3f4-a001-a001-a001-000000000001', NOW() - INTERVAL '15 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000008', 'points', 80, NULL, NULL, 'Quality code reviews', 'd1e2f3a4-0005-0005-0005-000000000005', 'd1e2f3a4-0003-0003-0003-000000000003', NULL, NOW() - INTERVAL '12 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000009', 'points', 60, NULL, NULL, 'Innovation week participation', 'd1e2f3a4-0014-0014-0014-000000000014', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '5 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000010', 'points', 90, NULL, NULL, 'Document transformation efforts', 'd1e2f3a4-0003-0003-0003-000000000003', 'd1e2f3a4-0001-0001-0001-000000000001', 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '18 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000011', 'points', 45, NULL, NULL, 'Helpful community feedback', 'd1e2f3a4-0011-0011-0011-000000000011', 'd1e2f3a4-0003-0003-0003-000000000003', NULL, NOW() - INTERVAL '22 days'),
('b1c2d3e4-ab01-ab01-ab01-000000000012', 'points', 110, NULL, NULL, 'AI chatbot requirements documentation', 'd1e2f3a4-0008-0008-0008-000000000008', 'd1e2f3a4-0002-0002-0002-000000000002', 'c1d2e3f4-a001-a001-a001-000000000001', NOW() - INTERVAL '25 days'),

-- Badge rewards
('b1c2d3e4-ab02-ab02-ab02-000000000001', 'badge', 25, 'Innovation Champion', NULL, 'Awarded for submitting multiple approved ideas', 'd1e2f3a4-0008-0008-0008-000000000008', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '30 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000002', 'badge', 25, 'Team Player', NULL, 'Exceptional collaboration across multiple projects', 'd1e2f3a4-0009-0009-0009-000000000009', 'd1e2f3a4-0003-0003-0003-000000000003', NULL, NOW() - INTERVAL '25 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000003', 'badge', 25, 'Sustainability Advocate', NULL, 'Leading green initiatives in the organization', 'd1e2f3a4-0013-0013-0013-000000000013', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '20 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000004', 'badge', 10, 'First Idea', NULL, 'Welcome badge for submitting first idea', 'd1e2f3a4-0014-0014-0014-000000000014', 'd1e2f3a4-0001-0001-0001-000000000001', NULL, NOW() - INTERVAL '5 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000005', 'badge', 25, 'Knowledge Sharer', NULL, 'Sharing expertise with the team', 'd1e2f3a4-0004-0004-0004-000000000004', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '28 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000006', 'badge', 25, 'Top Reviewer', NULL, 'Thorough and helpful idea reviews', 'd1e2f3a4-0005-0005-0005-000000000005', 'd1e2f3a4-0002-0002-0002-000000000002', NULL, NOW() - INTERVAL '22 days'),
('b1c2d3e4-ab02-ab02-ab02-000000000007', 'badge', 25, 'Rising Star', NULL, 'New employee with outstanding contributions', 'd1e2f3a4-0010-0010-0010-000000000010', 'd1e2f3a4-0003-0003-0003-000000000003', NULL, NOW() - INTERVAL '16 days'),

-- Certificate rewards
('b1c2d3e4-ab03-ab03-ab03-000000000001', 'certificate', 50, NULL, 'Project Excellence Award', 'Certificate of Excellence for outstanding project delivery', 'd1e2f3a4-0010-0010-0010-000000000010', 'd1e2f3a4-0001-0001-0001-000000000001', 'c1d2e3f4-a003-a003-a003-000000000003', NOW() - INTERVAL '12 days'),
('b1c2d3e4-ab03-ab03-ab03-000000000002', 'certificate', 50, NULL, 'Digital Transformation Leader', 'Recognition for leading digital transformation efforts', 'd1e2f3a4-0003-0003-0003-000000000003', 'd1e2f3a4-0001-0001-0001-000000000001', 'c1d2e3f4-a002-a002-a002-000000000002', NOW() - INTERVAL '7 days'),
('b1c2d3e4-ab03-ab03-ab03-000000000003', 'certificate', 50, NULL, 'Innovation Leadership', 'Demonstrated leadership in driving innovation', 'd1e2f3a4-0002-0002-0002-000000000002', 'd1e2f3a4-0001-0001-0001-000000000001', NULL, NOW() - INTERVAL '40 days'),
('b1c2d3e4-ab03-ab03-ab03-000000000004', 'certificate', 50, NULL, 'Quarterly MVP', 'Most valuable contributor for Q4 2025', 'd1e2f3a4-0008-0008-0008-000000000008', 'd1e2f3a4-0001-0001-0001-000000000001', NULL, NOW() - INTERVAL '3 days');
