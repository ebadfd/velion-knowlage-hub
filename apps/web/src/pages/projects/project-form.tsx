import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { projectsApi, ideasApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Loader2, FolderKanban } from 'lucide-react';
import type { Idea } from '../../types';

const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  basedOnIdeaId: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  status: z.string().optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;

export function ProjectFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [approvedIdeas, setApprovedIdeas] = useState<Idea[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  const watchedBasedOnIdeaId = watch('basedOnIdeaId');
  const watchedStatus = watch('status');

  useEffect(() => {
    loadOptions();
    if (isEditing) {
      loadProject();
    }
  }, [id]);

  const loadOptions = async () => {
    try {
      const ideasRes = await ideasApi.getAll({ status: 'approved' });
      setApprovedIdeas(ideasRes.data.items || ideasRes.data || []);
    } catch (error) {
      console.error('Failed to load options:', error);
    }
  };

  const loadProject = async () => {
    try {
      const response = await projectsApi.getById(id!);
      const project = response.data;
      setValue('title', project.title || project.name);
      setValue('description', project.description || '');
      setValue('basedOnIdeaId', project.basedOnIdeaId || project.sourceIdeaId || '');
      setValue('startDate', project.startDate?.split('T')[0] || '');
      setValue('endDate', project.endDate?.split('T')[0] || '');
      setValue('status', project.status);
    } catch (error) {
      console.error('Failed to load project:', error);
      navigate('/projects');
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data: ProjectForm) => {
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...data,
        basedOnIdeaId: data.basedOnIdeaId || undefined,
        endDate: data.endDate || undefined,
      };
      if (isEditing) {
        await projectsApi.update(id!, payload);
      } else {
        await projectsApi.create(payload);
      }
      navigate('/projects');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate('/projects')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FolderKanban className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>{isEditing ? 'Edit Project' : 'Create New Project'}</CardTitle>
              <CardDescription>
                {isEditing
                  ? 'Update project details below'
                  : 'Create a project from an approved idea'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="Enter project title"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the project goals and scope"
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {!isEditing && (
              <div className="space-y-2">
                <Label htmlFor="basedOnIdeaId">Based On Idea *</Label>
                <Select
                  value={watchedBasedOnIdeaId}
                  onValueChange={(value) => setValue('basedOnIdeaId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an approved idea" />
                  </SelectTrigger>
                  <SelectContent>
                    {approvedIdeas.map((idea) => (
                      <SelectItem key={idea.id} value={idea.id}>
                        {idea.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Link this project to an approved idea
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register('startDate')}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  {...register('endDate')}
                />
              </div>
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={watchedStatus}
                  onValueChange={(value) => setValue('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/projects')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
