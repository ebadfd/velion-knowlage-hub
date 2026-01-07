import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../contexts/auth-context';
import { Toaster } from '../components/ui/toaster';
import { MainLayout } from '../components/layout/main-layout';
import { LoginPage } from '../pages/auth/login';
import { RegisterPage } from '../pages/auth/register';
import { ForgotPasswordPage } from '../pages/auth/forgot-password';
import { ResetPasswordPage } from '../pages/auth/reset-password';
import { OnboardingPage } from '../pages/auth/onboarding';
import { DashboardPage } from '../pages/dashboard';
import { IdeasListPage } from '../pages/ideas/ideas-list';
import { IdeaDetailPage } from '../pages/ideas/idea-detail';
import { IdeaFormPage } from '../pages/ideas/idea-form';
import { ReviewsPage } from '../pages/reviews/reviews-list';
import { ProjectsListPage } from '../pages/projects/projects-list';
import { ProjectDetailPage } from '../pages/projects/project-detail';
import { ProjectFormPage } from '../pages/projects/project-form';
import { RewardsPage } from '../pages/rewards/rewards-list';
import { LeaderboardPage } from '../pages/rewards/leaderboard';
import { NominationsPage } from '../pages/rewards/nominations';
import { UsersListPage } from '../pages/users/users-list';
import { UserDetailPage } from '../pages/users/user-detail';
import { OfficesListPage } from '../pages/offices/offices-list';
import { AuditLogsPage } from '../pages/audit/audit-logs';
import { SettingsPage } from '../pages/settings';
import { ProfilePage } from '../pages/profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              
              <Route path="/ideas" element={<IdeasListPage />} />
              <Route path="/ideas/new" element={<IdeaFormPage />} />
              <Route path="/ideas/:id" element={<IdeaDetailPage />} />
              <Route path="/ideas/:id/edit" element={<IdeaFormPage />} />
              
              <Route path="/reviews" element={<ReviewsPage />} />
              
              <Route path="/projects" element={<ProjectsListPage />} />
              <Route path="/projects/new" element={<ProjectFormPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/projects/:id/edit" element={<ProjectFormPage />} />
              
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/rewards/leaderboard" element={<LeaderboardPage />} />
              <Route path="/rewards/nominations" element={<NominationsPage />} />
              
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
              
              <Route path="/offices" element={<OfficesListPage />} />
              
              <Route path="/audit" element={<AuditLogsPage />} />
              
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
