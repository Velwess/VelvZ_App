import {createClient, SupabaseClient} from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}
// @ts-ignore
export const supabase:  SupabaseClient<Database, 'public', Database['public']> = createClient<Database>(supabaseUrl, supabaseAnonKey);
