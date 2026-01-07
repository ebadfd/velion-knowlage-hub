import { useState, useEffect } from 'react';
import { rewardsApi } from '../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Loader2,
  TrendingUp,
  Star,
  Lightbulb,
  CheckCircle,
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  email: string;
  office?: { name: string };
  totalPoints: number;
  ideasSubmitted: number;
  ideasApproved: number;
  badgesEarned: number;
  badgeCount?: number;
  rank: number;
}

export function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<string>('all-time');

  useEffect(() => {
    loadLeaderboard();
  }, [timeframe]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await rewardsApi.getLeaderboard(50);
      const data = response.data.items || response.data || [];
      const ranked = data.map((entry: LeaderboardEntry, index: number) => ({
        ...entry,
        rank: entry.rank || index + 1,
        badgesEarned: entry.badgesEarned || entry.badgeCount || 0,
      }));
      setLeaderboard(ranked);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500">Gold</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400">Silver</Badge>;
    if (rank === 3) return <Badge className="bg-amber-600">Bronze</Badge>;
    return null;
  };

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

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
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top contributors and innovators
          </p>
        </div>
      </div>

      <Tabs value={timeframe} onValueChange={setTimeframe}>
        <TabsList>
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
          <TabsTrigger value="this-quarter">This Quarter</TabsTrigger>
          <TabsTrigger value="this-year">This Year</TabsTrigger>
        </TabsList>
      </Tabs>

      {leaderboard.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No data yet</h3>
            <p className="text-muted-foreground text-center max-w-sm mt-1">
              The leaderboard will show top contributors once users start earning rewards.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {topThree.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {topThree.map((entry, index) => (
                <Card
                  key={entry.id}
                  className={`${
                    index === 0
                      ? 'border-yellow-500 bg-gradient-to-b from-yellow-50 to-white md:order-2'
                      : index === 1
                      ? 'border-gray-400 bg-gradient-to-b from-gray-50 to-white md:order-1'
                      : 'border-amber-600 bg-gradient-to-b from-amber-50 to-white md:order-3'
                  }`}
                >
                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-2">
                      {getRankIcon(entry.rank)}
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarFallback className="text-xl">
                        {entry.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{entry.name}</CardTitle>
                    <CardDescription>{entry.office?.name || 'No Office'}</CardDescription>
                    {getRankBadge(entry.rank)}
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {entry.totalPoints}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Total Points</p>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{entry.ideasSubmitted}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Ideas</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{entry.ideasApproved}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Approved</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <Award className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium">{entry.badgesEarned}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Badges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Rankings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rest.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 text-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <Avatar>
                        <AvatarFallback>{entry.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.office?.name || 'No Office'}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-600" />
                            <span className="font-medium">{entry.totalPoints}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Points</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{entry.ideasSubmitted}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Ideas</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">{entry.badgesEarned}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Badges</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
