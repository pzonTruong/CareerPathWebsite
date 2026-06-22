import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Upload, 
  Settings, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Award, 
  Clock, 
  Flame, 
  ArrowRight
} from 'lucide-react';
import { authApi } from '@/modules/auth/api/auth.api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { CurrentUser } from '@/modules/auth/types/auth.types';

const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Step-by-step guide to modern web development. HTML, CSS, JS, React, and build tools.',
    icon: Terminal,
    difficulty: 'Beginner-Friendly',
    duration: '3-6 months',
    progress: 45,
    nextNode: 'React Hooks & Context',
    tag: 'Popular',
    tagColor: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Server-side systems, databases, security, API routing, and architectural patterns.',
    icon: Cpu,
    difficulty: 'Intermediate',
    duration: '6-9 months',
    progress: 15,
    nextNode: 'SQL & Database Indexing',
    tag: 'Trending',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Containerization, orchestration, continuous integration, cloud architectures, and pipelines.',
    icon: GitBranch,
    difficulty: 'Advanced',
    duration: '9-12 months',
    progress: 0,
    nextNode: 'Docker Containers',
    tag: 'Hot',
    tagColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
];

const quickActions = [
  {
    title: 'Edit Profile',
    description: 'Update your display name, bio, and phone number.',
    icon: User,
    to: '/profile',
  },
  {
    title: 'Upload Avatar',
    description: 'Set a profile picture to personalize your account.',
    icon: Upload,
    to: '/profile',
  },
  {
    title: 'Account Settings',
    description: 'Manage your account preferences and security.',
    icon: Settings,
    to: '/profile',
  },
];

export const HomePage = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    authApi.getMe()
      .then((res) => setUser(res.data as CurrentUser))
      .catch(() => {});
  }, []);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Developer';

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-sm p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10" />
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">
            <Award className="size-3.5" /> Dashboard
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-tight">
            Welcome back, <span className="text-primary font-extrabold">{displayName}</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Track your roadmaps, check off skill nodes, and reference professional learning paths optimized for engineers.
          </p>
        </div>

        {/* User Stats Card Strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider font-bold">Profile Status</p>
            <p className="text-sm font-bold text-foreground">Active (Verified)</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider font-bold">Roadmaps Started</p>
            <p className="text-sm font-bold text-foreground">2 In Progress</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider font-bold">Nodes Mastered</p>
            <p className="text-sm font-bold text-foreground">18 Skills</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider font-bold">Current Level</p>
            <p className="text-sm font-bold text-foreground">Level 3 (Junior)</p>
          </div>
        </div>
      </section>

      {/* Role-based Roadmaps */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-black uppercase tracking-wider text-foreground">Interactive Roadmaps</h2>
          <p className="text-xs text-muted-foreground">Select a role path to view required technology blocks and track your skills.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roadmaps.map((path) => (
            <Card key={path.id} className="relative flex flex-col justify-between border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex size-10 items-center justify-center rounded border border-border bg-secondary/80 text-primary group-hover:border-primary/30 transition-colors">
                    <path.icon className="size-5" />
                  </div>
                  {path.tag && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${path.tagColor}`}>
                      {path.tag}
                    </span>
                  )}
                </div>
                <CardTitle className="text-base font-extrabold group-hover:text-primary transition-colors">{path.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed mt-1">{path.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 pb-6 pt-0">
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-b border-border py-2.5 my-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-3 text-primary" /> {path.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground justify-end">
                    <Flame className="size-3 text-primary" /> {path.difficulty}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-muted-foreground uppercase">Path Progress</span>
                    <span className="text-primary">{path.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500 rounded-full" 
                      style={{ width: `${path.progress}%` }} 
                    />
                  </div>
                </div>

                {/* Next node */}
                {path.progress > 0 && path.nextNode && (
                  <div className="rounded border border-border bg-background/60 p-2.5 text-[11px] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground block">Next Skill Node</span>
                      <span className="font-semibold text-foreground">{path.nextNode}</span>
                    </div>
                    <ArrowRight className="size-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}

                {path.progress === 0 && (
                  <button className="w-full flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary py-2 transition-all cursor-pointer">
                    Start Roadmap <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Settings & Profile Actions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-black uppercase tracking-wider text-foreground">Quick Actions</h2>
          <p className="text-xs text-muted-foreground">Manage your credentials, upload a new photo, and update security.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.to} className="group block">
              <Card className="h-full border-border bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-200">
                <CardHeader className="pb-3 flex-row gap-3 items-start">
                  <div className="inline-flex size-9 items-center justify-center rounded border border-border bg-secondary/80 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors shrink-0">
                    <action.icon className="size-4.5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors leading-tight">{action.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground leading-snug">{action.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
