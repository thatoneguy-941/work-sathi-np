
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

const StatCard = ({ title, value, trend, icon: Icon, color, onClick }: StatCardProps) => {
  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-200 ${onClick ? 'cursor-pointer hover:scale-105' : ''} shadow-sm`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <p className="text-2xl font-semibold text-foreground mb-1 truncate">{value}</p>
            {trend && <p className={`text-sm font-medium ${color}`}>{trend}</p>}
          </div>
          <div className="ml-4 flex-shrink-0">
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
