import { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export function InputField({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  type = "text",
  required = false
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
} 