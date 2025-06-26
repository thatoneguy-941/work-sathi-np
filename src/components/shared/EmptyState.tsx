
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-12 text-center">
        <Icon className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
        <h3 className="text-xl font-medium text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
        {action && <div className="flex justify-center">{action}</div>}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
