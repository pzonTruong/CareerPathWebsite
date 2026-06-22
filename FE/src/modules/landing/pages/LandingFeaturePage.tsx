import { Link } from 'react-router-dom';
import { 
  ListChecks, 
  Download, 
  Edit, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { tokenStore } from '@/modules/auth/store/token.store';

const featuresList = [
  {
    title: 'Visual Skill Checklists',
    description: 'Check off technology modules as you complete courses. Instantly see your path progress updates in beautiful percentage metrics.',
    icon: ListChecks,
    badge: 'Core',
  },
  {
    title: 'Custom Milestones',
    description: 'Add your own learning links, custom text notes, and mock project directories to existing core roadmaps.',
    icon: Edit,
    badge: 'Customizable',
  },
  {
    title: 'Offline Exports',
    description: 'Download full vector diagrams as high-resolution printable PDFs or image vectors to reference locally.',
    icon: Download,
    badge: 'Offline',
  },
  {
    title: 'Milestone Analytics',
    description: 'Detailed chart readouts of weekly commits, study timelines, and engineering levels based on completed nodes.',
    icon: TrendingUp,
    badge: 'Metrics',
  },
  {
    title: 'Collaborative Groups',
    description: 'Create student classes or corporate teams. Design custom learning pipelines and track group performance indices.',
    icon: Users,
    badge: 'Enterprise',
  },
];

export const LandingFeaturePage = () => {
  const isAuthenticated = Boolean(tokenStore.get());

  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider animate-pulse">
          <Layers className="size-3.5" /> Platform Features
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Supercharged Developer Tooling</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          careerpath.sh provides all the instruments needed to visualize, optimize, and share your technical progression.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuresList.map((feat) => (
          <Card key={feat.title} className="relative flex flex-col justify-between border-border bg-card/45 hover:bg-card hover:border-primary/50 transition-all duration-200 group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex size-9 items-center justify-center rounded border border-border bg-secondary/80 text-primary group-hover:border-primary/30 transition-colors">
                  <feat.icon className="size-4.5" />
                </div>
                <span className="text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary/50 border border-border text-muted-foreground">
                  {feat.badge}
                </span>
              </div>
              <CardTitle className="text-base font-extrabold group-hover:text-primary transition-colors">{feat.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                {feat.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}

        {/* Custom Feature Card mockup */}
        <Card className="relative flex flex-col justify-between border-primary/20 bg-primary/5 p-6 md:col-span-2 lg:col-span-1 border-dashed">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-4 animate-bounce" /> Gamified Rewards
            </div>
            <h3 className="text-base font-extrabold text-foreground leading-tight">Unlock achievements and level up!</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Earn specialized developer badges such as "JavaScript Pro" and "Git Committer" as you tick off milestones. Display your developer card publicly to recruiters!
            </p>
          </div>
          
          <div className="pt-6">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button className="w-full text-xs font-semibold uppercase tracking-wider h-10 bg-primary hover:bg-primary/95 text-primary-foreground">
                Get Started Now <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Visual callout banner */}
      <section className="relative overflow-hidden rounded-xl border border-border bg-card/25 p-8 text-center space-y-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest font-mono">Open Source & Community-Led</h3>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          All roadmaps, resources, and structures are built and moderated by over 12,000 community engineers. Spot a typo or outdated link? Propose a branch modification directly on GitHub!
        </p>
      </section>
    </div>
  );
};
