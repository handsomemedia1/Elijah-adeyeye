import { createClient } from '@supabase/supabase-js';

// Elitech Hub Supabase - read-only public access
const SUPABASE_URL = 'https://ijawxlndyslanklfigua.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_c9ctVWF2DVLv-IHApNV9nA_FWp-VKOt';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
