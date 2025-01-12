import { supabase } from '@/lib/supabase';

export const DatabaseService = {
  async getSubscriptions() {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async getFamilies(userId: string) {
    const { data, error } = await supabase
      .from('families')
      .select('*, family_members(*)')
      .or(`owner_id.eq.${userId},family_members.user_id.eq.${userId}`);
    
    if (error) throw error;
    return data;
  },

  async createFamily(name: string, ownerId: string) {
    const { data, error } = await supabase
      .from('families')
      .insert([{ name, owner_id: ownerId }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async addFamilyMember(familyId: string, email: string) {
    // Erst User-ID für die E-Mail finden
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    
    if (userError) throw userError;
    
    const { error } = await supabase
      .from('family_members')
      .insert([{ family_id: familyId, user_id: userData.id }]);
    
    if (error) throw error;
  }
};
