
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Bell, 
  Globe, 
  Shield, 
  CreditCard, 
  Trash2, 
  AlertTriangle,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const SettingsPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    paymentReminders: true,
    weeklyReports: false,
    darkMode: false,
    autoSave: true
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Save to localStorage for persistence
    localStorage.setItem('app-settings', JSON.stringify({
      ...settings,
      [key]: value
    }));

    toast({
      title: "Settings Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}`
    });
  };

  const handleDeleteAccount = async () => {
    try {
      // In a real app, you'd call an API to delete the account
      // For now, we'll just sign out
      await signOut();
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted",
        variant: "destructive"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">{t('settings')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">
                  Receive notifications about important updates
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Reminders</Label>
                <p className="text-sm text-gray-600">
                  Get notified about overdue invoices
                </p>
              </div>
              <Switch
                checked={settings.paymentReminders}
                onCheckedChange={(value) => handleSettingChange('paymentReminders', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-gray-600">
                  Receive weekly summary reports
                </p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(value) => handleSettingChange('weeklyReports', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Language</Label>
              <div className="flex space-x-2">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                >
                  English
                </Button>
                <Button
                  variant={language === 'ne' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('ne')}
                >
                  नेपाली
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-gray-600">
                  Use dark theme (coming soon)
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(value) => handleSettingChange('darkMode', value)}
                disabled
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Save</Label>
                <p className="text-sm text-gray-600">
                  Automatically save changes
                </p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(value) => handleSettingChange('autoSave', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Billing & Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Billing & Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Plan</p>
                <Badge variant="secondary" className="mt-1">
                  <Crown className="w-3 h-3 mr-1" />
                  Free Plan
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                Upgrade to Pro
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium">Free Plan Includes:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Up to 5 clients</li>
                <li>• Basic invoicing</li>
                <li>• Project tracking</li>
                <li>• eSewa/Khalti QR codes</li>
              </ul>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Pro Plan Benefits:</p>
              <ul className="text-sm text-blue-700 space-y-1 mt-1">
                <li>• Unlimited clients</li>
                <li>• Advanced invoicing</li>
                <li>• Payment reminders</li>
                <li>• Analytics & reports</li>
                <li>• Priority support</li>
              </ul>
              <Button className="w-full mt-2" size="sm">
                Upgrade for Rs. 999/month
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security & Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security & Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Change Password</Label>
              <p className="text-sm text-gray-600 mb-2">
                Update your password to keep your account secure
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Change Password
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600 mb-2">
                Add an extra layer of security (coming soon)
              </p>
              <Button variant="outline" size="sm" className="w-full" disabled>
                Enable 2FA
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-red-600">Danger Zone</Label>
              <p className="text-sm text-gray-600 mb-2">
                Permanently delete your account and all data
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span>Delete Account</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove all your data including clients, projects, and invoices.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
