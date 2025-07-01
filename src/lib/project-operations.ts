
import { supabase } from '@/integrations/supabase/client';
import type { Project } from './types';

export const createProject = async (projectData: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'client'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('projects')
    .insert([{ ...projectData, user_id: user.id }])
    .select(`
      *,
      client:clients(*)
    `)
    .single();
  
  if (error) throw error;
  return data;
};

export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      client:clients(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      client:clients(*)
    `)
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
