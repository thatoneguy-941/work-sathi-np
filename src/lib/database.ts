
import { supabase } from '@/integrations/supabase/client';

export type Client = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  client_id: string;
  project_name: string;
  description?: string;
  deadline?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  payment_status: 'Not Paid' | 'Partial' | 'Paid';
  created_at: string;
  updated_at: string;
  client?: Client;
};

export type Invoice = {
  id: string;
  user_id: string;
  project_id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  amount: number;
  payment_link?: string;
  status: 'Unpaid' | 'Paid';
  created_at: string;
  updated_at: string;
  project?: Project;
};

// Client operations
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

// Project operations
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

// Invoice operations
export const createInvoice = async (invoiceData: Omit<Invoice, 'id' | 'user_id' | 'invoice_number' | 'created_at' | 'updated_at' | 'project'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('invoices')
    .insert([{ ...invoiceData, user_id: user.id }])
    .select(`
      *,
      project:projects(
        *,
        client:clients(*)
      )
    `)
    .single();
  
  if (error) throw error;
  return data;
};

export const getInvoices = async () => {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      project:projects(
        *,
        client:clients(*)
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Invoice[];
};

export const updateInvoice = async (id: string, updates: Partial<Invoice>) => {
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      project:projects(
        *,
        client:clients(*)
      )
    `)
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteInvoice = async (id: string) => {
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Analytics functions
export const getDashboardStats = async () => {
  const [clientsData, projectsData, invoicesData] = await Promise.all([
    supabase.from('clients').select('id').eq('user_id', (await supabase.auth.getUser()).data.user?.id),
    supabase.from('projects').select('id, status, payment_status'),
    supabase.from('invoices').select('amount, status, issue_date')
  ]);

  const totalClients = clientsData.data?.length || 0;
  const totalProjects = projectsData.data?.length || 0;
  const completedProjects = projectsData.data?.filter(p => p.status === 'Completed').length || 0;
  const inProgressProjects = projectsData.data?.filter(p => p.status === 'In Progress').length || 0;
  
  const paidInvoices = invoicesData.data?.filter(i => i.status === 'Paid') || [];
  const unpaidInvoices = invoicesData.data?.filter(i => i.status === 'Unpaid') || [];
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyIncome = paidInvoices
    .filter(invoice => {
      const invoiceDate = new Date(invoice.issue_date);
      return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear;
    })
    .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);

  const totalPending = unpaidInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
  const totalOverdue = unpaidInvoices
    .filter(invoice => new Date(invoice.issue_date) < new Date())
    .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);

  return {
    totalClients,
    totalProjects,
    completedProjects,
    inProgressProjects,
    monthlyIncome,
    totalPending,
    totalOverdue,
    totalInvoices: invoicesData.data?.length || 0
  };
};

// Check user plan limits
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
