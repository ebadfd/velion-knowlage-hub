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
