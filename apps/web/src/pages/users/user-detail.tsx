import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { usersApi, officesApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
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
  Loader2,
  Shield,
  Building2,
  Mail,
  Calendar,
  Award,
  Lightbulb,
  CheckCircle,
  XCircle,
  UserCog,
} from 'lucide-react';
import type { User, Office, Role } from '../../types';

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hasRole, user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [offices, setOffices] = useState<Office[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedOffice, setSelectedOffice] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const isSystemAdmin = hasRole('system_admin');
  const isLocalAdmin = hasRole('local_office_admin');
  const canEdit = isSystemAdmin || (isLocalAdmin && user?.officeId === currentUser?.officeId);

  useEffect(() => {
    if (id) {
      loadUser();
      loadOffices();
      loadRoles();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      const response = await usersApi.getById(id!);
      setUser(response.data);
      const primaryRole = response.data.roles?.[0]?.name || response.data.role || 'user';
      setSelectedRole(primaryRole);
      setSelectedStatus(response.data.status || response.data.accountStatus || 'active');
      setSelectedOffice(response.data.officeId || 'none');
    } catch (error) {
      console.error('Failed to load user:', error);
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  const loadOffices = async () => {
    try {
      const response = await officesApi.getAll({ isActive: true });
      setOffices(response.data.items || response.data || []);
    } catch (error) {
      console.error('Failed to load offices:', error);
    }
  };

  const loadRoles = async () => {
    try {
      const response = await usersApi.getRoles();
      setRoles(response.data || []);
    } catch (error) {
      console.error('Failed to load roles:', error);
    }
  };

  const handleSave = async () => {
    if (!user || saving) return;
    setSaving(true);
    try {
      const updates: Record<string, unknown> = {};
      const primaryRole = user.roles?.[0]?.name || user.role || 'user';
      
      if (selectedRole !== primaryRole && isSystemAdmin) {
        const roleObj = roles.find((r) => r.name === selectedRole);
        if (roleObj) {
          await usersApi.assignRoles(user.id, [roleObj.id]);
        }
      }
      
      const currentStatus = user.status || user.accountStatus || 'active';
      if (selectedStatus !== currentStatus) {
        updates.status = selectedStatus;
      }
      if (selectedOffice !== (user.officeId || 'none') && isSystemAdmin) {
        updates.officeId = selectedOffice === 'none' ? null : selectedOffice;
      }
      
      if (Object.keys(updates).length > 0) {
        await usersApi.update(user.id, updates);
      }
      
      loadUser();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'; label: string }> = {
      system_admin: { variant: 'destructive', label: 'System Admin' },
      innovation_manager: { variant: 'warning', label: 'Innovation Manager' },
      knowledge_champion: { variant: 'success', label: 'Knowledge Champion' },
      local_office_admin: { variant: 'secondary', label: 'Office Admin' },
      user: { variant: 'default', label: 'User' },
    };
    const { variant, label } = config[role] || { variant: 'default', label: role };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Active
        </Badge>
      );
    }
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="h-3 w-3" />
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

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">User not found</p>
        <Button variant="link" onClick={() => navigate('/users')}>
          Go back to users
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/users')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
        {canEdit && (
          <Button onClick={() => setEditDialogOpen(true)}>
            <UserCog className="mr-2 h-4 w-4" />
            Edit User
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">
                    {user.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-base flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    {user.roles?.map((r) => <span key={r.id || r.name}>{getRoleBadge(r.name)}</span>) || getRoleBadge(user.role)}
                    {getStatusBadge(user.status || user.accountStatus)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Office:</span>
                  <span className="font-medium">{user.office?.name || 'Not assigned'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium">{(user.roles?.[0]?.name || user.role || 'user').replace('_', ' ')}</span>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Login:</span>
                    <span className="font-medium">
                      {new Date(user.lastLogin).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {user.bio && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{user.bio}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Ideas Submitted</span>
                </div>
                <span className="font-medium">{user.ideasSubmitted || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Ideas Approved</span>
                </div>
                <span className="font-medium">{user.ideasApproved || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-muted-foreground">Total Points</span>
                </div>
                <span className="font-medium">{user.totalPoints || 0}</span>
              </div>
            </CardContent>
          </Card>

          {user.rewards && user.rewards.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.rewards.slice(0, 5).map((reward) => (
                    <div key={reward.id} className="flex items-center gap-3">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">{reward.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(reward.awardedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user role, status, and office assignment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isSystemAdmin && (
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="knowledge_champion">Knowledge Champion</SelectItem>
                    <SelectItem value="innovation_manager">Innovation Manager</SelectItem>
                    <SelectItem value="local_office_admin">Office Admin</SelectItem>
                    <SelectItem value="system_admin">System Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Account Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isSystemAdmin && (
              <div className="space-y-2">
                <Label>Office</Label>
                <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an office" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Office</SelectItem>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
