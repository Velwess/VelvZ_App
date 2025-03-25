import {Database} from '@velz/common/lib/database.types';
import {createClient} from '@supabase/supabase-js';

const {SUPABASE_KEY: key, NEXT_PUBLIC_SUPABASE_URL: url} = process.env;

export const supabase = createClient<Database>(url!, key!);
