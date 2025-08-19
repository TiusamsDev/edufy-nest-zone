-- Fix critical security vulnerability: Restrict profile access
-- Remove the overly permissive policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure policies for profile access
-- Users can only view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Admins can view all profiles for administration purposes
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role('admin'));

-- Optional: Allow authenticated users to view basic public profile info (name only)
-- This can be enabled if the app needs to show user names in course discussions, etc.
CREATE POLICY "Authenticated users can view public profile info" 
ON public.profiles 
FOR SELECT 
USING (auth.role() = 'authenticated' AND avatar_url IS NULL);