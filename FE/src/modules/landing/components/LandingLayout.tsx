import { Link, Outlet, useLocation } from 'react-router-dom';
import { Globe, LogIn } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/ui/theme-toggle';
import { tokenStore } from '@/modules/auth/store/token.store';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/roadmaps', label: 'Roadmaps' },
  { to: '/features', label: 'Features' },
  { to: '/contract', label: 'Contact & Contract' },
];

export const LandingLayout = () => {
  const location = useLocation();
  const isAuthenticated = Boolean(tokenStore.get());

  return (
    <div className="min-h-screen bg-background bg-dot-pattern bg-fixed text-foreground flex flex-col justify-between">
      <div>
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

            {/* Public Navigation links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'rounded px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border',
                      isActive
                        ? 'bg-secondary text-foreground border-border shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/40 border-transparent'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Auth CTAs */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="h-4 w-px bg-border" />
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="sm" className="h-8 text-xs font-semibold uppercase tracking-wider px-3 bg-primary hover:bg-primary/95">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold uppercase tracking-wider px-3 gap-1 text-muted-foreground hover:text-foreground">
                      <LogIn className="size-3.5" /> Login
                    </Button>
                  </Link>
                  <Link to="/register" className="hidden sm:block">
                    <Button size="sm" className="h-8 text-xs font-semibold uppercase tracking-wider px-3 bg-secondary text-foreground border border-border hover:bg-accent/40">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sub-Header Navigation */}
        <div className="border-b border-border bg-card/40 backdrop-blur-sm md:hidden py-2 px-4 flex justify-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'rounded px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all border',
                  isActive
                    ? 'bg-secondary text-foreground border-border shadow-sm'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Public Main content area */}
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Outlet />
        </main>
      </div>

      {/* Developer-centric Footer */}
      <footer className="border-t border-border bg-card/45 backdrop-blur-sm py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded bg-primary font-black text-[10px] text-primary-foreground">
              CP
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} careerpath.sh. A developer-centric community effort.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold font-mono text-muted-foreground">
            <Link to="/roadmaps" className="hover:text-foreground">Roadmaps</Link>
            <span className="text-border">•</span>
            <Link to="/features" className="hover:text-foreground">Features</Link>
            <span className="text-border">•</span>
            <Link to="/contract" className="hover:text-foreground">Licensing & Terms</Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Inline SVG GitHub Icon */}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="size-8 rounded border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Inline SVG Twitter Icon */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="size-8 rounded border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://roadmap.sh" target="_blank" rel="noreferrer" className="size-8 rounded border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all" title="Inspired by roadmap.sh">
              <Globe className="size-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
