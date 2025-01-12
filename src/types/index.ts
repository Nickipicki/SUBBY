export interface User {
  id: string;
  email: string | null;
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
  nextPayment: Date;
  members: string[];
}