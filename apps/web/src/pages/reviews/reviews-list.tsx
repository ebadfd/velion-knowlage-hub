import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ideasApi, reviewsApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  ClipboardCheck,
  Search,
  Loader2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
} from 'lucide-react';
import type { Idea } from '../../types';

export function ReviewsPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<string>('');
  const [reviewComments, setReviewComments] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadIdeas();
  }, [statusFilter]);

  const loadIdeas = async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = {};
      if (statusFilter === 'pending') {
        params.status = 'submitted,under_review';
      } else if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      const response = await ideasApi.getAll(params);
      setIdeas(response.data.items || response.data || []);
    } catch (error) {
      console.error('Failed to load ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = (idea: Idea) => {
    setSelectedIdea(idea);
    setReviewDecision('');
    setReviewComments('');
    setReviewDialogOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedIdea || !reviewDecision || submittingReview) return;
    setSubmittingReview(true);
    try {
      await reviewsApi.create({
        ideaId: selectedIdea.id,
        decision: reviewDecision,
        comments: reviewComments || undefined,
      });
      setReviewDialogOpen(false);
      setSelectedIdea(null);
      loadIdeas();
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'; icon: typeof CheckCircle }> = {
      submitted: { variant: 'secondary', icon: AlertCircle },
      under_review: { variant: 'warning', icon: AlertCircle },
      approved: { variant: 'success', icon: CheckCircle },
      rejected: { variant: 'destructive', icon: XCircle },
      changes_requested: { variant: 'warning', icon: AlertCircle },
      duplicate: { variant: 'destructive', icon: XCircle },
    };
    const { variant, icon: Icon } = config[status] || { variant: 'default', icon: AlertCircle };
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.submittedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Queue</h1>
          <p className="text-muted-foreground">
            Review and evaluate submitted ideas
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Ideas Pending Review</CardTitle>
                <CardDescription>
                  {filteredIdeas.length} idea(s) to review
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, description, or submitter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="changes_requested">Changes Requested</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No ideas to review</h3>
              <p className="text-muted-foreground">
                {statusFilter === 'pending'
                  ? 'All ideas have been reviewed!'
                  : 'No ideas match your current filters.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Submitter</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Originality</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIdeas.map((idea) => (
                  <TableRow key={idea.id}>
                    <TableCell className="font-medium max-w-[300px]">
                      <Link
                        to={`/ideas/${idea.id}`}
                        className="hover:underline line-clamp-1"
                      >
                        {idea.title}
                      </Link>
                    </TableCell>
                    <TableCell>{idea.submittedBy?.name || 'Unknown'}</TableCell>
                    <TableCell>{idea.category?.name || '-'}</TableCell>
                    <TableCell>{getStatusBadge(idea.status)}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        idea.originalityScore >= 80 ? 'text-green-600' :
                        idea.originalityScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {idea.originalityScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(idea.submissionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/ideas/${idea.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        {['submitted', 'under_review'].includes(idea.status) && (
                          <Button size="sm" onClick={() => handleOpenReview(idea)}>
                            Review
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Idea</DialogTitle>
            <DialogDescription>
              {selectedIdea?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedIdea && (
            <div className="space-y-4 py-4">
              <div className="bg-muted p-4 rounded-md space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedIdea.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Submitter:</span>{' '}
                  <span className="font-medium">{selectedIdea.submittedBy?.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Originality Score:</span>{' '}
                  <span className="font-medium">{selectedIdea.originalityScore}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>{' '}
                  <span className="font-medium">{selectedIdea.category?.name || '-'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Votes:</span>{' '}
                  <span className="font-medium">{selectedIdea.voteCount}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Decision *</Label>
                <Select value={reviewDecision} onValueChange={setReviewDecision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approve</SelectItem>
                    <SelectItem value="rejected">Reject</SelectItem>
                    <SelectItem value="changes_requested">Request Changes</SelectItem>
                    <SelectItem value="duplicate">Mark as Duplicate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Comments (Optional)</Label>
                <Textarea
                  placeholder="Provide feedback for the idea submitter..."
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReview} disabled={!reviewDecision || submittingReview}>
              {submittingReview && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
