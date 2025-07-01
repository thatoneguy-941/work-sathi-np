
// Re-export all types
export type { Client, Project, Invoice } from './types';

// Re-export client operations
export {
  createClient,
  getClients,
  updateClient,
  deleteClient,
  checkPlanLimits
} from './client-operations';

// Re-export project operations
export {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from './project-operations';

// Re-export invoice operations
export {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  updatePaymentStatus
} from './invoice-operations';

// Re-export analytics
export { getDashboardStats } from './analytics';

// Re-export payment utils
export { generatePaymentQR } from './payment-utils';
