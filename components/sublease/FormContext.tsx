"use client";

import { createContext, useContext, useState, ReactNode, ChangeEvent } from 'react';
import { createClient } from '@/utils/supabase/client';

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
  saveFormData: () => Promise<{ success: boolean; message: string }>;
  saveToSupabaseClient: () => Promise<{ success: boolean; message: string }>;
  isSaving: boolean;
};

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create the provider component
export function FormProvider({ children, userId }: { children: ReactNode; userId: string }) {
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

  const [isSaving, setIsSaving] = useState(false);

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

  // Save to Supabase client-side
  const saveToSupabaseClient = async (): Promise<{ success: boolean; message: string }> => {
    try {
      // Basic validation
      if (!formData.sublessor_name || !formData.apartment_address) {
        return { 
          success: false, 
          message: 'Please fill in required fields: Sublessor Name and Apartment Address' 
        };
      }
      
      const supabase = createClient();
      
      // Map form data to match database column names
      const dbData = {
        sublessor_name: formData.sublessor_name,
        apartment_address: formData.apartment_address,
        monthly_rent: formData.monthly_rent,
        security_deposit: formData.security_deposit,
        number_of_tenants: formData.number_of_tenants,
        household_chores_description: formData.household_chores_description,
        quiet_hours: formData.quiet_hours,
        landlord_name: formData.landlord_name,
        utility_charge_percentage: formData.utility_charge_percentage,
        telephone_charge_percentage: formData.telephone_charge_percentage,
        
        sublessee_name: formData.sublessee_name,
        lease_term_duration: formData.lease_term_duration,
        lease_start_date: formData.lease_start_date || null,
        lease_end_date: formData.lease_end_date || null,
        termination_notice_date: formData.termination_notice_date || null,
        bedroom_sharing_roommate: formData.bedroom_sharing_roommate,
        parking_space_location: formData.parking_space_location,
        apartment_condition_exception: formData.apartment_condition_exception,
        sublessor_signature_date: formData.sublessor_signature_date || null,
        sublessee_signature_date: formData.sublessee_signature_date || null,
        additional_tenancy_extension_info: formData.additional_tenancy_extension_info,
        
        will_share_bedroom: formData.willShareBedroom,
        will_share_common_areas: formData.willShareCommonAreas,
        requires_overnight_guest_permission: formData.requiresOvernightGuestPermission,
        smoking_allowed: formData.smokingAllowed,
        alcohol_allowed: formData.alcoholAllowed,
        has_parking_entitlement: formData.hasParkingEntitlement,
        apartment_in_good_condition: formData.apartmentInGoodCondition,
        
        // Associate the contract with the logged-in user
        user_id: userId
      };
      
      const { error } = await supabase.from('contracts').insert(dbData);
      
      if (error) throw error;
      
      return { success: true, message: 'Data saved successfully' };
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  };

  // Save form data to Supabase through API route
  const saveFormData = async (): Promise<{ success: boolean; message: string }> => {
    setIsSaving(true);
    
    try {
      // Basic validation
      if (!formData.sublessor_name || !formData.apartment_address) {
        setIsSaving(false);
        return { 
          success: false, 
          message: 'Please fill in required fields: Sublessor Name and Apartment Address' 
        };
      }
      
      // Map form data to match database column names
      const dbData = {
        sublessor_name: formData.sublessor_name,
        apartment_address: formData.apartment_address,
        monthly_rent: formData.monthly_rent,
        security_deposit: formData.security_deposit,
        number_of_tenants: formData.number_of_tenants,
        household_chores_description: formData.household_chores_description,
        quiet_hours: formData.quiet_hours,
        landlord_name: formData.landlord_name,
        utility_charge_percentage: formData.utility_charge_percentage,
        telephone_charge_percentage: formData.telephone_charge_percentage,
        
        sublessee_name: formData.sublessee_name,
        lease_term_duration: formData.lease_term_duration,
        lease_start_date: formData.lease_start_date || null,
        lease_end_date: formData.lease_end_date || null,
        termination_notice_date: formData.termination_notice_date || null,
        bedroom_sharing_roommate: formData.bedroom_sharing_roommate,
        parking_space_location: formData.parking_space_location,
        apartment_condition_exception: formData.apartment_condition_exception,
        sublessor_signature_date: formData.sublessor_signature_date || null,
        sublessee_signature_date: formData.sublessee_signature_date || null,
        additional_tenancy_extension_info: formData.additional_tenancy_extension_info,
        
        will_share_bedroom: formData.willShareBedroom,
        will_share_common_areas: formData.willShareCommonAreas,
        requires_overnight_guest_permission: formData.requiresOvernightGuestPermission,
        smoking_allowed: formData.smokingAllowed,
        alcohol_allowed: formData.alcoholAllowed,
        has_parking_entitlement: formData.hasParkingEntitlement,
        apartment_in_good_condition: formData.apartmentInGoodCondition,
        
        // Associate the contract with the logged-in user
        user_id: userId
      };
      
      console.log('Saving form data:', JSON.stringify(dbData).substring(0, 100) + '...');
      
      // Try client-side first for faster response
      try {
        const supabase = createClient();
        const { error: clientError } = await supabase.from('contracts').insert(dbData);
        
        if (!clientError) {
          setIsSaving(false);
          return { success: true, message: 'Draft saved successfully via client' };
        }
        
        // If client-side fails, fall back to API route
        console.log('Client-side save failed, trying API route');
      } catch (clientErr) {
        console.error('Client-side Supabase error:', clientErr);
        // Continue to API route
      }
      
      // Make API call to save the data
      const response = await fetch('/api/form/save_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbData),
      });
      
      // Try to parse response as JSON, but handle non-JSON responses
      let result;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          result = await response.json();
        } catch (e) {
          console.error('Failed to parse JSON response:', e);
          const text = await response.text();
          throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
        }
      } else {
        // Not a JSON response
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 500));
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(result?.error || `Server error: ${response.status}`);
      }
      
      setIsSaving(false);
      return { success: true, message: 'Draft saved successfully via API' };
    } catch (error) {
      setIsSaving(false);
      console.error('Error saving form data:', error);
      return { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      handleInputChange, 
      setRadioValue, 
      saveFormData, 
      saveToSupabaseClient,
      isSaving 
    }}>
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