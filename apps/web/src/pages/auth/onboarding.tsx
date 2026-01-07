import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { officesApi, authApi } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  Sparkles,
  Building2,
  ArrowRight,
  CheckCircle,
  Loader2,
  Lightbulb,
  Users,
  Trophy,
} from 'lucide-react';

interface Office {
  id: string;
  name: string;
  location?: string;
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState(1);
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingOffices, setLoadingOffices] = useState(true);

  useEffect(() => {
    loadOffices();
  }, []);

  useEffect(() => {
    if (user?.office?.id) {
      setSelectedOffice(user.office.id);
    }
  }, [user]);

  const loadOffices = async () => {
    try {
      const response = await officesApi.getAll({ isActive: true });
      setOffices(response.data.items || response.data || []);
    } catch (error) {
      console.error('Failed to load offices:', error);
    } finally {
      setLoadingOffices(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      if (selectedOffice) {
        await authApi.updateProfile({ officeId: selectedOffice });
      }
      await refreshUser();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div 
        className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12 text-white"
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
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Welcome to the Team,
              <span 
                className="block mt-1"
                style={{ color: 'hsl(39, 82%, 61%)' }}
              >
                {user?.name?.split(' ')[0]}!
              </span>
            </h1>
            <p className="text-white/70">
              Let's get your account set up so you can start sharing your innovative ideas.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white/10">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Share Ideas</h3>
                <p className="text-sm text-white/60">Submit your innovative ideas and get feedback from the community</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white/10">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Collaborate</h3>
                <p className="text-sm text-white/60">Work with colleagues on projects that matter</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white/10">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Earn Rewards</h3>
                <p className="text-sm text-white/60">Get recognized with points, badges, and certificates</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
          <div className={`h-2 w-8 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/30">
        <Card className="w-full max-w-lg border-0 shadow-premium-lg">
          {step === 1 && (
            <>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div 
                    className="p-4 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, hsl(39, 82%, 61%) 0%, hsl(39, 75%, 55%) 100%)' }}
                  >
                    <Building2 className="h-8 w-8" style={{ color: 'hsl(10, 75%, 15%)' }} />
                  </div>
                </div>
                <CardTitle className="text-2xl">Select Your Office</CardTitle>
                <CardDescription>
                  Choose the office you belong to. This helps us connect you with the right team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="office">Office Location</Label>
                  {loadingOffices ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your office" />
                      </SelectTrigger>
                      <SelectContent>
                        {offices.map((office) => (
                          <SelectItem key={office.id} value={office.id}>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              {office.name}
                              {office.location && (
                                <span className="text-muted-foreground">- {office.location}</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSkip} className="flex-1">
                    Skip for now
                  </Button>
                  <Button onClick={() => setStep(2)} className="flex-1" disabled={!selectedOffice}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div 
                    className="p-4 rounded-2xl bg-success/10"
                  >
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                </div>
                <CardTitle className="text-2xl">You're All Set!</CardTitle>
                <CardDescription>
                  Your account is ready. Start exploring and sharing your ideas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm">Account created successfully</span>
                  </div>
                  {selectedOffice && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm">Office selected: {offices.find(o => o.id === selectedOffice)?.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm">Ready to submit ideas</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleComplete} className="w-full h-12" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
