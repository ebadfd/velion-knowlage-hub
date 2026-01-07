import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { rewardsApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  Trophy,
  Medal,
  Award,
  Star,
  Loader2,
  FileText,
  Gift,
  TrendingUp,
} from 'lucide-react';
import type { Reward } from '../../types';

export function RewardsPage() {
  const { user, hasRole } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [myRewards, setMyRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  const canManageRewards = hasRole(['innovation_manager', 'system_admin']);

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    setLoading(true);
    try {
      const [allRes, myRes] = await Promise.all([
        rewardsApi.getAll(),
        rewardsApi.getMyRewards(),
      ]);
      setRewards(allRes.data.items || allRes.data || []);
      setMyRewards(myRes.data.items || myRes.data || []);
    } catch (error) {
      console.error('Failed to load rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'badge':
        return <Medal className="h-5 w-5 text-blue-600" />;
      case 'certificate':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'points':
        return <Star className="h-5 w-5 text-yellow-600" />;
      default:
        return <Gift className="h-5 w-5 text-green-600" />;
    }
  };

  const getRewardBadge = (type: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' }> = {
      badge: { variant: 'default' },
      certificate: { variant: 'secondary' },
      points: { variant: 'warning' },
    };
    const { variant } = config[type] || { variant: 'default' };
    return <Badge variant={variant}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
  };

  const totalPoints = myRewards.reduce((sum, r) => sum + (r.points || r.pointValue || 0), 0);
  const badgeCount = myRewards.filter((r) => (r.rewardType || r.type) === 'badge').length;
  const certificateCount = myRewards.filter((r) => (r.rewardType || r.type) === 'certificate').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
          <p className="text-muted-foreground">
            Recognition and rewards for innovation
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/rewards/nominations">
            <Button variant="outline">
              <Award className="mr-2 h-4 w-4" />
              Nominations
            </Button>
          </Link>
          <Link to="/rewards/leaderboard">
            <Button>
              <TrendingUp className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">Points earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Badges</CardTitle>
            <Medal className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{badgeCount}</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateCount}</div>
            <p className="text-xs text-muted-foreground">Certificates received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myRewards.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-rewards">
        <TabsList>
          <TabsTrigger value="my-rewards">My Rewards</TabsTrigger>
          {canManageRewards && <TabsTrigger value="all-rewards">All Rewards</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="my-rewards" className="mt-4">
          {myRewards.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No rewards yet</h3>
                <p className="text-muted-foreground text-center max-w-sm mt-1">
                  Keep contributing ideas and completing projects to earn rewards!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myRewards.map((reward) => (
                <Card key={reward.id}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        {getRewardIcon(reward.rewardType || reward.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{reward.badgeName || reward.certificateTitle || reward.name || reward.rewardType || reward.type}</CardTitle>
                          {getRewardBadge(reward.rewardType || reward.type)}
                        </div>
                        <CardDescription className="mt-1">
                          {reward.description || 'Reward for your contribution'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      {(reward.points || reward.pointValue) ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span>{reward.points || reward.pointValue} points</span>
                        </div>
                      ) : <div />}
                      <span className="text-muted-foreground">
                        {new Date(reward.awardedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {canManageRewards && (
          <TabsContent value="all-rewards" className="mt-4">
            {rewards.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No rewards issued yet</h3>
                  <p className="text-muted-foreground text-center max-w-sm mt-1">
                    Approve nominations to award rewards to users.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {rewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardContent className="flex items-center gap-4 py-4">
                      <Avatar>
                        <AvatarFallback>
                          {reward.user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reward.recipient?.name || reward.user?.name || 'Unknown'}</span>
                          {getRewardBadge(reward.rewardType || reward.type)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {reward.description || reward.name}
                        </p>
                      </div>
                      <div className="text-right">
                        {(reward.points || reward.pointValue) ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-yellow-600" />
                            <span>{reward.points || reward.pointValue} pts</span>
                          </div>
                        ) : null}
                        <span className="text-xs text-muted-foreground">
                          {new Date(reward.awardedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
