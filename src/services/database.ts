import { supabase } from '../supabase-config';
import { Family, Subscription, User } from '../types';

interface SupabaseUser {
  id: string;
  email: string;
  user_metadata: {
    avatar_url?: string;
  };
}

interface FamilyMemberResponse {
  user_id: string;
  users: {
    id: string;
    email: string;
    user_metadata: {
      avatar_url?: string;
    };
  };
}

export const DatabaseService = {
  // Familie Operationen
  async createFamily(name: string, ownerId: string): Promise<Family> {
    const { data, error } = await supabase
      .from('families')
      .insert([{ name, owner_id: ownerId }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getFamilies(userId: string): Promise<Family[]> {
    const { data, error } = await supabase
      .from('families')
      .select(`
        *,
        family_members (user_id)
      `)
      .or(`owner_id.eq.${userId},family_members.user_id.eq.${userId}`);
    
    if (error) throw error;
    return data;
  },

  // Abonnement Operationen
  async createSubscription(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([subscription])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getSubscriptions(familyId: string): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        subscription_users (user_id, percentage)
      `)
      .eq('family_id', familyId);
    
    if (error) throw error;
    return data;
  },

  // Familienmitglieder Operationen
  async addFamilyMember(familyId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('family_members')
      .insert([{ family_id: familyId, user_id: userId }]);
    
    if (error) throw error;
  },

  async getFamilyMembers(familyId: string): Promise<User[]> {
    const { data, error } = await supabase
      .from('family_members')
      .select(`
        user_id,
        users:user_id (
          id,
          email,
          user_metadata
        )
      `)
      .eq('family_id', familyId);
    
    if (error) throw error;
    
    return (data as unknown as FamilyMemberResponse[]).map(item => {
      return {
        id: item.users.id,
        email: item.users.email,
        displayName: item.users.email,
        photoURL: item.users.user_metadata?.avatar_url
      };
    });
  }
}; 