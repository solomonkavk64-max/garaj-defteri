import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Supabase Bağlantı Bilgileri
const SUPABASE_URL = 'https://wsgmxtqnfggycstkxaun.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_mNDmA_TwL9xgN5BwR26vqg_p3Am5blt'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
