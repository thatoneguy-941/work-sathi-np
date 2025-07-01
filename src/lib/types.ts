
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
