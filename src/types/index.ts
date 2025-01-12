export interface Subscription {
  id: string;
  name: string;
  price: number;
  interval: string;
  next_billing_date: string;
  user_id: string;
}

export interface Family {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  family_members?: FamilyMember[];
}

export interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  joined_at: string;
} 