import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zzkbhamiclvktzrrkwxd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6a2JoYW1pY2x2a3R6cnJrd3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDg0NDUsImV4cCI6MjA5NjA4NDQ0NX0.ZhWCxCDuzBGkrhEzQGSRdKKbvOTofYba1Mc0ZS8_MFQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
