import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/auth-context';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError('');
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white"
        style={{
          background: 'linear-gradient(135deg, hsl(10, 75%, 22%) 0%, hsl(10, 65%, 18%) 50%, hsl(10, 60%, 15%) 100%)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)' }}
          >
            <Sparkles className="h-6 w-6" style={{ color: 'hsl(10, 75%, 15%)' }} />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight">Velion</span>
            <span className="block text-[10px] text-white/60 font-medium tracking-wide uppercase">Knowledge Hub</span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Transform Ideas Into
            <span
              className="block mt-2"
              style={{ color: 'hsl(39, 82%, 61%)' }}
            >
              Innovation
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-md">
            Empower your organization with a centralized platform for idea management,
            collaboration, and innovation tracking.
          </p>
        </div>

        <p className="text-sm text-white/40">
          © 2026 Velion Dynamics. All rights reserved.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/30">
        <Card className="w-full max-w-md border-0 shadow-premium-lg">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-6 lg:hidden">
              <div
                className="p-3 rounded-xl"
                style={{ background: 'linear-gradient(135deg, hsl(10, 75%, 22%) 0%, hsl(10, 65%, 28%) 100%)' }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                Sign In
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Create account
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
