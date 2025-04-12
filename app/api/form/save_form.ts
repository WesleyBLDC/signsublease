import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// Simple middleware to ensure we always return proper JSON responses
export async function POST(request: NextRequest) {
  console.log('API route called: /api/form/save_form');
  
  // Ensure we always return a proper JSON response
  try {
    // Parse the JSON body
    let data;
    try {
      data = await request.json();
      console.log('Request body parsed successfully');
    } catch (e) {
      console.error('Failed to parse JSON body:', e);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    
    // Validate basic requirements to help troubleshoot
    if (!data.sublessor_name || !data.apartment_address) {
      console.warn('Missing required fields in request data');
      return NextResponse.json({ 
        error: 'Missing required fields', 
        requiredFields: ['sublessor_name', 'apartment_address'] 
      }, { status: 400 });
    }
    
    console.log('Creating Supabase client...');
    // Create Supabase client
    const supabase = await createClient();
    console.log('Supabase client created successfully');
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('User authentication error:', userError);
      return NextResponse.json({ 
        error: 'User not authenticated',
        details: userError?.message
      }, { status: 401 });
    }
    
    // If user_id was not included in the data, add it from the authenticated user
    if (!data.user_id) {
      data.user_id = user.id;
    }
    
    // Log the key data we're inserting (without sensitive info)
    console.log('Inserting data into contracts table with keys:', Object.keys(data));
    
    // Insert data
    const { error } = await supabase.from('contracts').insert(data);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ 
        error: error.message,
        code: error.code,
        details: error.details
      }, { status: 400 });
    }
    
    console.log('Data saved successfully');
    return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        error: "Failed to process request", 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
