/*
  # Nightmare Bots Database Schema

  ## Overview
  Complete database schema for Nightmare Bots website including bots management,
  commands, partners, and admin authentication.

  ## New Tables
  
  ### `bots`
  Stores information about Discord bots created by Nightmare Bots
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Bot name (e.g., "Nightmare Music")
  - `description` (text) - Bot description
  - `features` (jsonb) - Array of bot features
  - `invite_url` (text) - Discord OAuth2 invite link
  - `icon_url` (text) - Bot avatar/icon URL
  - `color` (text) - Theme color for the bot
  - `is_active` (boolean) - Whether bot is active
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `commands`
  Stores bot commands for display
  - `id` (uuid, primary key) - Unique identifier
  - `bot_id` (uuid, foreign key) - Reference to bots table
  - `name` (text) - Command name
  - `description` (text) - Command description
  - `usage` (text) - Command usage example
  - `category` (text) - Command category (music, moderation, etc.)
  - `created_at` (timestamptz) - Creation timestamp

  ### `partners`
  Stores partner server information
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Server name
  - `description` (text) - Server description
  - `invite_url` (text) - Discord invite link
  - `icon_url` (text) - Server icon URL
  - `member_count` (integer) - Approximate member count
  - `is_active` (boolean) - Whether partnership is active
  - `created_at` (timestamptz) - Creation timestamp

  ### `contact_messages`
  Logs contact form submissions
  - `id` (uuid, primary key) - Unique identifier
  - `discord_id` (text) - User's Discord ID
  - `project_description` (text) - Project description
  - `email` (text, optional) - Contact email
  - `status` (text) - Message status (pending, reviewed, etc.)
  - `created_at` (timestamptz) - Submission timestamp

  ### `site_settings`
  Global website settings
  - `id` (uuid, primary key) - Unique identifier
  - `key` (text, unique) - Setting key
  - `value` (jsonb) - Setting value
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for bots, commands, and partners
  - Authenticated admin access for modifications
  - Authenticated access for contact messages
*/

-- Create bots table
CREATE TABLE IF NOT EXISTS bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  invite_url text NOT NULL,
  icon_url text DEFAULT '',
  color text DEFAULT '#5865F2',
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create commands table
CREATE TABLE IF NOT EXISTS commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id uuid REFERENCES bots(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  usage text DEFAULT '',
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  invite_url text NOT NULL,
  icon_url text DEFAULT '',
  member_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_id text NOT NULL,
  project_description text NOT NULL,
  email text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies for bots
CREATE POLICY "Anyone can view active bots"
  ON bots FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage bots"
  ON bots FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public read policies for commands
CREATE POLICY "Anyone can view commands"
  ON commands FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bots WHERE bots.id = commands.bot_id AND bots.is_active = true
    )
  );

CREATE POLICY "Authenticated users can manage commands"
  ON commands FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public read policies for partners
CREATE POLICY "Anyone can view active partners"
  ON partners FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage partners"
  ON partners FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contact messages policies
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Site settings policies
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data for Nightmare Bots
INSERT INTO bots (name, description, features, invite_url, color, order_index)
VALUES 
  (
    'Nightmare Music',
    'A powerful music bot with high-quality audio streaming, playlist management, and advanced controls for the ultimate listening experience.',
    '["High-quality audio streaming", "Playlist management", "Queue system", "Music controls", "24/7 playback", "Multiple sources support"]'::jsonb,
    'https://discord.com/oauth2/authorize?client_id=1467374844021575750&permissions=8&integration_type=0&scope=bot+applications.commands',
    '#FF3366',
    1
  ),
  (
    'Nightmare Support',
    'Advanced support ticket system with AI-powered responses, ticket management, and seamless user support experience.',
    '["Ticket system", "AI responses", "User management", "Auto-responses", "Category organization", "Priority handling"]'::jsonb,
    'https://discord.com/oauth2/authorize?client_id=1462109881036443882&permissions=8&integration_type=0&scope=bot+applications.commands',
    '#00D9FF',
    2
  );

-- Insert initial partner
INSERT INTO partners (name, description, invite_url, member_count)
VALUES (
  'Nightmare Launch',
  'Official Nightmare Bots community server - Join for updates, support, and exclusive features!',
  'https://discord.gg/UFmyB6BmBj',
  1000
);

-- Insert webhook URL as site setting
INSERT INTO site_settings (key, value)
VALUES (
  'discord_webhook',
  '{"url": "https://discord.com/api/webhooks/1467441034790440971/1b8aOqvcABQwZyUvw4_sosAxT3vFBmBOitgl1ZRqFHxc6ZQ0tvsoPiN0VH8sB-VQYsAF"}'::jsonb
);

-- Insert creator information
INSERT INTO site_settings (key, value)
VALUES (
  'creator_info',
  '{"name": "Bruce", "discord": "shadowsprint001", "avatar": ""}'::jsonb
);
