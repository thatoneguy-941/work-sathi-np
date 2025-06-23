
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar,
  User,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', labelNp: 'ड्यासबोर्ड', icon: TrendingUp },
    { id: 'clients', label: 'Clients', labelNp: 'ग्राहकहरू', icon: Users },
    { id: 'projects', label: 'Projects', labelNp: 'प्रोजेक्टहरू', icon: Calendar },
    { id: 'invoices', label: 'Invoices', labelNp: 'बिलहरू', icon: FileText },
    { id: 'profile', label: 'Profile', labelNp: 'प्रोफाइल', icon: User },
    { id: 'settings', label: 'Settings', labelNp: 'सेटिङहरू', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Menu
        </h3>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start h-auto py-3"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div>{item.label}</div>
                  <div className="text-xs opacity-70">{item.labelNp}</div>
                </div>
              </Button>
            );
          })}
        </nav>
      </div>
      
      {/* Upgrade Banner */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-lg">
          <h4 className="font-medium mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-blue-100 mb-3">
            Unlimited clients and advanced features
          </p>
          <Button size="sm" variant="secondary" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
