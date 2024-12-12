export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface QueueStatus {
  position: number;
  estimatedWaitTime: number;
  status: 'waiting' | 'processing' | 'completed';
}