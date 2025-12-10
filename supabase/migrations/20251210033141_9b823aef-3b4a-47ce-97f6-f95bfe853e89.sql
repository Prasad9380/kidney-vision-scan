-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  blood_pressure TEXT,
  glucose_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Create scan_history table
CREATE TABLE public.scan_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  classification TEXT NOT NULL,
  confidence NUMERIC NOT NULL,
  scan_type TEXT,
  findings TEXT,
  affected_region TEXT,
  recommendations JSONB,
  blood_pressure TEXT,
  glucose_level TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on scan_history
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

-- Scan history policies
CREATE POLICY "Users can view their own scans"
ON public.scan_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scans"
ON public.scan_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scans"
ON public.scan_history FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, blood_pressure, glucose_level)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'blood_pressure',
    NEW.raw_user_meta_data ->> 'glucose_level'
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for scan images
INSERT INTO storage.buckets (id, name, public) VALUES ('scans', 'scans', true);

-- Storage policies for scans bucket
CREATE POLICY "Users can upload their own scans"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'scans' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own scans"
ON storage.objects FOR SELECT
USING (bucket_id = 'scans' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can view scans"
ON storage.objects FOR SELECT
USING (bucket_id = 'scans');