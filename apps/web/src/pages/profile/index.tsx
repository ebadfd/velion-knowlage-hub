import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { rewardsApi, ideasApi, projectsApi } from '../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Building2,
  Calendar,
  Trophy,
  Lightbulb,
  FolderKanban,
  Award,
  Star,
  Settings,
  TrendingUp,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserStats {
  totalPoints: number;
  rank: number;
  badgeCount: number;
  certificateCount: number;
}

export function ProfilePage() {
  const { user, hasRole } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [ideasCount, setIdeasCount] = useState({ total: 0, approved: 0 });
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const [statsRes, ideasRes, projectsRes] = await Promise.all([
        rewardsApi.getMyStats(),
        ideasApi.getMyIdeas({ limit: 1 }),
        projectsApi.getMyProjects({ limit: 1 }),
      ]);
      
      setStats(statsRes.data);
      setIdeasCount({
        total: ideasRes.data.total || 0,
        approved: (ideasRes.data.items || []).filter((i: { status: string }) => i.status === 'approved').length,
      });
      setProjectsCount(projectsRes.data.total || 0);
    } catch (error) {
      console.error('Failed to load profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = () => {
    if (hasRole('system_admin')) return { label: 'System Admin', variant: 'destructive' as const };
    if (hasRole('innovation_manager')) return { label: 'Innovation Manager', variant: 'warning' as const };
    if (hasRole('knowledge_champion')) return { label: 'Knowledge Champion', variant: 'success' as const };
    if (hasRole('local_office_admin')) return { label: 'Office Admin', variant: 'secondary' as const };
    return { label: 'User', variant: 'outline' as const };
  };

  const roleBadge = getRoleBadge();
  const pointsToNextLevel = 1000;
  const currentLevelProgress = stats ? (stats.totalPoints % pointsToNextLevel) / pointsToNextLevel * 100 : 0;
  const currentLevel = stats ? Math.floor(stats.totalPoints / pointsToNextLevel) + 1 : 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="overflow-hidden">
        <div 
          className="h-32 relative"
          style={{ background: 'linear-gradient(135deg, hsl(10, 75%, 22%) 0%, hsl(10, 65%, 18%) 50%, hsl(10, 60%, 15%) 100%)' }}
        >
          <div 
            className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-20"
            style={{ background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)' }}
          />
        </div>
        <CardContent className="relative pt-0">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                {user?.name ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={roleBadge.variant}>{roleBadge.label}</Badge>
                    {stats?.rank && stats.rank <= 10 && (
                      <Badge variant="premium" className="gap-1">
                        <Trophy className="h-3 w-3" />
                        Top {stats.rank}
                      </Badge>
                    )}
                  </div>
                </div>
                <Link to="/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground truncate">{user?.email}</span>
            </div>
            {user?.office && (
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.office.name}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Joined {user?.createdAt ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: true }) : 'recently'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Level {currentLevel}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="icon-box-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Points & Ranking</CardTitle>
                <CardDescription>Your innovation score</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-bold">{stats?.totalPoints || 0}</span>
                <span className="text-muted-foreground ml-2">points</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold">#{stats?.rank || '-'}</span>
                <p className="text-xs text-muted-foreground">Global Rank</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
                <span className="font-medium">{Math.round(currentLevelProgress)}%</span>
              </div>
              <Progress value={currentLevelProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {pointsToNextLevel - (stats?.totalPoints || 0) % pointsToNextLevel} points to next level
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="icon-box">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges and certificates earned</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Star className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">{stats?.badgeCount || 0}</p>
                <p className="text-sm text-muted-foreground">Badges</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{stats?.certificateCount || 0}</p>
                <p className="text-sm text-muted-foreground">Certificates</p>
              </div>
            </div>
            <Link to="/rewards" className="block mt-4">
              <Button variant="outline" className="w-full">
                View All Rewards
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="icon-box">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>My Ideas</CardTitle>
                  <CardDescription>Ideas you've submitted</CardDescription>
                </div>
              </div>
              <Link to="/ideas?mine=true">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-3xl font-bold">{ideasCount.total}</p>
                <p className="text-sm text-muted-foreground">Total Ideas</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-success">{ideasCount.approved}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="icon-box">
                  <FolderKanban className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>My Projects</CardTitle>
                  <CardDescription>Projects you're involved in</CardDescription>
                </div>
              </div>
              <Link to="/projects">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-4 rounded-lg bg-muted/50">
              <div className="text-center">
                <p className="text-3xl font-bold">{projectsCount}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
