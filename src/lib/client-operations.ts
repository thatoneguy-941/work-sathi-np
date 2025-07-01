
import { supabase } from '@/integrations/supabase/client';
import type { Client } from './types';

export const createClient = async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('clients')
    .insert([{ ...clientData, user_id: user.id }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Client[];
};

export const updateClient = async (id: string, updates: Partial<Client>) => {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteClient = async (id: string) => {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const checkPlanLimits = async () => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan_type')
    .single();
  
  const { data: clients } = await supabase
    .from('clients')
    .select('id');
  
  const clientCount = clients?.length || 0;
  const planType = profile?.plan_type || 'Free';
  
  return {
    planType,
    clientCount,
    canAddClient: planType === 'Pro' || clientCount < 3
  };
};
