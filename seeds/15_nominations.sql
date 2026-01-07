INSERT INTO nominations (id, justification, status, "projectId", "nominatedUserId", "nominatedById", "createdAt", "updatedAt") VALUES
-- Nominations for Remote Work Stipend Program (completed project)
('a1b2c3d4-ab01-ab01-ab01-000000000001', 'Kenji led the policy development and ensured the program met the needs of our diverse workforce across regions.', 'approved', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0010-0010-0010-000000000010', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '16 days', NOW() - INTERVAL '14 days'),
('a1b2c3d4-ab01-ab01-ab01-000000000002', 'Lisa handled the complex payroll integration flawlessly with zero errors in the first payment cycle.', 'approved', 'c1d2e3f4-a003-a003-a003-000000000003', 'd1e2f3a4-0006-0006-0006-000000000006', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '16 days', NOW() - INTERVAL '14 days'),

-- Pending nominations for active projects
('a1b2c3d4-ab02-ab02-ab02-000000000001', 'James has been instrumental in documenting requirements and liaising with vendors for the chatbot project.', 'pending', 'c1d2e3f4-a001-a001-a001-000000000001', 'd1e2f3a4-0008-0008-0008-000000000008', 'd1e2f3a4-0009-0009-0009-000000000009', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days');
