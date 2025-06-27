
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  children?: React.ReactNode;
  size?: "default" | "compact";
}

const QuickActionCard = ({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = "default", 
  children,
  size = "default"
}: QuickActionCardProps) => {
  const isCompact = size === "compact";
  
  const buttonContent = (
    <Button 
      variant={variant} 
      className={`${isCompact ? 'h-16 px-6 py-3' : 'h-24 px-8 py-4'} flex-col gap-3 w-full text-center font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
      onClick={onClick}
    >
      <Icon className={`${isCompact ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0`} />
      <span className={`${isCompact ? 'text-xs' : 'text-sm'} leading-tight px-2`}>{label}</span>
    </Button>
  );

  if (children) {
    return (
      <div>
        {React.cloneElement(children as React.ReactElement, {
          children: buttonContent
        })}
      </div>
    );
  }

  return buttonContent;
};

export default QuickActionCard;
