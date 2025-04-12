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
      </div>
    </form>
  );
} 