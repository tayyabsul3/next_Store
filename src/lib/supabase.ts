import { createClient } from "@supabase/supabase-js";

// Ensure the environment variables are accessed like this:
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);