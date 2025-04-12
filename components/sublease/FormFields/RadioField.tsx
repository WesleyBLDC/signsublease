interface RadioOption {
  label: string;
  value: boolean;
}

interface RadioFieldProps {
  label: string;
  name: string;
  value: boolean;
  options: RadioOption[];
  onChange: (value: boolean) => void;
}

export function RadioField({ 
  label, 
  name, 
  value, 
  options, 
  onChange 
}: RadioFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        {options.map((option, index) => (
          <div className="flex items-center" key={`${name}-${index}`}>
            <input 
              type="radio"
              id={`${name}-${index}`}
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={`${name}-${index}`} className="ml-2 block text-sm text-gray-600">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
} 