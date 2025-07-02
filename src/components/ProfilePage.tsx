
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Mail, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    avatar_url: '',
    plan_type: 'Free' as 'Free' | 'Pro'
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          email: data.email || user.email || '',
          avatar_url: data.avatar_url || '',
          plan_type: data.plan_type || 'Free'
        });
      } else {
        setProfile(prev => ({
          ...prev,
          email: user.email || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile information",
        variant: "destructive"
      });
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          email: profile.email,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <User className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">{t('profile')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                <AvatarFallback className="text-lg">
                  {profile.full_name ? getInitials(profile.full_name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {profile.full_name || 'Add your name'}
                </h3>
                <p className="text-gray-600">{profile.email}</p>
                <Badge variant={profile.plan_type === 'Pro' ? 'default' : 'secondary'} className="mt-1">
                  {profile.plan_type === 'Pro' && <Crown className="w-3 h-3 mr-1" />}
                  {profile.plan_type} Plan
                </Badge>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={profile.avatar_url}
                  onChange={(e) => setProfile(prev => ({ ...prev, avatar_url: e.target.value }))}
                  placeholder="Enter avatar image URL"
                />
              </div>
            </div>

            <Button onClick={updateProfile} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Account Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Member since</p>
              <p className="font-semibold">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Current Plan</p>
              <Badge variant={profile.plan_type === 'Pro' ? 'default' : 'secondary'} className="mt-1">
                {profile.plan_type === 'Pro' && <Crown className="w-3 h-3 mr-1" />}
                {profile.plan_type}
              </Badge>
            </div>

            {profile.plan_type === 'Free' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">Upgrade to Pro for:</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Unlimited clients</li>
                  <li>• Advanced reports</li>
                  <li>• Priority support</li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Upgrade to Pro
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
