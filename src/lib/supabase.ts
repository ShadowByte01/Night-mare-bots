import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Bot {
  id: string;
  name: string;
  description: string;
  features: string[];
  invite_url: string;
  icon_url: string;
  color: string;
  is_active: boolean;
  order_index: number;
}

export interface Command {
  id: string;
  bot_id: string;
  name: string;
  description: string;
  usage: string;
  category: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  invite_url: string;
  icon_url: string;
  member_count: number;
  is_active: boolean;
}

export interface ContactMessage {
  discord_id: string;
  project_description: string;
  email?: string;
}
