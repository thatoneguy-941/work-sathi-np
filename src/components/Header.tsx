
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Header = ({ isLoggedIn = false, onLogin, onLogout }: HeaderProps) => {
  const { t, language } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold text-lg">W</span>
          </div>
          <h1 className="text-2xl font-medium text-gray-800">{t('heroTitle')}</h1>
        </div>
        
        <nav className="flex items-center space-x-4">
          <LanguageToggle />
          {isLoggedIn ? (
            <>
              <span className="text-gray-600 font-medium">{t('welcome')}</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t('logout')}
              </Button>
            </>
          ) : (
            <Button onClick={onLogin}>
              <User className="w-4 h-4 mr-2" />
              {t('login')}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
