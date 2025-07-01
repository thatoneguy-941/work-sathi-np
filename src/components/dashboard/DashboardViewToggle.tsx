
import React from 'react';

interface DashboardViewToggleProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const DashboardViewToggle = ({ activeView, onViewChange }: DashboardViewToggleProps) => {
  const views = [
    { key: 'overview', label: 'Overview' },
    { key: 'reminders', label: 'Payment Reminders' },
    { key: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="flex gap-2 bg-white p-1 rounded-lg border w-fit">
      {views.map((view) => (
        <button
          key={view.key}
          onClick={() => onViewChange(view.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === view.key 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
};

export default DashboardViewToggle;
