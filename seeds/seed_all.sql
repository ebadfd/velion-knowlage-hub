-- Velion Knowledge Hub - Complete Seed Data
-- Run this file to populate all tables with sample data

-- Clear existing data (in reverse order of dependencies)
TRUNCATE TABLE audit_logs CASCADE;
TRUNCATE TABLE attachments CASCADE;
TRUNCATE TABLE rewards CASCADE;
TRUNCATE TABLE nominations CASCADE;
TRUNCATE TABLE evaluations CASCADE;
TRUNCATE TABLE progress_updates CASCADE;
TRUNCATE TABLE milestones CASCADE;
TRUNCATE TABLE project_team_members CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE reviews CASCADE;
TRUNCATE TABLE comments CASCADE;
TRUNCATE TABLE votes CASCADE;
TRUNCATE TABLE ideas CASCADE;
TRUNCATE TABLE user_roles CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE roles CASCADE;
TRUNCATE TABLE offices CASCADE;

-- Import seed data in order
\i 01_offices.sql
\i 02_roles.sql
\i 03_categories.sql
\i 04_users.sql
\i 05_user_roles.sql
\i 06_ideas.sql
\i 07_votes.sql
\i 08_comments.sql
\i 09_reviews.sql
\i 10_projects.sql
\i 11_project_team_members.sql
\i 12_milestones.sql
\i 13_progress_updates.sql
\i 14_evaluations.sql
\i 15_nominations.sql
\i 16_rewards.sql
\i 17_attachments.sql
\i 18_audit_logs.sql

-- Verify counts
SELECT 'offices' as table_name, COUNT(*) as count FROM offices
UNION ALL SELECT 'roles', COUNT(*) FROM roles
UNION ALL SELECT 'categories', COUNT(*) FROM categories
UNION ALL SELECT 'users', COUNT(*) FROM users
UNION ALL SELECT 'ideas', COUNT(*) FROM ideas
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'votes', COUNT(*) FROM votes
UNION ALL SELECT 'comments', COUNT(*) FROM comments
UNION ALL SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL SELECT 'milestones', COUNT(*) FROM milestones
UNION ALL SELECT 'rewards', COUNT(*) FROM rewards;
