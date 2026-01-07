INSERT INTO projects (id, title, objective, description, status, "startDate", "endDate", "basedOnIdeaId", "createdById", "createdAt", "updatedAt") VALUES
-- Active Projects
('c1d2e3f4-a001-a001-a001-000000000001', 'AI Customer Support Bot', 'Deploy AI-powered chatbot for tier-1 customer support by Q2', 'Implementation of conversational AI to handle customer inquiries, integrated with CRM and ticketing systems.', 'active', '2025-11-15', '2026-03-31', 'e1f2a3b4-0001-0001-0001-000000000001', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '35 days', NOW()),
('c1d2e3f4-a002-a002-a002-000000000002', 'Digital Document Transformation', 'Achieve 90% paperless operations across all offices', 'Complete digital transformation of document workflows including e-signatures, cloud storage, and automated archiving.', 'active', '2025-10-01', '2026-06-30', 'e1f2a3b4-0002-0002-0002-000000000002', 'd1e2f3a4-0003-0003-0003-000000000003', NOW() - INTERVAL '45 days', NOW()),

-- Completed Project
('c1d2e3f4-a003-a003-a003-000000000003', 'Remote Work Stipend Program', 'Launch monthly stipend program for remote employees', 'Established $150/month stipend for home office equipment and utilities for all remote-eligible employees.', 'completed', '2025-10-15', '2025-12-15', 'e1f2a3b4-0003-0003-0003-000000000003', 'd1e2f3a4-0002-0002-0002-000000000002', NOW() - INTERVAL '20 days', NOW());
