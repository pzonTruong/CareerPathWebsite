import { Compass, GitMerge, Layers } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { ThemeToggle } from '@/shared/components/ui/theme-toggle';

const navItems = [
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/forgot-password', label: 'Reset' }
];

export const AuthLayout = () => {
  const location = useLocation();

  return (
    <main className="relative mx-auto flex min-h-screen w-full items-center justify-center bg-background bg-dot-pattern px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl grid gap-8 md:grid-cols-12 items-center">
        {/* Left column - Mockup Roadmap Visualizer (7 cols) */}
        <section className="hidden md:flex flex-col justify-between h-[520px] col-span-7 rounded-xl border border-border bg-card/60 backdrop-blur-sm p-8 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded bg-primary font-black text-primary-foreground shadow-sm shadow-primary/20">
                CP
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">
                careerpath<span className="text-primary font-medium text-sm ml-0.5">.sh</span>
              </h2>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-foreground leading-tight">
                Step-by-step career path guides
              </h1>
              <p className="text-sm text-muted-foreground">
                Follow guided paths, track your skill nodes, and advance your engineering career with structured roadmaps.
              </p>
            </div>

            {/* Interactive node timeline preview */}
            <div className="relative border border-border rounded-lg bg-background/50 p-5 space-y-4 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl" />
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground border-b border-border pb-3">
                <GitMerge className="size-4 text-primary" />
                <span>PREVIEW: FRONTEND ROADMAP</span>
              </div>
              <div className="space-y-3 relative">
                {/* Node connector line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-border" />
                
                {/* Node 1 */}
                <div className="flex items-start gap-3 relative">
                  <div className="size-6 rounded-full bg-secondary border border-border flex items-center justify-center z-10">
                    <div className="size-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Internet Essentials</h4>
                    <p className="text-[10px] text-muted-foreground">HTTP, DNS, Domain Names</p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="flex items-start gap-3 relative">
                  <div className="size-6 rounded-full bg-secondary border border-border flex items-center justify-center z-10">
                    <div className="size-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">HTML & CSS basics</h4>
                    <p className="text-[10px] text-muted-foreground">Semantic markup, responsive layout</p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex items-start gap-3 relative">
                  <div className="size-6 rounded-full bg-primary flex items-center justify-center z-10 shadow-sm shadow-primary/20">
                    <div className="size-2 rounded-full bg-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary">JavaScript programming</h4>
                    <p className="text-[10px] text-muted-foreground">DOM, Fetch API, ES6 modules</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4 text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5"><Compass className="size-3.5" /> Interactive Paths</span>
            <span className="flex items-center gap-1.5"><Layers className="size-3.5" /> Skill-based Nodes</span>
            <span>TypeScript • React</span>
          </div>
        </section>

        {/* Right column - Auth Forms (5 cols) */}
        <section className="col-span-12 md:col-span-5 flex flex-col gap-5 w-full">
          {/* Mobile Logo Header */}
          <div className="flex md:hidden items-center justify-center gap-2.5 mb-2">
            <div className="flex size-7 items-center justify-center rounded bg-primary font-black text-primary-foreground">
              CP
            </div>
            <span className="font-extrabold text-lg text-foreground">
              careerpath<span className="text-primary font-medium text-sm ml-0.5">.sh</span>
            </span>
          </div>

          <div className="flex justify-center">
            <nav className="inline-flex rounded border border-border bg-muted/30 p-1 w-full max-w-xs justify-between">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex-1 text-center rounded px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all',
                      isActive 
                        ? 'bg-card text-foreground border border-border shadow-sm font-bold' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/40'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
};

