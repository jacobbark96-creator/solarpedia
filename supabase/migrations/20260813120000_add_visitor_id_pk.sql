-- Migration: Add visitor_id as Primary Key and remove ip_address PK constraint

-- 1. Add visitor_id column with UUID type and auto-generate default
ALTER TABLE public.visitor_tracking 
ADD COLUMN visitor_id UUID DEFAULT gen_random_uuid();

-- 2. Drop the existing primary key constraint on ip_address
ALTER TABLE public.visitor_tracking 
DROP CONSTRAINT visitor_tracking_pkey;

-- 3. Set visitor_id as the new primary key
ALTER TABLE public.visitor_tracking 
ADD PRIMARY KEY (visitor_id);
