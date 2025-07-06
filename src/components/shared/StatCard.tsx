
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'premium';
}

const StatCard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  color, 
  onClick,
  variant = 'elevated'
}: StatCardProps) => {
  return (
    <Card 
      variant={variant}
      className={cn(
        "interactive-hover transition-all duration-300", 
        onClick ? 'cursor-pointer' : ''
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <p className="text-2xl font-semibold text-foreground mb-1 truncate">{value}</p>
            {trend && (
              <p className={cn("text-sm font-medium", color)}>
                {trend}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className={cn(
              "p-3 rounded-lg transition-colors duration-200",
              variant === 'premium' ? 'bg-white/10' : 'bg-accent'
            )}>
              <Icon className={cn("w-6 h-6", color)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
