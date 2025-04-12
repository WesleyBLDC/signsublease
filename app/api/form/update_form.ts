import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// API route to update an existing contract
export async function POST(request: NextRequest) {
  console.log('API route called: /api/form/update_form');
  
  try {
    // Get the contract ID from the query
    const url = new URL(request.url);
    const contractId = url.searchParams.get('id');
    
    if (!contractId) {
      console.error('Missing contract ID in update request');
      return NextResponse.json({ 
        error: 'Missing contract ID', 
      }, { status: 400 });
    }
    
    // Parse the JSON body
    let data;
    try {
      data = await request.json();
      console.log('Request body parsed successfully');
    } catch (e) {
      console.error('Failed to parse JSON body:', e);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    
    // Validate basic requirements
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
    
    // Ensure user_id is set correctly
    data.user_id = user.id;
    
    // First verify that the contract belongs to the current user
    const { data: existingContract, error: fetchError } = await supabase
      .from('contracts')
      .select('id, user_id')
      .eq('id', contractId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching contract:', fetchError);
      return NextResponse.json({ 
        error: 'Contract not found',
        details: fetchError.message
      }, { status: 404 });
    }
    
    if (existingContract.user_id !== user.id) {
      console.error('Unauthorized update attempt - user does not own this contract');
      return NextResponse.json({ 
        error: 'Unauthorized - you do not own this contract'
      }, { status: 403 });
    }
    
    // Log the key data we're updating
    console.log(`Updating contract ID ${contractId} with keys:`, Object.keys(data));
    
    // Update the contract
    const { error: updateError } = await supabase
      .from('contracts')
      .update(data)
      .eq('id', contractId)
      .eq('user_id', user.id); // Double-check user ownership
    
    if (updateError) {
      console.error('Supabase error during update:', updateError);
      return NextResponse.json({ 
        error: updateError.message,
        code: updateError.code,
        details: updateError.details
      }, { status: 400 });
    }
    
    console.log('Contract updated successfully');
    return NextResponse.json({ message: "Contract updated successfully" }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        error: "Failed to process update request", 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 