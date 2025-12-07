-- Allow buyers to view approved vendor profiles
CREATE POLICY "Buyers can view approved vendor profiles"
ON public.vendor_profiles
FOR SELECT
USING (status = 'approved'::vendor_status);