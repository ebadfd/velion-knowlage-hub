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
