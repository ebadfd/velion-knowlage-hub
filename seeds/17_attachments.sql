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
