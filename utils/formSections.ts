// Define field types
type FieldType = 'text' | 'number' | 'date' | 'checkbox' | 'radio' | 'textarea';

// Define field structure
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

// Define section structure
interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

// Form sections configuration
export const formSections: FormSection[] = [
  {
    id: 'sublessor',
    title: 'Sublessor Information',
    fields: [
      { 
        name: 'sublessor_name', 
        label: 'Sublessor Name', 
        type: 'text', 
        placeholder: 'Enter sublessor\'s full name',
        required: true
      }
    ]
  },
  {
    id: 'sublessee',
    title: 'Sublessee Information',
    fields: [
      { 
        name: 'sublessee_name', 
        label: 'Sublessee Name', 
        type: 'text', 
        placeholder: 'Enter sublessee\'s full name',
        required: true
      }
    ]
  },
  {
    id: 'property',
    title: 'Property Details',
    fields: [
      { 
        name: 'apartment_address', 
        label: 'Apartment Address', 
        type: 'text', 
        placeholder: 'Enter complete property address',
        required: true
      },
      { 
        name: 'landlord_name', 
        label: 'Landlord Name', 
        type: 'text', 
        placeholder: 'Enter landlord\'s name'
      },
      { 
        name: 'number_of_tenants', 
        label: 'Number of Tenants', 
        type: 'number', 
        placeholder: 'Enter number of tenants'
      }
    ]
  },
  {
    id: 'lease',
    title: 'Lease Terms',
    fields: [
      { 
        name: 'lease_term_duration', 
        label: 'Lease Term Duration', 
        type: 'text', 
        placeholder: 'e.g., 1 year, 6 months'
      },
      { 
        name: 'lease_start_date', 
        label: 'Start Date', 
        type: 'date'
      },
      { 
        name: 'lease_end_date', 
        label: 'End Date', 
        type: 'date'
      },
      { 
        name: 'termination_notice_date', 
        label: 'Termination Notice Date', 
        type: 'date'
      },
      { 
        name: 'monthly_rent', 
        label: 'Monthly Rent ($)', 
        type: 'number', 
        placeholder: 'Enter monthly rent amount'
      },
      { 
        name: 'security_deposit', 
        label: 'Security Deposit ($)', 
        type: 'number', 
        placeholder: 'Enter security deposit amount'
      }
    ]
  },
  {
    id: 'interest',
    title: 'Sublessee\'s Interest in the Apartment',
    fields: [
      { 
        name: 'willShareBedroom', 
        label: 'Will share a bedroom', 
        type: 'checkbox'
      },
      { 
        name: 'bedroom_sharing_roommate', 
        label: 'Bedroom sharing roommate', 
        type: 'text',
        placeholder: 'Enter roommate name',
        dependsOn: {
          field: 'willShareBedroom',
          value: true
        }
      },
      { 
        name: 'willShareCommonAreas', 
        label: 'May share common areas (living room, dining room, kitchen, bathroom)', 
        type: 'checkbox'
      }
    ]
  },
  {
    id: 'houseRules',
    title: 'House Rules',
    fields: [
      { 
        name: 'requiresOvernightGuestPermission', 
        label: 'Need permission for overnight guests', 
        type: 'checkbox'
      },
      { 
        name: 'household_chores_description', 
        label: 'Household Chores', 
        type: 'textarea', 
        placeholder: 'Describe how household chores will be divided'
      },
      { 
        name: 'quiet_hours', 
        label: 'Quiet Hours', 
        type: 'text', 
        placeholder: 'e.g., 10pm - 8am'
      },
      { 
        name: 'smokingAllowed', 
        label: 'Smoking', 
        type: 'radio',
        options: [
          { label: 'Allowed', value: true },
          { label: 'Not allowed', value: false }
        ]
      },
      { 
        name: 'alcoholAllowed', 
        label: 'Alcohol', 
        type: 'radio',
        options: [
          { label: 'Allowed', value: true },
          { label: 'Not allowed', value: false }
        ]
      }
    ]
  },
  {
    id: 'utilities',
    title: 'Utilities & Charges',
    fields: [
      { 
        name: 'utility_charge_percentage', 
        label: 'Utility Charges (%)', 
        type: 'number', 
        placeholder: 'Enter percentage of utility charges'
      },
      { 
        name: 'telephone_charge_percentage', 
        label: 'Telephone Charges (%)', 
        type: 'number', 
        placeholder: 'Enter percentage of telephone charges'
      }
    ]
  },
  {
    id: 'parking',
    title: 'Parking',
    fields: [
      { 
        name: 'hasParkingEntitlement', 
        label: 'Entitled to a parking space', 
        type: 'checkbox'
      },
      { 
        name: 'parking_space_location', 
        label: 'Parking Space Location', 
        type: 'text', 
        placeholder: 'Enter parking space location',
        dependsOn: {
          field: 'hasParkingEntitlement',
          value: true
        }
      }
    ]
  },
  {
    id: 'condition',
    title: 'Apartment Condition',
    fields: [
      { 
        name: 'apartmentInGoodCondition', 
        label: 'Apartment is in good condition', 
        type: 'checkbox'
      },
      { 
        name: 'apartment_condition_exception', 
        label: 'Exceptions to Good Condition', 
        type: 'textarea', 
        placeholder: 'Describe any exceptions to the good condition',
        dependsOn: {
          field: 'apartmentInGoodCondition',
          value: false
        }
      }
    ]
  },
  {
    id: 'signature',
    title: 'Signatures',
    fields: [
      { 
        name: 'sublessor_signature_date', 
        label: 'Sublessor Signature Date', 
        type: 'date'
      },
      { 
        name: 'sublessee_signature_date', 
        label: 'Sublessee Signature Date', 
        type: 'date'
      },
      { 
        name: 'additional_tenancy_extension_info', 
        label: 'Additional Tenancy Extension Information', 
        type: 'textarea', 
        placeholder: 'Any additional information regarding tenancy extension'
      }
    ]
  }
]; 