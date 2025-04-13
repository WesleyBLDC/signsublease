import Link from 'next/link';
import { Button } from '@/components/ui/button';

export type Contract = {
  id: number;
  sublessor_name: string;
  sublessee_name: string | null;
  apartment_address: string;
  lease_start_date: string | null;
  lease_end_date: string | null;
  monthly_rent: number;
  created_at: string;
  user_id?: string;
};

interface ContractCardProps {
  contract: Contract;
}

export default function ContractCard({ contract }: ContractCardProps) {
  return (
    <div className="border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold truncate">{contract.apartment_address}</h3>
        <p className="text-sm text-gray-500">ID: {contract.id}</p>
      </div>
      
      <div className="space-y-2 mb-6">
        <p><span className="font-medium">Sublessor:</span> {contract.sublessor_name}</p>
        <p><span className="font-medium">Sublessee:</span> {contract.sublessee_name || 'Not assigned'}</p>
        <p><span className="font-medium">Rent:</span> ${contract.monthly_rent}/month</p>
        {contract.lease_start_date && contract.lease_end_date && (
          <p><span className="font-medium">Lease Period:</span> {new Date(contract.lease_start_date).toLocaleDateString()} - {new Date(contract.lease_end_date).toLocaleDateString()}</p>
        )}
      </div>
      
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" asChild>
          <Link href={`/contracts/${contract.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/create?id=${contract.id}`}>Edit</Link>
        </Button>
      </div>
    </div>
  );
} 