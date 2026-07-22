CREATE TABLE IF NOT EXISTS public.visitor_tracking (
    ip_address text PRIMARY KEY,
    full_name text,
    email text,
    phone text,
    page_views jsonb DEFAULT '{}'::jsonb,
    first_seen timestamptz DEFAULT now(),
    last_seen timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitor_tracking ENABLE ROW LEVEL SECURITY;

-- Allow anonymous upserts
CREATE POLICY "Allow anonymous upserts" ON public.visitor_tracking
    FOR ALL
    USING (true)
    WITH CHECK (true);
