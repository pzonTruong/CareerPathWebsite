import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { authApi } from '../api/auth.api';
import { tokenStore } from '../store/token.store';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { OtpInput } from '@/shared/components/ui/otp-input';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const [step, setStep] = useState<'login' | 'verify'>('login');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onLoginSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email: values.email, password: values.password });
      const token = response.data?.token as string | undefined;
      if (token) {
        tokenStore.set(token);
        toast.success('Logged in successfully.');
        navigate('/');
        return;
      }
      setEmail(values.email);
      setStep('verify');
      toast.success('OTP has been sent to your email.');
    } catch (error: any) {
      const requiresOtp = Boolean(error?.response?.data?.requiresOtp);
      if (requiresOtp) {
        setEmail(error.response.data.email ?? values.email);
        setStep('verify');
        toast.info('OTP required. Check your email.');
      } else {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  });

  const onVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setLoading(true);
    try {
      const response = await authApi.verifyLoginOtp(email, otp);
      tokenStore.set(response.data.token);
      toast.success('Logged in successfully.');
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Invalid OTP');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold tracking-tight">Verify OTP</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Enter the 6-digit code sent to <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={onVerifySubmit}>
            <div className="flex justify-center py-2">
              <OtpInput value={otp} onChange={setOtp} />
            </div>
            <Button className="w-full text-xs font-semibold uppercase tracking-wider h-10" type="submit" disabled={otp.length !== 6 || loading}>
              {loading && <Loader2 className="size-3.5 animate-spin" />}
              Verify and Login
            </Button>
            <button
              type="button"
              onClick={() => { setStep('login'); setOtp(''); }}
              className="block w-full text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-foreground cursor-pointer"
            >
              Back to login
            </button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Enter your account details to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onLoginSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75" />
              <Input id="email" className="pl-9 h-10 text-sm bg-background/50 focus-visible:ring-primary" placeholder="name@example.com" {...register('email')} />
            </div>
            {errors.email && <p className="text-xs text-destructive font-medium mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/75" />
              <Input id="password" className="pl-9 h-10 text-sm bg-background/50 focus-visible:ring-primary" type="password" placeholder="••••••••" {...register('password')} />
            </div>
            {errors.password && <p className="text-xs text-destructive font-medium mt-1">{errors.password.message}</p>}
          </div>

          <Button className="w-full text-xs font-semibold uppercase tracking-wider h-10 mt-2" type="submit" disabled={loading}>
            {loading && <Loader2 className="size-3.5 animate-spin" />}
            Continue to OTP
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
