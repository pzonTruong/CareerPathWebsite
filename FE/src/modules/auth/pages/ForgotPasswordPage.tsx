import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyRound, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { authApi } from '../api/auth.api';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

const requestSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

const resetSchema = z.object({
  email: z.string().optional(),
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

type RequestValues = z.infer<typeof requestSchema>;
type ResetValues = z.infer<typeof resetSchema>;

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');

  const requestForm = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
  });
  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
  });

  const onRequestToken = requestForm.handleSubmit(async (values) => {
    try {
      await authApi.forgotPassword(values.email);
      setEmail(values.email);
      setStep('reset');
      toast.success('Reset token sent to your email.');
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Something went wrong');
    }
  });

  const onResetPassword = resetForm.handleSubmit(async (values) => {
    try {
      await authApi.resetPassword(email || values.email || '', values.token, values.newPassword);
      toast.success('Password reset successful. You can login now.');
      setStep('request');
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Something went wrong');
    }
  });

  return (
    <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold tracking-tight">
          {step === 'request' ? 'Forgot password' : 'Reset password'}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {step === 'request'
            ? 'Enter your email to receive a reset token.'
            : `Enter the token sent to ${email} and your new password.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'request' ? (
          <form className="space-y-4" onSubmit={onRequestToken}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75" />
                <Input id="email" className="pl-9 h-10 text-sm bg-background/50 focus-visible:ring-primary" placeholder="name@example.com" {...requestForm.register('email')} />
              </div>
              {requestForm.formState.errors.email && (
                <p className="text-xs text-destructive font-medium mt-1">{requestForm.formState.errors.email.message}</p>
              )}
            </div>
            <Button className="w-full text-xs font-semibold uppercase tracking-wider h-10 mt-2" type="submit">Send Reset Token</Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={onResetPassword}>
            <div className="space-y-1.5">
              <Label htmlFor="token" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reset Token</Label>
              <Input id="token" className="h-10 text-sm bg-background/50 focus-visible:ring-primary" placeholder="Paste token from email" {...resetForm.register('token')} />
              {resetForm.formState.errors.token && (
                <p className="text-xs text-destructive font-medium mt-1">{resetForm.formState.errors.token.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">New Password</Label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75" />
                <Input id="newPassword" className="pl-9 h-10 text-sm bg-background/50 focus-visible:ring-primary" type="password" placeholder="At least 6 characters" {...resetForm.register('newPassword')} />
              </div>
              {resetForm.formState.errors.newPassword && (
                <p className="text-xs text-destructive font-medium mt-1">{resetForm.formState.errors.newPassword.message}</p>
              )}
            </div>
            <Button className="w-full text-xs font-semibold uppercase tracking-wider h-10 mt-2" type="submit">Reset Password</Button>
            <button
              type="button"
              onClick={() => setStep('request')}
              className="w-full text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Back to request token
            </button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
