"use client";

import SubleaseForm from '../../components/sublease/SubleaseForm';
import SubleasePreview from '../../components/sublease/SubleasePreview';
import { FormProvider } from '../../components/sublease/FormContext';

export default function CreatePage() {
  return (
    <FormProvider>
      <div className="flex flex-col h-screen">
        <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-lg">You're currently editing Hello file</div>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
            Other existing contracts
          </button>
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
