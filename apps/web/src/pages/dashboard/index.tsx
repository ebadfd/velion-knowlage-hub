import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { ideasApi, projectsApi, rewardsApi } from '../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Lightbulb,
  FolderKanban,
  Trophy,
  TrendingUp,
  Plus,
  ArrowRight,
  Star,
} from 'lucide-react';
import type { Idea, Project, UserStats, LeaderboardEntry } from '../../types';

export function DashboardPage() {
  const { user } = useAuth();
  const [recentIdeas, setRecentIdeas] = useState<Idea[]>([]);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState({
    totalIdeas: 0,
    approvedIdeas: 0,
    activeProjects: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [ideasRes, projectsRes, statsRes, leaderboardRes] = await Promise.all([
        ideasApi.getMyIdeas({ limit: 5 }),
        projectsApi.getMyProjects({ limit: 5 }),
        rewardsApi.getMyStats(),
        rewardsApi.getLeaderboard(5),
      ]);

      setRecentIdeas(ideasRes.data.items || []);
      setMyProjects(projectsRes.data.items || []);
      setUserStats(statsRes.data);
      setLeaderboard(leaderboardRes.data);
      setStats({
        totalIdeas: ideasRes.data.total || 0,
        approvedIdeas: (ideasRes.data.items || []).filter((i: Idea) => i.status === 'approved').length,
        activeProjects: projectsRes.data.total || 0,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
      submitted: 'secondary',
      under_review: 'warning',
      approved: 'success',
      rejected: 'destructive',
      changes_requested: 'warning',
    };
    return <Badge variant={variants[status] || 'default'}>{status.replace('_', ' ')}</Badge>;
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return 'leaderboard-rank gold';
    if (rank === 2) return 'leaderboard-rank silver';
    if (rank === 3) return 'leaderboard-rank bronze';
    return 'leaderboard-rank bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div 
        className="relative overflow-hidden rounded-xl p-8 text-white"
        style={{ background: 'linear-gradient(135deg, hsl(10, 75%, 22%) 0%, hsl(10, 65%, 18%) 50%, hsl(10, 60%, 15%) 100%)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div 
          className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)' }}
        />
        <div className="relative">
          <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
          <h1 className="text-2xl font-bold mb-2">Hello, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-white/70 mb-4 max-w-md">
            Ready to share your next big idea? Your innovations are making a difference.
          </p>
          <Link to="/ideas/new">
            <Button 
              className="text-walnut-900 font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{ background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)' }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Submit New Idea
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="icon-box">
              <Lightbulb className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Ideas</p>
          <p className="text-2xl font-bold">{stats.totalIdeas}</p>
          <p className="text-xs text-muted-foreground mt-1">{stats.approvedIdeas} approved</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="icon-box">
              <FolderKanban className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
          <p className="text-2xl font-bold">{stats.activeProjects}</p>
          <p className="text-xs text-muted-foreground mt-1">in progress</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="icon-box">
              <Trophy className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Points</p>
          <p className="text-2xl font-bold">{userStats?.totalPoints || 0}</p>
          <p className="text-xs text-muted-foreground mt-1">Rank #{userStats?.rank || '-'}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="icon-box">
              <Star className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Badges Earned</p>
          <p className="text-2xl font-bold">{userStats?.badgeCount || 0}</p>
          <p className="text-xs text-muted-foreground mt-1">{userStats?.certificateCount || 0} certificates</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Ideas</CardTitle>
              <Link to="/ideas">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Your recently submitted ideas</CardDescription>
          </CardHeader>
          <CardContent>
            {recentIdeas.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No ideas submitted yet.</p>
                <Link to="/ideas/new">
                  <Button variant="link">Submit your first idea</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentIdeas.map((idea) => (
                  <Link
                    key={idea.id}
                    to={`/ideas/${idea.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{idea.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{idea.voteCount} votes</span>
                        <span>•</span>
                        <span>{idea.comments?.length || 0} comments</span>
                      </div>
                    </div>
                    {getStatusBadge(idea.status)}
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Projects</CardTitle>
              <Link to="/projects">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Projects you're involved in</CardDescription>
          </CardHeader>
          <CardContent>
            {myProjects.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <FolderKanban className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No active projects.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="block p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{project.name || project.title}</p>
                      <Badge variant={project.status === 'active' ? 'success' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{project.milestoneCount || 0} milestones</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Leaderboard
            </CardTitle>
            <Link to="/rewards">
              <Button variant="ghost" size="sm">
                View Full Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CardDescription>Top innovators this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.userId}
                className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
              >
                <div className="flex items-center gap-4">
                  <div className={getRankClass(entry.rank)}>
                    {entry.rank}
                  </div>
                  <div>
                    <p className="font-medium">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.badgeCount} badges • {entry.certificateCount} certificates
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{entry.totalPoints}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
