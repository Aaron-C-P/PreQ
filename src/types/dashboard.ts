export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export interface TaxFiling {
  id: string;
  year: number;
  status: 'draft' | 'submitted' | 'under_review' | 'completed';
  submissionDate?: string;
  completionDate?: string;
}