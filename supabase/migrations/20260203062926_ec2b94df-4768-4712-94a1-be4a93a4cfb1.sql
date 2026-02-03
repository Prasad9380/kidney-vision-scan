-- Add contact fields to profiles table for report sharing
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number text,
ADD COLUMN IF NOT EXISTS whatsapp_number text,
ADD COLUMN IF NOT EXISTS share_email_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS share_whatsapp_enabled boolean DEFAULT false;