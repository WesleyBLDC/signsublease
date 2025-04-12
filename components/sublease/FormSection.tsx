import { ChangeEvent } from 'react';
import { InputField, CheckboxField, RadioField, TextareaField } from './FormFields';
import { FormDataType } from './FormContext';

type FieldType = 'text' | 'number' | 'date' | 'checkbox' | 'radio' | 'textarea';

interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: boolean }>;
  dependsOn?: {
    field: string;
    value: boolean;
  };
}

interface FormSectionProps {
  title: string;
  fields: FormField[];
  formData: FormDataType;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setRadioValue: (name: string, value: boolean) => void;
}

export function FormSection({ 
  title, 
  fields, 
  formData, 
  handleInputChange, 
  setRadioValue 
}: FormSectionProps) {
  // Function to check if a conditional field should be shown
  const shouldShowField = (field: FormField): boolean => {
    if (!field.dependsOn) return true;
    
    const { field: dependencyField, value: dependencyValue } = field.dependsOn;
    return formData[dependencyField as keyof FormDataType] === dependencyValue;
  };

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="space-y-3">
        {fields.map((field) => {
          // Skip rendering if dependency condition not met
          if (!shouldShowField(field)) return null;
          
          const fieldName = field.name as keyof FormDataType;
          const fieldValue = formData[fieldName];
          
          switch (field.type) {
            case 'text':
            case 'number':
            case 'date':
              return (
                <InputField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={fieldValue as string | number}
                  onChange={handleInputChange}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              );
            case 'checkbox':
              return (
                <CheckboxField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  checked={fieldValue as boolean}
                  onChange={handleInputChange}
                />
              );
            case 'radio':
              return (
                <RadioField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={fieldValue as boolean}
                  options={field.options || []}
                  onChange={(value) => setRadioValue(field.name, value)}
                />
              );
            case 'textarea':
              return (
                <TextareaField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={fieldValue as string}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
} 