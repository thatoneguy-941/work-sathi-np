
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Header = ({ isLoggedIn = false, onLogin, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Worksathi</h1>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">वर्कसाथी</span>
        </div>
        
        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-600">स्वागतम्</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={onLogin}>
              <User className="w-4 h-4 mr-2" />
              Login / Sign Up
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
