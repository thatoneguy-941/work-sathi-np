
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  onUpgrade: () => void;
}

const UpgradePrompt = ({ isOpen, onClose, feature, onUpgrade }: UpgradePromptProps) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-md mx-4">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            {t('upgradeRequired')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {t('upgradeFeatureMessage').replace('{feature}', feature)}
          </p>
          <div className="space-y-3">
            <Button onClick={onUpgrade} className="w-full">
              {t('upgradeToPro')}
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              {t('maybeLater')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpgradePrompt;
