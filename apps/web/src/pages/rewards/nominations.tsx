import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { rewardsApi, projectsApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { UserSearch } from '../../components/ui/user-search';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Award,
  Plus,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  FolderKanban,
} from 'lucide-react';
import type { Nomination, Project } from '../../types';

export function NominationsPage() {
  const { hasRole } = useAuth();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);
  
  const [newNomination, setNewNomination] = useState({
    nominatedUserId: '',
    projectId: '',
    justification: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  const canManageRewards = hasRole(['innovation_manager', 'system_admin']);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [nominationsRes, projectsRes] = await Promise.all([
        rewardsApi.getNominations(),
        projectsApi.getAll({ status: 'completed' }),
      ]);
      setNominations(nominationsRes.data.items || nominationsRes.data || []);
      setProjects(projectsRes.data.items || projectsRes.data || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNomination = async () => {
    if (!newNomination.nominatedUserId || !newNomination.projectId || !newNomination.justification || submitting) return;
    setSubmitting(true);
    try {
      await rewardsApi.createNomination({
        nominatedUserId: newNomination.nominatedUserId,
        projectId: newNomination.projectId,
        justification: newNomination.justification,
      });
      setCreateDialogOpen(false);
      setNewNomination({ nominatedUserId: '', projectId: '', justification: '' });
      loadData();
    } catch (error) {
      console.error('Failed to create nomination:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewNomination = async (approved: boolean) => {
    if (!selectedNomination || reviewing) return;
    setReviewing(true);
    try {
      await rewardsApi.reviewNomination(selectedNomination.id, { approved });
      setReviewDialogOpen(false);
      setSelectedNomination(null);
      loadData();
    } catch (error) {
      console.error('Failed to review nomination:', error);
    } finally {
      setReviewing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'; icon: typeof CheckCircle }> = {
      pending: { variant: 'warning', icon: Clock },
      approved: { variant: 'success', icon: CheckCircle },
      rejected: { variant: 'destructive', icon: XCircle },
    };
    const { variant, icon: Icon } = config[status] || { variant: 'default', icon: Clock };
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Nominations</h1>
          <p className="text-muted-foreground">
            Nominate users for rewards and recognition
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Nomination
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Nominations</CardTitle>
              <CardDescription>
                {nominations.length} nomination(s)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {nominations.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No nominations yet</h3>
              <p className="text-muted-foreground">
                Create a nomination to recognize someone's contribution.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nominee</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Justification</TableHead>
                  <TableHead>Nominated By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  {canManageRewards && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {nominations.map((nomination) => (
                  <TableRow key={nomination.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {(nomination.nominatedUser?.name || nomination.nominee?.name)?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span>{nomination.nominatedUser?.name || nomination.nominee?.name || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {nomination.project ? (
                        <div className="flex items-center gap-1">
                          <FolderKanban className="h-4 w-4 text-muted-foreground" />
                          <span>{nomination.project.title || nomination.project.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground line-clamp-2">
                        {nomination.justification || nomination.reason || '-'}
                      </span>
                    </TableCell>
                    <TableCell>{nomination.nominatedBy?.name || 'Unknown'}</TableCell>
                    <TableCell>{getStatusBadge(nomination.status)}</TableCell>
                    <TableCell>
                      {new Date(nomination.createdAt).toLocaleDateString()}
                    </TableCell>
                    {canManageRewards && (
                      <TableCell className="text-right">
                        {nomination.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedNomination(nomination);
                              setReviewDialogOpen(true);
                            }}
                          >
                            Review
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Nomination</DialogTitle>
            <DialogDescription>
              Nominate a user for a reward
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nominee *</Label>
              <UserSearch
                value={newNomination.nominatedUserId}
                onChange={(userId) => setNewNomination({ ...newNomination, nominatedUserId: userId })}
                placeholder="Search for a user..."
              />
            </div>
            <div className="space-y-2">
              <Label>Project *</Label>
              <Select
                value={newNomination.projectId}
                onValueChange={(value) => setNewNomination({ ...newNomination, projectId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title || project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Justification * (min 20 characters)</Label>
              <Textarea
                placeholder="Explain why this person deserves to be nominated for this project..."
                value={newNomination.justification}
                onChange={(e) => setNewNomination({ ...newNomination, justification: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateNomination}
              disabled={!newNomination.nominatedUserId || !newNomination.projectId || newNomination.justification.length < 20 || submitting}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Nomination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Nomination</DialogTitle>
            <DialogDescription>
              Approve or reject this nomination
            </DialogDescription>
          </DialogHeader>
          {selectedNomination && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Nominee:</span>
                  <p className="font-medium">{selectedNomination.nominatedUser?.name || selectedNomination.nominee?.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Nominated By:</span>
                  <p className="font-medium">{selectedNomination.nominatedBy?.name}</p>
                </div>
                {selectedNomination.project && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Project:</span>
                    <p className="font-medium">{selectedNomination.project.title || selectedNomination.project.name}</p>
                  </div>
                )}
              </div>
              {(selectedNomination.justification || selectedNomination.reason) && (
                <div>
                  <span className="text-sm text-muted-foreground">Justification:</span>
                  <p className="text-sm mt-1">{selectedNomination.justification || selectedNomination.reason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleReviewNomination(false)}
              disabled={reviewing}
            >
              {reviewing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reject
            </Button>
            <Button onClick={() => handleReviewNomination(true)} disabled={reviewing}>
              {reviewing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
