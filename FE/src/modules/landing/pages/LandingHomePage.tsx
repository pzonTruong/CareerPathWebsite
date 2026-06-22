import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Users, 
  CheckSquare, 
  Share2, 
  GitMerge
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { tokenStore } from '@/modules/auth/store/token.store';

const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Master client-side programming. HTML, CSS, JavaScript, modern frameworks, and responsive architectures.',
    icon: Terminal,
    nodes: ['Internet', 'HTML & CSS', 'JavaScript', 'React', 'Build Tools'],
    popularity: '94% high demand',
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Architect scalable API servers, relational and non-relational database indexes, security, and scaling.',
    icon: Cpu,
    nodes: ['Node.js/Python', 'SQL & Databases', 'RESTful APIs', 'Caching', 'Testing'],
    popularity: '89% high demand',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Learn automation, system operations, Docker, Kubernetes containers, and continuous integration pipelines.',
    icon: GitBranch,
    nodes: ['Linux OS', 'Containers (Docker)', 'CI/CD Pipelines', 'Kubernetes', 'Cloud Hosting'],
    popularity: '91% high demand',
  },
];

const features = [
  {
    title: 'Visual Roadmap Connections',
    description: 'Follow logical flowcharts mapping out prerequisite and secondary technologies.',
    icon: GitMerge,
  },
  {
    title: 'Skill Progress Tracking',
    description: 'Tick off node checkboxes and save your learning journey in real-time.',
    icon: CheckSquare,
  },
  {
    title: 'Streaks & Sharing',
    description: 'Share your achievements, streaks, and custom paths with your colleagues or on LinkedIn.',
    icon: Share2,
  },
];

export const LandingHomePage = () => {
  const isAuthenticated = Boolean(tokenStore.get());

  return (
    <div className="space-y-16">
      {/* High-Fidelity Cyber-Yellow Hero Section */}
      <section className="relative overflow-hidden rounded-xl border border-border bg-card/45 backdrop-blur-sm p-10 md:p-14 shadow-2xl text-center space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl -z-10 animate-pulse" />
        
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
            🚀 DEV-APPROVED PATH GUIDES
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-foreground">
            Developer Roadmaps & <span className="text-primary">Interactive Guides</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            careerpath.sh is a developer-centric community catalog of visual learning guides, skill nodes, and progress dashboards. Pick a path below to start tracking your journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link to={isAuthenticated ? "/dashboard" : "/register"}>
            <Button size="lg" className="text-xs font-semibold uppercase tracking-wider h-11 px-6 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/95 text-primary-foreground">
              {isAuthenticated ? 'Go to Dashboard' : 'Start Tracking - Free'} <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </Link>
          <Link to="/roadmaps">
            <Button size="lg" variant="outline" className="text-xs font-semibold uppercase tracking-wider h-11 px-6 border-border hover:bg-accent/40 text-foreground">
              Explore Roadmap Catalog
            </Button>
          </Link>
        </div>

        {/* Visual node flowchart mock */}
        <div className="hidden md:flex justify-center items-center gap-4 pt-10 border-t border-border/80 max-w-lg mx-auto text-xs font-mono text-muted-foreground">
          <span className="bg-secondary px-2.5 py-1.5 rounded border border-border">Internet</span>
          <ArrowRight className="size-3.5 text-primary" />
          <span className="bg-secondary px-2.5 py-1.5 rounded border border-border">HTML & CSS</span>
          <ArrowRight className="size-3.5 text-primary" />
          <span className="bg-primary/10 px-2.5 py-1.5 rounded border border-primary/20 text-primary font-bold">JavaScript</span>
          <ArrowRight className="size-3.5 text-primary" />
          <span className="bg-secondary px-2.5 py-1.5 rounded border border-border">React</span>
        </div>
      </section>

      {/* Community scale stats */}
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-b border-border py-10">
        <div className="text-center space-y-1">
          <div className="flex justify-center items-center gap-2 text-primary">
            <Users className="size-5" />
            <p className="text-3xl font-black text-foreground">1.5M+</p>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">Monthly Developers</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-black text-foreground">30+</p>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">Guided Core Paths</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-black text-foreground">890K+</p>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">Completed Nodes</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-black text-primary">No. 1</p>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">Open-source Catalog</p>
        </div>
      </section>

      {/* Roadmap path highlights */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-wider text-foreground">Core Engineering Paths</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Follow comprehensive, community-vetted flowcharts for frontend, backend, and DevOps roles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roadmaps.map((path) => (
            <Card key={path.id} className="relative flex flex-col justify-between border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex size-9 items-center justify-center rounded border border-border bg-secondary/80 text-primary group-hover:border-primary/30 transition-colors">
                    <path.icon className="size-4.5" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    {path.popularity}
                  </span>
                </div>
                <CardTitle className="text-base font-extrabold group-hover:text-primary transition-colors">{path.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed mt-1">{path.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 pb-6 pt-0">
                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground font-mono">Sample Node Path</p>
                  <div className="flex flex-wrap gap-1.5">
                    {path.nodes.map((node, i) => (
                      <span key={node} className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${i === 3 ? 'bg-primary/10 text-primary border-primary/20 font-bold' : 'bg-secondary/40 border-border text-muted-foreground'}`}>
                        {node}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to="/roadmaps" className="block pt-2">
                  <Button className="w-full text-xs font-semibold uppercase tracking-wider h-9 bg-secondary text-foreground border border-border hover:bg-accent/40 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Preview Roadmap
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature callouts */}
      <section className="space-y-8 border-t border-border pt-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Why choose careerpath.sh?</h2>
          <p className="text-xs text-muted-foreground">Everything you need to map, track, and share your learning accomplishments.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feat) => (
            <div key={feat.title} className="text-center space-y-3 p-4 rounded border border-border bg-card/25">
              <div className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary">
                <feat.icon className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground leading-tight">{feat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
