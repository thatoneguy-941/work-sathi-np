
import React, { useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';

interface AuthFormProps {
  onWelcomeShow: () => void;
}

const AuthForm: React.FC<AuthFormProps> = memo(({ onWelcomeShow }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been signed in successfully.",
          });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // Show welcome message and auto-signin
          onWelcomeShow();
          toast({
            title: "Account Created!",
            description: "Welcome to Worksathi! Let's get you started.",
          });
          
          // Auto sign in after successful signup
          setTimeout(async () => {
            const { error: signInError } = await signIn(email, password);
            if (!signInError) {
              setTimeout(() => {
                // Navigation will be handled by Auth component
              }, 2000);
            }
          }, 1000);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [isLogin, email, password, fullName, signIn, signUp, toast, onWelcomeShow]);

  const switchMode = useCallback(() => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFullName('');
  }, [isLogin]);

  const handleBackClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        <Card className="transform transition-all duration-300 hover:shadow-xl">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 transition-transform duration-200 hover:scale-110">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <CardTitle className="text-2xl transition-all duration-300">
              {isLogin ? t('login') : 'Sign Up'}
            </CardTitle>
            <CardDescription className="transition-all duration-300">
              {isLogin 
                ? 'Sign in to your Worksathi account' 
                : 'Create your Worksathi account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2 transform transition-all duration-300 ease-out">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="transition-all duration-200 focus:scale-[1.02] will-change-transform"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:scale-[1.02] will-change-transform"
                />
              </div>
              
              <PasswordInput
                value={password}
                onChange={setPassword}
                required
              />

              <Button 
                type="submit" 
                className="w-full transition-all duration-200 hover:scale-[1.02] will-change-transform" 
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLogin ? t('login') : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={switchMode}
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

AuthForm.displayName = 'AuthForm';

export default AuthForm;
