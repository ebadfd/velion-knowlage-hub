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
