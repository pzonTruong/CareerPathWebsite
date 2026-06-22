import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/modules/auth/api/auth.api';
import { tokenStore } from '@/modules/auth/store/token.store';
import { AvatarUpload } from '@/modules/profile/components/AvatarUpload';
import { ProfileEditForm } from '@/modules/profile/components/ProfileEditForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/card';
import type { CurrentUser } from '@/modules/auth/types/auth.types';
import { Award, Shield, Target } from 'lucide-react';

type ProfileUser = CurrentUser & {
  displayName?: string;
  bio?: string;
  phone?: string;
  avatarUrl?: string;
};

export const ProfilePage = () => {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const res = await authApi.getMe();
      setUser(res.data as ProfileUser);
    } catch {
      tokenStore.clear();
      navigate('/logout');
    }
  }, [navigate]);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? '??';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">Profile Settings</h1>
        <p className="text-xs text-muted-foreground">Manage your developer profile, learning milestones, and contact info.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Left column — avatar + email + dev stats */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="flex flex-col items-center gap-5 p-6 border-border bg-card/65 backdrop-blur-sm shadow-xl">
            <AvatarUpload
              currentAvatarUrl={user?.avatarUrl}
              userInitials={initials}
              onUploadSuccess={(newUrl) => setUser((prev) => prev ? { ...prev, avatarUrl: newUrl } : prev)}
            />
            
            <div className="text-center space-y-1">
              {user?.displayName ? (
                <p className="font-extrabold text-lg text-foreground">{user.displayName}</p>
              ) : (
                <p className="font-bold text-foreground text-sm font-mono text-muted-foreground">Not set</p>
              )}
              <p className="text-xs font-mono text-muted-foreground">{user?.email ?? '—'}</p>
            </div>

            {/* Dev stats block */}
            <div className="w-full border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><Shield className="size-3.5 text-primary" /> System Rank</span>
                <span className="font-bold text-foreground uppercase text-[10px] tracking-wider bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded text-primary">Pro Member</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5"><Target className="size-3.5 text-primary" /> Target Role</span>
                <span className="font-semibold text-foreground text-right">Frontend Architect</span>
              </div>
            </div>
          </Card>

          {/* Gamified Developer Badges Card */}
          <Card className="p-6 border-border bg-card/60 backdrop-blur-sm shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Award className="size-4.5 text-primary" />
              <h3 className="text-xs font-black uppercase tracking-wider text-foreground">Earned Badges</h3>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-1 rounded text-[9px] font-bold border bg-secondary/30 border-border text-foreground uppercase font-mono">
                🚀 Early Adopter
              </span>
              <span className="px-2 py-1 rounded text-[9px] font-bold border bg-primary/10 border-primary/20 text-primary uppercase font-mono">
                💻 Javascript Pro
              </span>
              <span className="px-2 py-1 rounded text-[9px] font-bold border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 uppercase font-mono">
                ⚡ HTML/CSS Master
              </span>
              <span className="px-2 py-1 rounded text-[9px] font-bold border bg-rose-500/10 border-rose-500/20 text-rose-400 uppercase font-mono">
                ⚓ Git Committer
              </span>
            </div>
          </Card>
        </div>

        {/* Right column — edit form */}
        <Card className="lg:col-span-2 border-border bg-card/65 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold tracking-tight">Edit Profile</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Customize your personal bio, display initials, and profile metadata.</CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <ProfileEditForm
                defaultValues={{
                  displayName: user.displayName ?? '',
                  bio: user.bio ?? '',
                  phone: user.phone ?? '',
                }}
                onSuccess={fetchUser}
              />
            ) : (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground font-mono">
                Loading profile fields...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
