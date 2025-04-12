"use client";

import SubleaseForm from '@/components/sublease/SubleaseForm';
import SubleasePreview from '@/components/sublease/SubleasePreview';
import { FormProvider, useFormContext } from '@/components/sublease/FormContext';
import Link from 'next/link';
import { ChevronRight, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface CreateContractFormProps {
  userId: string;
  contract?: any; // Contract data for edit mode
}

function ContractFormContent({ isEditMode }: { isEditMode: boolean }) {
  const { saveFormData, isSaving } = useFormContext();
  const router = useRouter();
  
  const handleSave = async () => {
    const result = await saveFormData();
    
    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        duration: 5000,
      });
      // Redirect to contracts page on successful save
      router.push('/contracts');
    } else {
      // Display error
      toast.error(result.message, {
        position: "top-right",
        duration: 5000,
      });
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with breadcrumbs and actions */}
      <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/contracts" className="flex items-center hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Contracts
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <span className="font-medium text-gray-900">
                {isEditMode ? `Editing Contract` : 'Create New Contract'}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/contracts">Cancel</Link>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleSave}
                disabled={isSaving}
                className={`${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Saving...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    {isEditMode ? 'Save Changes' : 'Create Contract'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Left sidebar with form */}
          <div className="w-[35%] bg-white border-r border-gray-200 h-full overflow-y-auto shadow-md">
            <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-6 py-4 z-10">
              <h2 className="text-lg font-semibold text-gray-900">
                {isEditMode ? 'Edit Contract Details' : 'Enter Contract Details'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the information to {isEditMode ? 'update' : 'create'} the contract
              </p>
            </div>
            <div className="p-2 h-[calc(100%-64px)]">
              <SubleaseForm />
            </div>
          </div>
          
          {/* Right preview area */}
          <div className="w-[65%] h-full flex flex-col bg-gray-100">
            <div className="sticky top-0 bg-gray-100 border-b border-gray-200 px-6 py-4 z-10">
              <h2 className="text-lg font-semibold text-gray-900">Contract Preview</h2>
              <p className="text-sm text-gray-600 mt-1">
                See how your contract will look when generated
              </p>
            </div>
            <div className="p-2 h-[calc(100%-64px)]">
              <div className="bg-white shadow-md rounded-md p-6 h-full overflow-y-auto">
                <SubleasePreview />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CreateContractForm({ userId, contract }: CreateContractFormProps) {
  const isEditMode = !!contract;
  
  return (
    <FormProvider userId={userId} initialData={contract}>
      <ContractFormContent isEditMode={isEditMode} />
    </FormProvider>
  );
} 