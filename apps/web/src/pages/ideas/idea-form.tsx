import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ideasApi, officesApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Loader2, Lightbulb } from 'lucide-react';
import type { Office, Category, Idea } from '../../types';

const ideaSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(5000, 'Description must be less than 5000 characters'),
  categoryId: z.string().optional(),
  officeId: z.string().optional(),
});

type IdeaForm = z.infer<typeof ideaSchema>;

export function IdeaFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [offices, setOffices] = useState<Office[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IdeaForm>({
    resolver: zodResolver(ideaSchema),
  });

  const watchedCategoryId = watch('categoryId');
  const watchedOfficeId = watch('officeId');

  useEffect(() => {
    loadOptions();
    if (isEditing) {
      loadIdea();
    }
  }, [id]);

  const loadOptions = async () => {
    try {
      const [officesRes, categoriesRes] = await Promise.all([
        officesApi.getAll({ isActive: true }),
        ideasApi.getCategories(),
      ]);
      setOffices(officesRes.data.items || officesRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Failed to load options:', error);
    }
  };

  const loadIdea = async () => {
    try {
      const response = await ideasApi.getById(id!);
      const idea: Idea = response.data;
      setValue('title', idea.title);
      setValue('description', idea.description);
      setValue('categoryId', idea.categoryId || '');
      setValue('officeId', idea.officeId || '');
    } catch (error) {
      console.error('Failed to load idea:', error);
      navigate('/ideas');
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data: IdeaForm) => {
    setError('');
    setLoading(true);
    try {
      if (isEditing) {
        await ideasApi.update(id!, data);
      } else {
        await ideasApi.create(data);
      }
      navigate('/ideas');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to save idea');
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
      <Button variant="ghost" onClick={() => navigate('/ideas')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Ideas
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>{isEditing ? 'Edit Idea' : 'Submit New Idea'}</CardTitle>
              <CardDescription>
                {isEditing
                  ? 'Update your idea details below'
                  : 'Share your innovative idea with the organization'}
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
              <Label htmlFor="title">Idea Title *</Label>
              <Input
                id="title"
                placeholder="Enter a clear, concise title for your idea"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your idea in detail. Include the problem it solves, how it works, and the expected benefits."
                rows={8}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select
                  value={watchedCategoryId}
                  onValueChange={(value) => setValue('categoryId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeId">Office</Label>
                <Select
                  value={watchedOfficeId}
                  onValueChange={(value) => setValue('officeId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an office" />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-secondary border border-border rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Submission Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Be specific and clear about your idea</li>
                <li>Explain the problem your idea solves</li>
                <li>Describe the expected benefits and impact</li>
                <li>Your idea will be reviewed for originality</li>
                <li>Reviewers may request changes before approval</li>
              </ul>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/ideas')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Update Idea' : 'Submit Idea'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
