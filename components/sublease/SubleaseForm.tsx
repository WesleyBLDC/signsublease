"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useFormContext } from './FormContext';
import { FormSection } from './FormSection';
import { formSections } from '@/utils/formSections';

export default function SubleaseForm() {
  const { formData, handleInputChange, setRadioValue, saveFormData, isSaving } = useFormContext();
  const [debug, setDebug] = useState(false);
  const [debugOutput, setDebugOutput] = useState<any>(null);

  // Debug function to check environment variables
  const checkEnvironment = async () => {
    try {
      const response = await fetch('/api/env-check');
      const data = await response.json();
      setDebugOutput(data);
    } catch (error) {
      setDebugOutput({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await saveFormData();
    
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Debug section JSX
  const renderDebugSection = () => {
    if (!debug) return null;
    
    return (
      <div className="border border-red-300 bg-red-50 p-4 rounded-md space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-red-800 font-medium">Debug Mode</h3>
          <button 
            onClick={checkEnvironment}
            className="px-3 py-1 bg-red-200 text-red-800 rounded-md text-sm"
          >
            Check Environment
          </button>
        </div>
        
        {debugOutput && (
          <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-40">
            {JSON.stringify(debugOutput, null, 2)}
          </pre>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Sublease Contract Builder</h1>
        <p className="text-gray-600 text-sm">Fill in the information step by step</p>
      </div>

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
        <div className="flex justify-between pt-4">
          <div className="flex gap-2">
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
                'Save Draft'
              )}
            </button>
            
            <button 
              type="button"
              onClick={() => setDebug(!debug)} 
              className="px-2 py-1 text-xs text-gray-500 border border-gray-300 rounded-md"
              title="Toggle debug mode"
            >
              🐞
            </button>
          </div>
          
          <button 
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Generate Contract
          </button>
        </div>
      </div>

      {renderDebugSection()}
    </form>
  );
} 