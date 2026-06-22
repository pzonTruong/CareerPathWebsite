import { useState } from 'react';
import { 
  FileText, 
  Mail, 
  Loader2, 
  ShieldCheck, 
  Building2,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { toast } from 'sonner';

export const LandingContractPage = () => {
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('support');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      toast.error('Please enter your email and message.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent! Our partnership coordinator will reply shortly.');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">
          <FileText className="size-3.5" /> Contact & Partnership Agreements
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Collaboration & Licensing</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Inquire about enterprise training tracks, university curriculum mapping, or standard community licensing.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12 items-start">
        {/* Left Column: License & Contracts Info (7 cols) */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          {/* Section 1: University */}
          <div className="flex gap-4 p-5 rounded-lg border border-border bg-card/45">
            <div className="inline-flex size-10 items-center justify-center rounded border border-border bg-secondary/60 text-primary shrink-0">
              <GraduationCap className="size-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Academic Syllabus mapping</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We design custom learning tracks tailored to academic structures, languages, and semester requirements. Fully open-source and free for educational institutions.
              </p>
            </div>
          </div>

          {/* Section 2: Enterprise */}
          <div className="flex gap-4 p-5 rounded-lg border border-border bg-card/45">
            <div className="inline-flex size-10 items-center justify-center rounded border border-border bg-secondary/60 text-primary shrink-0">
              <Building2 className="size-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Corporate training tracks</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Provide private tracking portals for company developers, enforce internal tech stacks, upload specialized nodes, and reference corporate guidelines. ($5/developer/month).
              </p>
            </div>
          </div>

          {/* Section 3: Licensing */}
          <div className="flex gap-4 p-5 rounded-lg border border-border bg-card/45">
            <div className="inline-flex size-10 items-center justify-center rounded border border-border bg-secondary/60 text-primary shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Community Open-source License</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                CareerPath platform codebase is distributed under the MIT license. Visual diagrams and learning tracks are licensed under Creative Commons BY-SA 4.0.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact/Partnership Form (5 cols) */}
        <div className="col-span-12 md:col-span-5">
          <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-base font-extrabold text-foreground">Partnership Request</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">Send a proposal or inquire about custom licensing.</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9 h-10 text-sm bg-background/50 focus-visible:ring-primary"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="purpose" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Purpose</Label>
                  <select
                    id="purpose"
                    className="w-full h-10 rounded border border-border bg-background/50 px-3 text-xs text-foreground font-semibold uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-primary focus-visible:ring-primary transition-colors cursor-pointer"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value="support">General Support</option>
                    <option value="academic">University Partnership</option>
                    <option value="corporate">Corporate Contract</option>
                    <option value="licensing">CC Licensing Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full resize-none rounded border border-border bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus-visible:ring-primary transition-colors"
                    placeholder="Tell us about your organization or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full text-xs font-semibold uppercase tracking-wider h-10 mt-2 bg-primary hover:bg-primary/95 text-primary-foreground" disabled={loading}>
                  {loading && <Loader2 className="size-3.5 animate-spin mr-1.5" />}
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
