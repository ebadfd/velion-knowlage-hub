import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { projectsApi } from '../../lib/api';
import { UserSearch } from '../../components/ui/user-search';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  ArrowLeft,
  Edit,
  Loader2,
  Calendar,
  Users,
  Target,
  CheckCircle,
  Clock,
  Archive,
  Plus,
  FolderKanban,
  Lightbulb,
  User,
  Trash2,
} from 'lucide-react';
import type { Project, Milestone } from '../../types';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '', dueDate: '' });
  const [addingMilestone, setAddingMilestone] = useState(false);
  
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [addingMember, setAddingMember] = useState(false);

  const canManageProject = hasRole(['innovation_manager', 'system_admin']);
  const isTeamMember = project?.teamMembers?.some((m) => m.id === user?.id);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await projectsApi.getById(id!);
      setProject(response.data);
    } catch (error) {
      console.error('Failed to load project:', error);
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMilestone = async () => {
    if (!project || !newMilestone.title || addingMilestone) return;
    setAddingMilestone(true);
    try {
      await projectsApi.addMilestone(project.id, {
        title: newMilestone.title,
        description: newMilestone.description || undefined,
        dueDate: newMilestone.dueDate || undefined,
      });
      setMilestoneDialogOpen(false);
      setNewMilestone({ title: '', description: '', dueDate: '' });
      loadProject();
    } catch (error) {
      console.error('Failed to add milestone:', error);
    } finally {
      setAddingMilestone(false);
    }
  };

  const handleUpdateMilestoneStatus = async (milestoneId: string, status: string) => {
    if (!project) return;
    try {
      await projectsApi.updateMilestone(project.id, milestoneId, { status });
      loadProject();
    } catch (error) {
      console.error('Failed to update milestone:', error);
    }
  };

  const handleAddMember = async () => {
    if (!project || !selectedUserId || addingMember) return;
    setAddingMember(true);
    try {
      await projectsApi.addTeamMember(project.id, selectedUserId);
      setMemberDialogOpen(false);
      setSelectedUserId('');
      loadProject();
    } catch (error) {
      console.error('Failed to add team member:', error);
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!project) return;
    try {
      await projectsApi.removeTeamMember(project.id, memberId);
      loadProject();
    } catch (error) {
      console.error('Failed to remove team member:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'; icon: typeof CheckCircle }> = {
      active: { variant: 'success', icon: Clock },
      completed: { variant: 'secondary', icon: CheckCircle },
      archived: { variant: 'default', icon: Archive },
      pending: { variant: 'warning', icon: Clock },
      in_progress: { variant: 'success', icon: Clock },
    };
    const { variant, icon: Icon } = config[status] || { variant: 'default', icon: Clock };
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const calculateProgress = () => {
    if (!project?.milestones || project.milestones.length === 0) return 0;
    const completed = project.milestones.filter((m) => m.status === 'completed').length;
    return Math.round((completed / project.milestones.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
        <Link to="/projects">
          <Button variant="link">Go back to projects</Button>
        </Link>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        {canManageProject && (
          <Link to={`/projects/${project.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FolderKanban className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{project.title || project.name}</CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                  <CardDescription className="text-base">
                    {project.description || 'No description provided'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>
                {project.endDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="font-medium">
                      {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Manager:</span>
                  <span className="font-medium">{project.manager?.name || 'Not assigned'}</span>
                </div>
                {project.sourceIdea && (
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Source Idea:</span>
                    <Link
                      to={`/ideas/${project.sourceIdea.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {project.sourceIdea.title}
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle>Milestones</CardTitle>
                </div>
                {(canManageProject || isTeamMember) && (
                  <Button size="sm" onClick={() => setMilestoneDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Milestone
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!project.milestones || project.milestones.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No milestones yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {project.milestones.map((milestone: Milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{milestone.title}</h4>
                          {getStatusBadge(milestone.status)}
                        </div>
                        {milestone.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {milestone.description}
                          </p>
                        )}
                        {milestone.dueDate && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Target: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      {(canManageProject || isTeamMember) && milestone.status !== 'completed' && (
                        <Select
                          value={milestone.status}
                          onValueChange={(value) => handleUpdateMilestoneStatus(milestone.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Team Members</CardTitle>
                </div>
                {canManageProject && (
                  <Button size="sm" variant="outline" onClick={() => setMemberDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!project.teamMembers || project.teamMembers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No team members assigned
                </p>
              ) : (
                <div className="space-y-3">
                  {project.teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      {canManageProject && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Milestones</span>
                <span className="font-medium">{project.milestones?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-medium text-green-600">
                  {project.milestones?.filter((m) => m.status === 'completed').length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="font-medium text-blue-600">
                  {project.milestones?.filter((m) => m.status === 'in_progress').length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-medium text-yellow-600">
                  {project.milestones?.filter((m) => m.status === 'pending').length || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={milestoneDialogOpen} onOpenChange={setMilestoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Milestone</DialogTitle>
            <DialogDescription>
              Create a new milestone for this project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="Milestone title"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Milestone description"
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Target Date</Label>
              <Input
                type="date"
                value={newMilestone.dueDate}
                onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMilestoneDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMilestone} disabled={!newMilestone.title || addingMilestone}>
              {addingMilestone && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Milestone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a user to the project team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Search User</Label>
              <UserSearch
                value={selectedUserId}
                onChange={setSelectedUserId}
                placeholder="Search for a user..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember} disabled={!selectedUserId || addingMember}>
              {addingMember && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
