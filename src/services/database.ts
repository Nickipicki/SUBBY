import { supabase } from '../lib/supabase';
import { Subscription } from '../types';

export const DatabaseService = {
  async getSubscriptions(): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async addSubscription(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([subscription])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSubscription(id: string, subscription: Partial<Subscription>): Promise<void> {
    const { error } = await supabase
      .from('subscriptions')
      .update(subscription)
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteSubscription(id: string): Promise<void> {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}; 