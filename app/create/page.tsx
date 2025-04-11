"use client";

import SubleaseForm from '../../components/sublease/SubleaseForm';
import SubleasePreview from '../../components/sublease/SubleasePreview';
import { FormProvider } from '../../components/sublease/FormContext';

export default function CreatePage() {
  return (
    <FormProvider>
      <div className="flex flex-row h-screen">
        {/* Left sidebar with form (30% width) */}
        <div className="w-[30%] bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
          <SubleaseForm />
        </div>
        
        {/* Right content area with PDF preview (70% width) */}
        <div className="w-[70%] h-full bg-gray-100 flex flex-col">
          <SubleasePreview />
        </div>
      </div>
    </FormProvider>
  );
}
