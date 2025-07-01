
import { supabase } from '@/integrations/supabase/client';

export const getDashboardStats = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const [clientsData, projectsData, invoicesData] = await Promise.all([
    supabase.from('clients').select('id').eq('user_id', user.id),
    supabase.from('projects').select('id, status, payment_status').eq('user_id', user.id),
    supabase.from('invoices').select('amount, status, issue_date, due_date').eq('user_id', user.id)
  ]);

  const totalClients = clientsData.data?.length || 0;
  const totalProjects = projectsData.data?.length || 0;
  const completedProjects = projectsData.data?.filter(p => p.status === 'Completed').length || 0;
  const inProgressProjects = projectsData.data?.filter(p => p.status === 'In Progress').length || 0;
  
  const paidInvoices = invoicesData.data?.filter(i => i.status === 'Paid') || [];
  const unpaidInvoices = invoicesData.data?.filter(i => i.status === 'Unpaid') || [];
  
  // Calculate monthly income from paid invoices
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const monthlyIncome = paidInvoices
    .filter(invoice => {
      const invoiceDate = new Date(invoice.issue_date);
      return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear;
    })
    .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);

  const lastMonthIncome = paidInvoices
    .filter(invoice => {
      const invoiceDate = new Date(invoice.issue_date);
      return invoiceDate.getMonth() === lastMonth && invoiceDate.getFullYear() === lastMonthYear;
    })
    .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);

  // Calculate growth percentage as number first, then format as string
  const incomeGrowthValue = lastMonthIncome > 0 
    ? ((monthlyIncome - lastMonthIncome) / lastMonthIncome * 100)
    : monthlyIncome > 0 ? 100 : 0;

  const totalIncome = paidInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
  const totalPending = unpaidInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
  
  // Calculate overdue invoices
  const today = new Date();
  const totalOverdue = unpaidInvoices
    .filter(invoice => new Date(invoice.due_date) < today)
    .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);

  // Recent activity data
  const recentInvoices = invoicesData.data
    ?.sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime())
    .slice(0, 5) || [];

  return {
    totalClients,
    totalProjects,
    completedProjects,
    inProgressProjects,
    monthlyIncome,
    totalIncome,
    totalPending,
    totalOverdue,
    incomeGrowth: `${incomeGrowthValue > 0 ? '+' : ''}${incomeGrowthValue.toFixed(1)}%`,
    totalInvoices: invoicesData.data?.length || 0,
    recentInvoices,
    paidInvoicesCount: paidInvoices.length,
    unpaidInvoicesCount: unpaidInvoices.length
  };
};
