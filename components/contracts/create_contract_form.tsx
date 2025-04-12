"use client";

import SubleaseForm from '@/components/sublease/SubleaseForm';
import SubleasePreview from '@/components/sublease/SubleasePreview';
import { FormProvider } from '@/components/sublease/FormContext';
import Link from 'next/link';

interface CreateContractFormProps {
  userId: string;
  contract?: any; // Contract data for edit mode
}

export default function CreateContractForm({ userId, contract }: CreateContractFormProps) {
  const isEditMode = !!contract;
  
  return (
    <FormProvider userId={userId} initialData={contract}>
      <div className="flex flex-col h-screen">
        <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-lg">{isEditMode ? 'Edit Contract' : 'Create New Contract'}</div>
          <Link href="/contracts" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
            View My Contracts
          </Link>
        </div>
        <div className="flex flex-row h-full">
          {/* Left sidebar with form (30% width) */}
          <div className="w-[30%] bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
            <SubleaseForm />
          </div>
          
          {/* Right content area with PDF preview (70% width) */}
          <div className="w-[70%] h-full bg-gray-100 flex flex-col">
            <SubleasePreview />
          </div>
        </div>
      </div>
    </FormProvider>
  );
} 