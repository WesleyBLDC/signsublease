"use client";

import { createContext, useContext, useState, ReactNode, ChangeEvent } from 'react';

// Define the form data type
export type FormDataType = {
  // Prefilled values
  sublessor_name: string;
  apartment_address: string;
  monthly_rent: number;
  security_deposit: number;
  number_of_tenants: number;
  household_chores_description: string;
  quiet_hours: string;
  landlord_name: string;
  utility_charge_percentage: number;
  telephone_charge_percentage: number;
  
  // Values to be filled
  sublessee_name: string;
  lease_term_duration: string;
  lease_start_date: string;
  lease_end_date: string;
  termination_notice_date: string;
  bedroom_sharing_roommate: string;
  parking_space_location: string;
  apartment_condition_exception: string;
  sublessor_signature_date: string;
  sublessee_signature_date: string;
  additional_tenancy_extension_info: string;
  
  // Boolean values
  willShareBedroom: boolean;
  willShareCommonAreas: boolean;
  requiresOvernightGuestPermission: boolean;
  smokingAllowed: boolean;
  alcoholAllowed: boolean;
  hasParkingEntitlement: boolean;
  apartmentInGoodCondition: boolean;
};

// Define the context type
type FormContextType = {
  formData: FormDataType;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setRadioValue: (name: string, value: boolean) => void;
};

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create the provider component
export function FormProvider({ children }: { children: ReactNode }) {
  // Default values based on provided data
  const [formData, setFormData] = useState<FormDataType>({
    // Prefilled values
    sublessor_name: "",
    apartment_address: "",
    monthly_rent: 0,
    security_deposit: 0,
    number_of_tenants: 0,
    household_chores_description: "",
    quiet_hours: "",
    landlord_name: "",
    utility_charge_percentage: 0,
    telephone_charge_percentage: 0,
    
    // Values to be filled
    sublessee_name: "",
    lease_term_duration: "",
    lease_start_date: "",
    lease_end_date: "",
    termination_notice_date: "",
    bedroom_sharing_roommate: "",
    parking_space_location: "",
    apartment_condition_exception: "",
    sublessor_signature_date: "",
    sublessee_signature_date: "",
    additional_tenancy_extension_info: "",
    
    // Boolean values
    willShareBedroom: false,
    willShareCommonAreas: false,
    requiresOvernightGuestPermission: false,
    smokingAllowed: false,
    alcoholAllowed: false,
    hasParkingEntitlement: false,
    apartmentInGoodCondition: false
  });

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle radio button changes
  const setRadioValue = (name: string, value: boolean) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <FormContext.Provider value={{ formData, handleInputChange, setRadioValue }}>
      {children}
    </FormContext.Provider>
  );
}

// Create a hook to use the context
export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
} 