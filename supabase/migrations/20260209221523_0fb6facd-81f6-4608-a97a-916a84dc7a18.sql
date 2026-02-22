
-- Add ip_address column for rate limiting
ALTER TABLE public.contact_submissions
ADD COLUMN ip_address text;

-- Remove the anonymous INSERT policy (inserts now go through edge function with service role)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;
