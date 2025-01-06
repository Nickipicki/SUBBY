export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface Family {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  family_members?: {
    user_id: string;
  }[];
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly' | 'quarterly';
  next_billing_date: string;
  payer_id: string;
  family_id: string;
  reminder_date?: string;
  notes?: string;
  created_at: string;
  subscription_users?: {
    user_id: string;
    percentage: number;
  }[];
}