
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  children?: React.ReactNode;
}

const QuickActionCard = ({ icon: Icon, label, onClick, variant = "default", children }: QuickActionCardProps) => {
  if (children) {
    return (
      <div>
        {React.cloneElement(children as React.ReactElement, {
          children: (
            <Button variant={variant} className="h-24 flex-col gap-3 w-full text-center px-6 py-6">
              <Icon className="w-6 h-6 flex-shrink-0" />
              <span className="font-medium text-sm leading-tight px-2">{label}</span>
            </Button>
          )
        })}
      </div>
    );
  }

  return (
    <Button variant={variant} className="h-24 flex-col gap-3 w-full text-center px-6 py-6" onClick={onClick}>
      <Icon className="w-6 h-6 flex-shrink-0" />
      <span className="font-medium text-sm leading-tight px-2">{label}</span>
    </Button>
  );
};

export default QuickActionCard;
