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
