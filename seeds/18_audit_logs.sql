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
