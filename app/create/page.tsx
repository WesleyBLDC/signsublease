import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CreateContractForm from '../../components/contracts/create_contract_form';

export default async function CreatePage(
  props: { 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const contractId = searchParams.id as string;

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // If contract ID is provided, fetch the contract data
  let contract = null;
  if (contractId) {
    const { data } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contractId)
      .eq('user_id', user.id)
      .single();
      
    if (data) {
      contract = data;
    }
  }

  return <CreateContractForm userId={user.id} contract={contract} />;
}
