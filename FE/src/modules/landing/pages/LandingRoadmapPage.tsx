import { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  ExternalLink, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Link } from 'react-router-dom';
import { tokenStore } from '@/modules/auth/store/token.store';

interface RoadmapNode {
  id: string;
  label: string;
  description: string;
  category: 'basics' | 'styles' | 'logic' | 'tools';
  resources: string[];
}

const roadmapNodes: Record<string, RoadmapNode> = {
  internet: {
    id: 'internet',
    label: 'Internet Essentials',
    description: 'How does the internet work? DNS, domains, hosting, HTTP/HTTPS request-response cycles, and client-server structures.',
    category: 'basics',
    resources: ['MDN: How does the Internet work?', 'roadmap.sh: HTTP Overview', 'DNS Explained (Video)'],
  },
  html: {
    id: 'html',
    label: 'Semantic HTML',
    description: 'HyperText Markup Language: tags, semantic elements, DOM hierarchy, forms & validation, accessibility (ARIA), and SEO basics.',
    category: 'styles',
    resources: ['MDN Web Docs: HTML', 'W3Schools HTML course', 'web.dev: HTML Accessibility'],
  },
  css: {
    id: 'css',
    label: 'Modern CSS Layouts',
    description: 'Cascading Style Sheets: selectors, Box Model, Flexbox & Grid layouts, Media Queries for responsive designs, CSS variables, and preprocessors.',
    category: 'styles',
    resources: ['CSS-Tricks Flexbox Guide', 'CSS-Tricks Grid Guide', 'MDN: Responsive CSS'],
  },
  js: {
    id: 'js',
    label: 'JavaScript ES6+',
    description: 'Programming fundamentals: variables, arrays, callback functions, scopes, closures, DOM manipulation, Fetch API, async/await, and ES modules.',
    category: 'logic',
    resources: ['javascript.info - Modern JS', 'MDN: JavaScript Basics', 'Eloquent JavaScript book'],
  },
  ts: {
    id: 'ts',
    label: 'TypeScript',
    description: 'Static type checking for JavaScript. Restrict variables, define interfaces/types, enable strict compile checks, and compile type-safe modules.',
    category: 'logic',
    resources: ['TypeScript Handbook', 'TS Deep Dive (Online)', 'Vite + TypeScript guide'],
  },
  react: {
    id: 'react',
    label: 'React Library',
    description: 'Component-based UI architecture, virtual DOM updates, useState/useEffect hooks, state lifting, Context API, and modular file separation.',
    category: 'logic',
    resources: ['React Dev Docs (New)', 'Scrimba React Course', 'React Hooks deep-dive'],
  },
  vite: {
    id: 'vite',
    label: 'Vite Bundler',
    description: 'Next-generation bundler: fast hot module replacement (HMR), development hot reloads with esbuild, and production bundle builds.',
    category: 'tools',
    resources: ['Vitejs.dev Docs', 'Frontend Tooling guide', 'Vite vs Webpack comparison'],
  },
  git: {
    id: 'git',
    label: 'Git & Version Control',
    description: 'Source code management. Commits, branch merging, git workflows, clone repositories, resolving conflicts, and push/pull requests.',
    category: 'tools',
    resources: ['GitHub Git Cheat Sheet', 'Pro Git Book (Free)', 'Learn Git Branching (Game)'],
  },
};

export const LandingRoadmapPage = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('internet');
  const selectedNode = roadmapNodes[selectedNodeId];
  const isAuthenticated = Boolean(tokenStore.get());

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">
          <Compass className="size-3.5" /> Interactive Roadmap Preview
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Frontend Path Preview</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Click any of the technology nodes below to inspect key learning outcomes, prerequisites, and resource links.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12 items-start">
        {/* Left Side: Clickable Flowchart Diagram (7 cols) */}
        <div className="col-span-12 md:col-span-7 border border-border bg-card/45 backdrop-blur-sm rounded-xl p-6 shadow-xl relative min-h-[500px] flex flex-col justify-between">
          <div className="absolute top-2 left-2 text-[9px] font-bold font-mono text-muted-foreground tracking-widest uppercase">
            Map View
          </div>
          
          <div className="space-y-8 pt-4">
            {/* Row 1: Basics */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-widest">Stage 1: Core Essentials</p>
              <div className="grid grid-cols-2 gap-3">
                {['internet', 'git'].map((id) => {
                  const node = roadmapNodes[id];
                  const isSelected = selectedNodeId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedNodeId(id)}
                      className={`h-11 px-3 rounded text-xs font-bold uppercase tracking-wider text-center border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]' 
                          : 'bg-secondary/40 border-border text-foreground hover:border-primary/40'
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connecting arrow indicator */}
            <div className="flex justify-center">
              <div className="h-6 w-0.5 bg-border relative">
                <div className="absolute -bottom-1 -left-1 text-border">▼</div>
              </div>
            </div>

            {/* Row 2: Styling */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-widest">Stage 2: Styling & HTML Structure</p>
              <div className="grid grid-cols-2 gap-3">
                {['html', 'css'].map((id) => {
                  const node = roadmapNodes[id];
                  const isSelected = selectedNodeId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedNodeId(id)}
                      className={`h-11 px-3 rounded text-xs font-bold uppercase tracking-wider text-center border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]' 
                          : 'bg-secondary/40 border-border text-foreground hover:border-primary/40'
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connecting arrow indicator */}
            <div className="flex justify-center">
              <div className="h-6 w-0.5 bg-border relative">
                <div className="absolute -bottom-1 -left-1 text-border">▼</div>
              </div>
            </div>

            {/* Row 3: Logic */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-widest">Stage 3: Language Logic & Modules</p>
              <div className="grid grid-cols-2 gap-3">
                {['js', 'ts'].map((id) => {
                  const node = roadmapNodes[id];
                  const isSelected = selectedNodeId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedNodeId(id)}
                      className={`h-11 px-3 rounded text-xs font-bold uppercase tracking-wider text-center border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]' 
                          : 'bg-secondary/40 border-border text-foreground hover:border-primary/40'
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connecting arrow indicator */}
            <div className="flex justify-center">
              <div className="h-6 w-0.5 bg-border relative">
                <div className="absolute -bottom-1 -left-1 text-border">▼</div>
              </div>
            </div>

            {/* Row 4: UI Framework */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-widest">Stage 4: Tooling & UI Frameworks</p>
              <div className="grid grid-cols-2 gap-3">
                {['react', 'vite'].map((id) => {
                  const node = roadmapNodes[id];
                  const isSelected = selectedNodeId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedNodeId(id)}
                      className={`h-11 px-3 rounded text-xs font-bold uppercase tracking-wider text-center border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]' 
                          : 'bg-secondary/40 border-border text-foreground hover:border-primary/40'
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mt-8 border-t border-border pt-4">
            <Sparkles className="size-3 text-primary animate-pulse" />
            <span>Interactive Demo: Authenticated users can click nodes to toggle "Mastered" status.</span>
          </div>
        </div>

        {/* Right Side: Sidebar Info Details (5 cols) */}
        <div className="col-span-12 md:col-span-5 space-y-4">
          <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xl min-h-[400px] flex flex-col justify-between">
            <CardHeader className="pb-3 border-b border-border">
              <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded border border-primary/20 inline-block w-fit">
                {selectedNode.category.toUpperCase()} NODE
              </span>
              <CardTitle className="text-lg font-black tracking-tight text-foreground mt-2">{selectedNode.label}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-4 flex-grow">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-muted-foreground uppercase font-mono">Overview</h4>
                <p className="text-xs text-foreground leading-relaxed font-medium bg-background/40 p-3 rounded border border-border">
                  {selectedNode.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase font-mono flex items-center gap-1">
                  <BookOpen className="size-3.5 text-primary" /> Learning Resources
                </h4>
                <div className="space-y-1.5">
                  {selectedNode.resources.map((res, i) => (
                    <a
                      key={res}
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between text-xs text-muted-foreground hover:text-primary transition-all p-2 rounded border border-border hover:border-primary/25 bg-background/20 hover:bg-background/60"
                    >
                      <span className="font-semibold">{i + 1}. {res}</span>
                      <ExternalLink className="size-3 text-primary/75" />
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>

            {/* Bottom Register CTA inside Sidebar */}
            <div className="p-6 border-t border-border bg-accent/20">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button className="w-full text-xs font-semibold uppercase tracking-wider h-10 bg-primary hover:bg-primary/95 text-primary-foreground">
                  {isAuthenticated ? 'Go to Dashboard' : 'Track Your Progress'} <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
