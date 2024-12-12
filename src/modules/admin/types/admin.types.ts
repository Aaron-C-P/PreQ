export interface AdminStats {
  totalUsers: number;
  activeQueues: number;
  totalApplications: number;
  pendingApplications: number;
  avgWaitTime: number;
  lastUpdated: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'cso';
  createdAt: string;
}

export interface QueueData {
  id: string;
  name: string;
  activeCustomers: number;
  waitTime: string;
  status: 'active' | 'paused' | 'closed';
}