import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Compass } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/ui/theme-toggle';
import { authApi } from '@/modules/auth/api/auth.api';
import { tokenStore } from '@/modules/auth/store/token.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import type { CurrentUser } from '@/modules/auth/types/auth.types';

const navItems = [
  { to: '/dashboard', label: 'Roadmaps', icon: Compass },
  { to: '/profile', label: 'Profile', icon: User },
];

export const AppLayout = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    authApi.getMe()
      .then((res) => setUser(res.data as CurrentUser))
      .catch(() => {
        tokenStore.clear();
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    tokenStore.clear();
    navigate('/login');
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? '??';

  return (
    <div className="min-h-screen bg-background bg-dot-pattern bg-fixed text-foreground">
      {/* Sticky Blurred Nav Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          {/* Custom Roadmap.sh Styled Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-base font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity">
            <div className="flex size-7 items-center justify-center rounded bg-primary font-black text-primary-foreground shadow-sm shadow-primary/20">
              CP
            </div>
            <span className="flex items-center font-extrabold text-foreground">
              careerpath<span className="text-primary font-medium text-sm ml-0.5">.sh</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border',
                    isActive
                      ? 'bg-secondary text-foreground border-border shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/40 border-transparent'
                  )}
                >
                  <item.icon className="size-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User controls + Logout */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Avatar className="size-7 ring-1 ring-border">
                <AvatarImage src={user?.avatarUrl} alt={user?.email} />
                <AvatarFallback className="text-xs bg-muted text-muted-foreground">{initials}</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 gap-1.5 text-muted-foreground hover:text-foreground font-medium text-xs px-2.5"
              >
                <LogOut className="size-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content grid */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
};

