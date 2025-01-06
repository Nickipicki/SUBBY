import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xlyjlxrvzzglhvozfawx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhseWpseHJ2enpnbGh2b3pmYXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxODY4NDYsImV4cCI6MjA1MTc2Mjg0Nn0.Z4JrKpgfFm7_YcMSx_0uy4st48cKyFwxtnsOaheUSD4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 