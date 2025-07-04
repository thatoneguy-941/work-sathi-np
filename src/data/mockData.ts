// Mock data for demo components
export const mockStats = {
  totalIncome: 450000,
  monthlyIncome: 85000,
  totalClients: 12,
  totalProjects: 8,
  totalPending: 25000,
  incomeGrowth: '+18.5%',
  unpaidInvoicesCount: 3,
  paidInvoicesCount: 15,
  totalInvoices: 18,
  completedProjects: 5,
  inProgressProjects: 3
};

export const mockClients = [
  { id: '1', name: 'Tech Solutions Pvt Ltd', email: 'contact@techsolutions.com', company: 'Tech Solutions', phone: '+977-9841234567' },
  { id: '2', name: 'Digital Marketing Co', email: 'info@digitalmarketing.com', company: 'Digital Marketing', phone: '+977-9841234568' },
  { id: '3', name: 'E-commerce Store', email: 'hello@ecomstore.com', company: 'E-commerce', phone: '+977-9841234569' }
];

export const mockProjects = [
  { id: '1', project_name: 'Website Redesign', client_id: '1', status: 'In Progress', description: 'Complete website overhaul with modern design' },
  { id: '2', project_name: 'Mobile App Development', client_id: '2', status: 'Completed', description: 'iOS and Android app development' },
  { id: '3', project_name: 'SEO Optimization', client_id: '3', status: 'Pending', description: 'Complete SEO audit and optimization' }
];

export const mockInvoices = [
  { id: '1', invoice_number: 'INV-2024-001', amount: 75000, status: 'Paid', due_date: '2024-01-15', project_id: '1' },
  { id: '2', invoice_number: 'INV-2024-002', amount: 45000, status: 'Unpaid', due_date: '2024-01-20', project_id: '2' },
  { id: '3', invoice_number: 'INV-2024-003', amount: 65000, status: 'Paid', due_date: '2024-01-25', project_id: '3' }
];