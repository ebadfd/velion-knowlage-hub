import { useState, useEffect, useRef } from 'react';
import { usersApi } from '../../lib/api';
import { Input } from './input';
import { Avatar, AvatarFallback } from './avatar';
import { Loader2, Search, X } from 'lucide-react';
import type { User } from '../../types';

interface UserSearchProps {
  value: string;
  onChange: (userId: string, user?: User) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function UserSearch({ value, onChange, placeholder = 'Search users...', disabled }: UserSearchProps) {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value && !selectedUser) {
      usersApi.getById(value).then((res) => {
        setSelectedUser(res.data);
      }).catch(() => {});
    }
  }, [value]);

  const searchUsers = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setUsers([]);
      return;
    }
    setLoading(true);
    try {
      const response = await usersApi.search({ name: searchQuery, limit: 10 });
      setUsers(response.data.items || response.data || []);
    } catch (error) {
      console.error('Failed to search users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setOpen(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchUsers(newQuery);
    }, 300);
  };

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setQuery('');
    setOpen(false);
    onChange(user.id, user);
  };

  const handleClear = () => {
    setSelectedUser(null);
    setQuery('');
    onChange('');
  };

  if (selectedUser) {
    return (
      <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{selectedUser.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium">{selectedUser.name}</p>
          <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
        </div>
        {!disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-accent rounded"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="pl-9"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      {open && (users.length > 0 || loading) && (
        <div className="absolute z-50 mt-1 w-full bg-popover border rounded-md shadow-lg max-h-60 overflow-auto">
          {loading && users.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : users.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No users found
            </div>
          ) : (
            users.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleSelect(user)}
                className="w-full flex items-center gap-2 p-2 hover:bg-accent text-left"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
