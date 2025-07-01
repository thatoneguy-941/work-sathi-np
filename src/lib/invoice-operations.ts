
import { supabase } from '@/integrations/supabase/client';
import type { Invoice } from './types';
import { generatePaymentQR } from './payment-utils';

export const createInvoice = async (invoiceData: Omit<Invoice, 'id' | 'user_id' | 'invoice_number' | 'created_at' | 'updated_at' | 'project'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Generate QR code for eSewa/Khalti if amount is provided
  let paymentLink = invoiceData.payment_link || '';
  if (invoiceData.amount && !paymentLink) {
    paymentLink = generatePaymentQR(invoiceData.amount);
  }

  const { data, error } = await supabase
    .from('invoices')
    .insert([{ 
      ...invoiceData, 
      user_id: user.id,
      payment_link: paymentLink
    }])
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

export const updatePaymentStatus = async (invoiceId: string, status: 'Paid' | 'Unpaid') => {
  const { data, error } = await supabase
    .from('invoices')
    .update({ 
      status: status,
      updated_at: new Date().toISOString()
    })
    .eq('id', invoiceId)
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
