
import React, { useState, useCallback, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '@/components/auth/WelcomeScreen';
import AuthForm from '@/components/auth/AuthForm';

const Auth = memo(() => {
  const [showWelcome, setShowWelcome] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user && !showWelcome) {
      navigate('/');
    }
  }, [user, navigate, showWelcome]);

  // Handle welcome screen timeout
  React.useEffect(() => {
    if (showWelcome && user) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        navigate('/');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showWelcome, user, navigate]);

  const handleWelcomeShow = useCallback(() => {
    setShowWelcome(true);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return <AuthForm onWelcomeShow={handleWelcomeShow} />;
});

Auth.displayName = 'Auth';

export default Auth;
