import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { projectsApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Progress } from '../../components/ui/progress';
import {
  FolderKanban,
  Plus,
  Search,
  Loader2,
  Calendar,
  Users,
  Filter,
  CheckCircle,
  Clock,
  Archive,
} from 'lucide-react';
import type { Project } from '../../types';

export function ProjectsListPage() {
  const { hasRole } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const canCreateProject = hasRole(['innovation_manager', 'system_admin']);

  useEffect(() => {
    loadProjects();
  }, [statusFilter]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      const response = await projectsApi.getAll(params);
      setProjects(response.data.items || response.data || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'; icon: typeof CheckCircle }> = {
      active: { variant: 'success', icon: Clock },
      completed: { variant: 'secondary', icon: CheckCircle },
      archived: { variant: 'default', icon: Archive },
    };
    const { variant, icon: Icon } = config[status] || { variant: 'default', icon: Clock };
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const calculateProgress = (project: Project) => {
    if (!project.milestones || project.milestones.length === 0) return 0;
    const completed = project.milestones.filter((m) => m.status === 'completed').length;
    return Math.round((completed / project.milestones.length) * 100);
  };

  const filteredProjects = projects.filter((project) => {
    const name = project.title || project.name || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Track and manage innovation projects
          </p>
        </div>
        {canCreateProject && (
          <Link to="/projects/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground text-center max-w-sm mt-1">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Projects are created from approved ideas.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const progress = calculateProgress(project);
            return (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FolderKanban className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="line-clamp-1">{project.title || project.name}</CardTitle>
                          <CardDescription className="line-clamp-2 mt-1">
                            {project.description || 'No description'}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(project.status)}
                      <span className="text-sm text-muted-foreground">
                        {progress}% complete
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.teamMembers?.length || 0} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(project.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {project.milestones && project.milestones.length > 0 && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          {project.milestones.filter((m) => m.status === 'completed').length}/
                          {project.milestones.length} milestones
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
