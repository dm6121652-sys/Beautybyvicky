import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY env variables')
  // export null so callers can detect missing configuration and show a helpful message
  supabase = null
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
