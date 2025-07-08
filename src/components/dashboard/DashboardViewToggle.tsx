
import React from 'react';
import { Card } from '@/components/ui/card';

interface DashboardViewToggleProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const DashboardViewToggle = ({ activeView, onViewChange }: DashboardViewToggleProps) => {
  const views = [
    { key: 'overview', label: 'Overview' },
    { key: 'reminders', label: 'Payment reminders' },
    { key: 'analytics', label: 'Analytics' }
  ];

  return (
    <Card className="p-1 w-fit">
      <div className="flex gap-1">
        {views.map((view) => (
          <button
            key={view.key}
            onClick={() => onViewChange(view.key)}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === view.key 
                ? 'btn-gradient text-primary-foreground shadow-md' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default DashboardViewToggle;
