import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://beuzpyerqkxulfwcjiru.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldXpweWVycWt4dWxmd2NqaXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg5MTMwNDMsImV4cCI6MTk2NDQ4OTA0M30.Y6zGtvSqqx7-54X_R_PxLhMEbsiBnbxcWCTmu6CoZoA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
