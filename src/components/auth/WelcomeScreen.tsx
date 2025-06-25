
import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const WelcomeScreen = memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md transform transition-all duration-500 scale-100">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
          <CardTitle className="text-3xl transition-all duration-500">Welcome to Worksathi!</CardTitle>
          <CardDescription className="transition-all duration-700">
            Your freelance management journey starts here
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4 transition-all duration-1000">
          <div className="space-y-2 text-gray-600">
            <p className="transform transition-all duration-300">🎉 Account created successfully!</p>
            <p className="transform transition-all duration-300 delay-100">📊 Setting up your dashboard...</p>
            <p className="transform transition-all duration-300 delay-200">🚀 Getting you signed in...</p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

WelcomeScreen.displayName = 'WelcomeScreen';

export default WelcomeScreen;
