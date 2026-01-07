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

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    setIsLoading(true);
    try {
      await login(data.email, data.password, {
        isRegistration: true,
        name: data.name,
      });
      navigate('/onboarding');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
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
            Join Our
            <span 
              className="block mt-2"
              style={{ color: 'hsl(39, 82%, 61%)' }}
            >
              Innovation Community
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-md">
            Be part of a collaborative platform where your ideas can make a real impact on the organization.
          </p>
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-white/80">Submit and track your innovative ideas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-white/80">Collaborate with colleagues across offices</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-white/80">Earn rewards for your contributions</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-white/40">
          © 2026 Velion Dynamics. All rights reserved.
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/30">
        <Card className="w-full max-w-md border-0 shadow-premium-lg">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4 lg:hidden">
              <div 
                className="p-3 rounded-xl"
                style={{ background: 'linear-gradient(135deg, hsl(10, 75%, 22%) 0%, hsl(10, 65%, 28%) 100%)' }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join the Digital Knowledge Network
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
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
                  placeholder="Create a password (min 8 characters)"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                Create Account
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
