import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/auth-context';
import {
  LayoutDashboard,
  Lightbulb,
  ClipboardCheck,
  FolderKanban,
  Trophy,
  Users,
  Building2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: [] },
  { name: 'Ideas', href: '/ideas', icon: Lightbulb, roles: [] },
  { name: 'Reviews', href: '/reviews', icon: ClipboardCheck, roles: ['knowledge_champion', 'innovation_manager', 'system_admin'] },
  { name: 'Projects', href: '/projects', icon: FolderKanban, roles: [] },
  { name: 'Rewards', href: '/rewards', icon: Trophy, roles: [] },
  { name: 'Users', href: '/users', icon: Users, roles: ['system_admin', 'local_office_admin', 'innovation_manager'] },
  { name: 'Offices', href: '/offices', icon: Building2, roles: ['system_admin'] },
  { name: 'Audit Logs', href: '/audit', icon: FileText, roles: ['system_admin'] },
];

export function Sidebar() {
  const location = useLocation();
  const { hasRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const filteredNav = navigation.filter(
    (item) => item.roles.length === 0 || item.roles.some((role) => hasRole(role))
  );

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
      style={{
        background: 'linear-gradient(180deg, hsl(10, 75%, 22%) 0%, hsl(10, 65%, 18%) 100%)',
      }}
    >
      <div className={cn(
        'flex h-16 items-center border-b border-white/10',
        collapsed ? 'justify-center px-2' : 'justify-between px-4'
      )}>
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="p-2 rounded-xl" style={{ background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)' }}>
              <Sparkles className="h-5 w-5" style={{ color: 'hsl(10, 75%, 15%)' }} />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">Velion</span>
              <span className="block text-[10px] text-white/60 font-medium tracking-wide uppercase">Knowledge Hub</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="p-2 rounded-xl" style={{ background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)' }}>
            <Sparkles className="h-5 w-5" style={{ color: 'hsl(10, 75%, 15%)' }} />
          </div>
        )}
      </div>
      
      <nav className="flex flex-col gap-1 p-3 mt-2">
        <div className={cn(
          'text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2',
          collapsed ? 'text-center' : 'px-3'
        )}>
          {!collapsed && 'Menu'}
        </div>
        {filteredNav.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-walnut-900 shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10',
                collapsed && 'justify-center px-2'
              )}
              style={isActive ? {
                background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)',
              } : undefined}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-walnut-900')} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full text-white/60 hover:text-white hover:bg-white/10',
            collapsed && 'px-2'
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
