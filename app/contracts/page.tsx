import FetchContracts from "@/components/contracts/fetch_contracts";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ContractsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-6">
      <FetchContracts />
    </div>
  );
} 