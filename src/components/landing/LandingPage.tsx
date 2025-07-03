import React, { memo, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-64">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const LandingPage = memo(() => {
  const ComprehensiveLanding = lazy(() => import('@/components/landing/ComprehensiveLanding'));
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ComprehensiveLanding />
    </Suspense>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;