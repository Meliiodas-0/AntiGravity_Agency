
CREATE POLICY "Deny all reads" ON public.contact_submissions
  FOR SELECT USING (false);
