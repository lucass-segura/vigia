// lib/supabase.js
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
export const createClient = () => createPagesBrowserClient()