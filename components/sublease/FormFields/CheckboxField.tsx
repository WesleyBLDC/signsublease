import { ChangeEvent } from 'react';

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

export function CheckboxField({ 
  label, 
  name, 
  checked, 
  onChange, 
  id = undefined 
}: CheckboxFieldProps) {
  const inputId = id || name;
  
  return (
    <div className="flex items-center">
      <input 
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={inputId} className="ml-2 block text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
} 