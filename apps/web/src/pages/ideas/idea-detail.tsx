import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { ideasApi, reviewsApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Calendar,
  User,
  Building2,
  Tag,
  Edit,
  Loader2,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import type { Idea, Review, Comment } from '../../types';
import { formatDistanceToNow } from 'date-fns';

export function IdeaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [voting, setVoting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<string>('');
  const [reviewComments, setReviewComments] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const canReview = hasRole(['knowledge_champion', 'innovation_manager', 'system_admin']);
  const isOwner = idea?.submittedById === user?.id;

  useEffect(() => {
    if (id) {
      loadIdea();
      loadReviews();
    }
  }, [id]);

  const loadIdea = async () => {
    try {
      const response = await ideasApi.getById(id!);
      setIdea(response.data);
    } catch (error) {
      console.error('Failed to load idea:', error);
      navigate('/ideas');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await reviewsApi.getByIdea(id!);
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const handleVote = async () => {
    if (!idea || voting) return;
    setVoting(true);
    try {
      const hasVoted = idea.votes?.some((v) => v.voterId === user?.id);
      if (hasVoted) {
        await ideasApi.unvote(idea.id);
      } else {
        await ideasApi.vote(idea.id);
      }
      loadIdea();
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setVoting(false);
    }
  };

  const handleComment = async () => {
    if (!idea || !newComment.trim() || commenting) return;
    setCommenting(true);
    try {
      await ideasApi.addComment(idea.id, newComment.trim());
      setNewComment('');
      loadIdea();
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setCommenting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!idea) return;
    try {
      await ideasApi.deleteComment(idea.id, commentId);
      loadIdea();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!idea || !reviewDecision || submittingReview) return;
    setSubmittingReview(true);
    try {
      await reviewsApi.create({
        ideaId: idea.id,
        decision: reviewDecision,
        comments: reviewComments || undefined,
      });
      setReviewDialogOpen(false);
      setReviewDecision('');
      setReviewComments('');
      loadIdea();
      loadReviews();
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
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
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

  if (!idea) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Idea not found</p>
        <Link to="/ideas">
          <Button variant="link">Go back to ideas</Button>
        </Link>
      </div>
    );
  }

  const hasVoted = idea.votes?.some((v) => v.voterId === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/ideas')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Ideas
        </Button>
        <div className="flex items-center gap-2">
          {isOwner && idea.status === 'submitted' && (
            <Link to={`/ideas/${idea.id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          )}
          {canReview && !isOwner && ['submitted', 'under_review'].includes(idea.status) && (
            <Button onClick={() => setReviewDialogOpen(true)}>
              Review Idea
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{idea.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(idea.status)}
                    {idea.isOriginal ? (
                      <Badge variant="success">Original</Badge>
                    ) : (
                      <Badge variant="destructive">Duplicate</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground whitespace-pre-wrap">{idea.description}</p>
              
              <Separator />
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{idea.submittedBy?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(idea.submissionDate).toLocaleDateString()}</span>
                </div>
                {idea.office && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{idea.office.name}</span>
                  </div>
                )}
                {idea.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>{idea.category.name}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant={hasVoted ? 'default' : 'outline'}
                  onClick={handleVote}
                  disabled={voting || isOwner}
                >
                  {voting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ThumbsUp className={`mr-2 h-4 w-4 ${hasVoted ? 'fill-current' : ''}`} />
                  )}
                  {idea.voteCount} {idea.voteCount === 1 ? 'Vote' : 'Votes'}
                </Button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>{idea.comments?.length || 0} Comments</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleComment} disabled={commenting || !newComment.trim()}>
                      {commenting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {(!idea.comments || idea.comments.length === 0) ? (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                <div className="space-y-4">
                  {idea.comments.map((comment: Comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>{comment.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.author?.name || 'Unknown'}</span>
                            <span className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          {(comment.authorId === user?.id || hasRole('system_admin')) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <p className="mt-1 text-muted-foreground">{comment.content}</p>
                      </div>
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
              <CardTitle>Originality Score</CardTitle>
              <CardDescription>Algorithm-based originality assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {idea.originalityScore}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {idea.originalityScore >= 80 ? 'Highly Original' : 
                   idea.originalityScore >= 50 ? 'Moderately Original' : 
                   'Similar to existing ideas'}
                </p>
              </div>
            </CardContent>
          </Card>

          {reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Review History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2 pb-4 border-b last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{review.reviewer?.name || 'Reviewer'}</span>
                      {getStatusBadge(review.decision)}
                    </div>
                    {review.comments && (
                      <p className="text-sm text-muted-foreground">{review.comments}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {idea.attachments && idea.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {idea.attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <span className="text-sm">{attachment.filename || 'Attachment'}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Idea</DialogTitle>
            <DialogDescription>
              Provide your review decision and feedback for this idea.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Decision</Label>
              <Select value={reviewDecision} onValueChange={setReviewDecision}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approve</SelectItem>
                  <SelectItem value="rejected">Reject</SelectItem>
                  <SelectItem value="changes_requested">Request Changes</SelectItem>
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
