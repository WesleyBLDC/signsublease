import { NextResponse } from 'next/server';

export async function GET() {
  // Simple endpoint to check if environment variables are set
  // Don't expose full keys in production - just check if they exist
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return NextResponse.json({
    supabaseUrlSet: !!supabaseUrl,
    supabaseKeySet: !!supabaseKey,
    // Show partial values for debugging (first few chars only)
    urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 8)}...` : null,
    keyPreview: supabaseKey ? `${supabaseKey.substring(0, 4)}...` : null,
    nodeEnv: process.env.NODE_ENV
  });
} 