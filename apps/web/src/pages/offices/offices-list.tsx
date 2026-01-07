import { useState, useEffect } from 'react';
import { officesApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
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
  Building2,
  Plus,
  Search,
  Loader2,
  Edit,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import type { Office } from '../../types';

export function OfficesListPage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: '',
    description: '',
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    setLoading(true);
    try {
      const response = await officesApi.getAll();
      setOffices(response.data.items || response.data || []);
    } catch (error) {
      console.error('Failed to load offices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (office?: Office) => {
    if (office) {
      setEditingOffice(office);
      setFormData({
        name: office.name,
        code: office.code || '',
        location: office.location || '',
        description: office.description || '',
        isActive: office.isActive,
      });
    } else {
      setEditingOffice(null);
      setFormData({
        name: '',
        code: '',
        location: '',
        description: '',
        isActive: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || saving) return;
    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        code: formData.code || undefined,
        location: formData.location || undefined,
        description: formData.description || undefined,
        isActive: formData.isActive,
      };
      
      if (editingOffice) {
        await officesApi.update(editingOffice.id, payload);
      } else {
        await officesApi.create(payload);
      }
      setDialogOpen(false);
      loadOffices();
    } catch (error) {
      console.error('Failed to save office:', error);
    } finally {
      setSaving(false);
    }
  };

  const filteredOffices = offices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offices</h1>
          <p className="text-muted-foreground">
            Manage organization offices and locations
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          New Office
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Offices</CardTitle>
              <CardDescription>
                {filteredOffices.length} office(s)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, code, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredOffices.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No offices found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try a different search term.' : 'Create your first office to get started.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffices.map((office) => (
                  <TableRow key={office.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{office.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {office.code ? (
                        <Badge variant="outline">{office.code}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {office.location ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{office.location}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{office.userCount || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {office.isActive ? (
                        <Badge variant="success" className="flex items-center gap-1 w-fit">
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <XCircle className="h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(office)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingOffice ? 'Edit Office' : 'Create Office'}
            </DialogTitle>
            <DialogDescription>
              {editingOffice
                ? 'Update office details below'
                : 'Add a new office to the organization'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                placeholder="Office name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Code</Label>
              <Input
                placeholder="Office code (e.g., HQ, NYC)"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Office description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Active Status</Label>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.name || saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingOffice ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
