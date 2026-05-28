-- Supabase / PostgreSQL Schema for Divine Interiors

-- Table to store information about updates/changes to the system
CREATE TABLE IF NOT EXISTS public.update_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    system VARCHAR(50) NOT NULL CHECK (system IN ('frontend', 'backend', 'system')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Create an index for faster querying by system type
CREATE INDEX IF NOT EXISTS idx_update_logs_system ON public.update_logs(system);

-- Optional: Create an index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_update_logs_created_at ON public.update_logs(created_at DESC);
