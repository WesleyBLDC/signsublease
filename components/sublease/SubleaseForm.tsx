"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useFormContext } from './FormContext';
import { FormSection } from './FormSection';
import { formSections } from '@/utils/formSections';
import { useRouter } from 'next/navigation';

export default function SubleaseForm() {
  const { formData, handleInputChange, setRadioValue, saveFormData, isSaving } = useFormContext();
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await saveFormData();
    
    if (result.success) {
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
    <form onSubmit={handleSubmit} className="p-6">

      {/* Render form sections dynamically */}
      <div className="space-y-8">
        {formSections.map((section) => (
          <FormSection
            key={section.id}
            title={section.title}
            fields={section.fields}
            formData={formData}
            handleInputChange={handleInputChange}
            setRadioValue={setRadioValue}
          />
        ))}
        
        {/* Action buttons */}
        <div className="flex justify-center pt-4">
          <button 
            type="submit"
            className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save & Return'
            )}
          </button>
        </div>
      </div>
    </form>
  );
} 