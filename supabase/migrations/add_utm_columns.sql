ALTER TABLE visitor_tracking 
ADD COLUMN utm_source text,
ADD COLUMN utm_medium text,
ADD COLUMN utm_campaign text,
ADD COLUMN gclid text,
ADD COLUMN session_duration integer DEFAULT 0,
ADD COLUMN wizard_dropoff_step integer DEFAULT 0;