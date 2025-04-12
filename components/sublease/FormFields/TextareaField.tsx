import { ChangeEvent } from 'react';

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function TextareaField({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  rows = 3,
  required = false 
}: TextareaFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea 
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
      ></textarea>
    </div>
  );
} 