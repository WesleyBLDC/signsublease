"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ContractCard, { Contract } from './ContractCard';

export default function FetchContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUserAndContracts() {
      try {
        const supabase = createClient();
        
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw new Error('Error fetching user: ' + userError.message);
        }
        
        if (!user) {
          throw new Error('No user logged in');
        }
        
        setUser(user);
        
        // Check if the user_id column exists in the contracts table
        const { data: tableInfo, error: tableError } = await supabase
          .from('contracts')
          .select('user_id')
          .limit(1);
        
        let contractsQuery;
        
        // If user_id exists, use it for filtering; otherwise, fetch all contracts
        // In a real-world app, you'd want to add proper authorization
        if (tableInfo && tableInfo.length > 0 && 'user_id' in tableInfo[0]) {
          contractsQuery = supabase
            .from('contracts')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        } else {
          console.log('user_id column not found, fetching all contracts instead');
          contractsQuery = supabase
            .from('contracts')
            .select('*')
            .order('created_at', { ascending: false });
        }
        
        const { data: contractsData, error: contractsError } = await contractsQuery;
        
        if (contractsError) {
          throw new Error('Error fetching contracts: ' + contractsError.message);
        }
        
        setContracts(contractsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserAndContracts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-4">No contracts found</h2>
        <p className="text-gray-600 mb-6">You haven't created any contracts yet.</p>
        <Button asChild>
          <Link href="/create">Create Your First Contract</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Contracts</h2>
        <Button asChild>
          <Link href="/create">Create New Contract</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
      </div>
    </div>
  );
}
