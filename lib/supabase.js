import { createClient } from '@supabase/supabase-js';

// We add "fallback" values. 
// If the real keys are missing during the build, it uses these fake ones 
// so the website doesn't crash. At runtime, the real keys will be used.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
