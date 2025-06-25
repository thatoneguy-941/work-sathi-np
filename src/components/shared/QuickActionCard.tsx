
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
  const ButtonWrapper = children ? 'div' : Button;
  
  if (children) {
    return (
      <div>
        {React.cloneElement(children as React.ReactElement, {
          children: (
            <Button variant={variant} className="h-20 flex-col w-full">
              <Icon className="w-6 h-6 mb-2" />
              <span className="font-medium">{label}</span>
            </Button>
          )
        })}
      </div>
    );
  }

  return (
    <Button variant={variant} className="h-20 flex-col w-full" onClick={onClick}>
      <Icon className="w-6 h-6 mb-2" />
      <span className="font-medium">{label}</span>
    </Button>
  );
};

export default QuickActionCard;
