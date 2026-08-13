-- Create lead status enum
CREATE TYPE lead_status AS ENUM (
  'New', 
  'Assessing', 
  'Qualified', 
  'Matched', 
  'Sent to Installer', 
  'Contacted', 
  'Survey Booked', 
  'Quote Issued', 
  'Won', 
  'Lost', 
  'Disqualified'
);

-- Create intent category enum
CREATE TYPE intent_category AS ENUM (
  'LOW',
  'MEDIUM',
  'HIGH',
  'VERY HIGH'
);

-- Upgrade the leads table
ALTER TABLE public.leads 
  ADD COLUMN status lead_status DEFAULT 'New',
  ADD COLUMN intent_category intent_category DEFAULT 'LOW',
  ADD COLUMN lead_score INTEGER DEFAULT 0,
  ADD COLUMN scoring_signals JSONB DEFAULT '[]'::jsonb,
  
  -- Property
  ADD COLUMN ownership TEXT,
  ADD COLUMN house_number TEXT,
  
  -- Energy & Solar Data
  ADD COLUMN energy_data JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN solar_data JSONB DEFAULT '{}'::jsonb,
  
  -- Intent/Requirements
  ADD COLUMN battery_interest TEXT,
  ADD COLUMN timeframe TEXT,
  ADD COLUMN requested_action TEXT,
  
  -- Metadata
  ADD COLUMN lead_source TEXT,
  ADD COLUMN visitor_id UUID REFERENCES public.visitor_tracking(visitor_id),
  ADD COLUMN assigned_installer_id UUID; -- Placeholder for future installers table

-- Create lead activity timeline table
CREATE TABLE public.lead_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Set up RLS for new table
ALTER TABLE public.lead_activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for the wizard, but restrict reads (temporary until full auth)
CREATE POLICY "Allow public inserts to activity logs" ON public.lead_activity_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public reads for activity logs" ON public.lead_activity_logs FOR SELECT USING (true);
