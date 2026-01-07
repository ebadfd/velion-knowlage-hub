import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { usersApi, officesApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Users,
  Search,
  Loader2,
  Eye,
  Filter,
  CheckCircle,
  XCircle,
  Shield,
  Building2,
} from 'lucide-react';
import type { User, Office } from '../../types';

export function UsersListPage() {
  const { hasRole, user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [officeFilter, setOfficeFilter] = useState<string>('all');

  const isSystemAdmin = hasRole('system_admin');
  const isLocalAdmin = hasRole('local_office_admin');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, officesRes] = await Promise.all([
        usersApi.getAll(),
        officesApi.getAll({ isActive: true }),
      ]);
      let usersList = usersRes.data.items || usersRes.data || [];
      
      if (isLocalAdmin && !isSystemAdmin) {
        usersList = usersList.filter((u: User) => u.officeId === currentUser?.officeId);
      }
      
      setUsers(usersList);
      setOffices(officesRes.data.items || officesRes.data || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
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
        <Badge variant="success" className="flex items-center gap-1 w-fit">
          <CheckCircle className="h-3 w-3" />
          Active
        </Badge>
      );
    }
    return (
      <Badge variant="destructive" className="flex items-center gap-1 w-fit">
        <XCircle className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.accountStatus === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesOffice = officeFilter === 'all' || user.officeId === officeFilter;
    return matchesSearch && matchesStatus && matchesRole && matchesOffice;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users and their roles
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                {filteredUsers.length} user(s) found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="knowledge_champion">Knowledge Champion</SelectItem>
                  <SelectItem value="innovation_manager">Innovation Manager</SelectItem>
                  <SelectItem value="local_office_admin">Office Admin</SelectItem>
                  {isSystemAdmin && <SelectItem value="system_admin">System Admin</SelectItem>}
                </SelectContent>
              </Select>
              {isSystemAdmin && (
                <Select value={officeFilter} onValueChange={setOfficeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Office" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Offices</SelectItem>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No users found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Office</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        {getRoleBadge(user.role)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.office ? (
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>{user.office.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.accountStatus)}</TableCell>
                    <TableCell>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/users/${user.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
