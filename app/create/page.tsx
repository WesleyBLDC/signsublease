import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CreateContractForm from '../../components/contracts/create_contract_form';

export default async function CreatePage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <CreateContractForm userId={user.id} />;
}
