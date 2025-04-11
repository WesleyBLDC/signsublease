"use client";

import { useFormContext } from './FormContext';

export default function SubleasePreview() {
  const { formData } = useFormContext();

  // Helper function to format filled values with bold and underline
  const formatValue = (value: any) => {
    // If the value exists and is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      return <span className="font-bold border-b border-black">{value}</span>;
    }
    // If empty, just show a single underline matching the filled state's style
    return <span className="border-b border-black inline-block min-w-[100px]">&nbsp;</span>;
  };

  return (
    <>
      {/* Header with controls */}
      <div className="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <div className="text-lg font-medium">Sublease Contract Preview</div>
        <div className="flex gap-3">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 17H8a2 2 0 1 0 0 4h9a3 3 0 0 0 0-6h-1a3 3 0 1 0-4-4"></path>
              <polyline points="16 7 21 7 21 12"></polyline>
              <line x1="5" y1="9" x2="19" y2="9"></line>
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* PDF Viewer (mockup) with dynamic height */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div className="bg-white shadow-md w-full max-w-[800px] p-8 rounded-sm h-auto flex flex-col">
          {/* Mock PDF content */}
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-center mb-1">CALIFORNIA SUBLEASE AGREEMENT</h1>
          </div>

          <div className="space-y-6 text-sm w-full">
            <p>This Sublease Agreement is made between {formatValue(formData.sublessor_name)}, the "Sublessor," and {formatValue(formData.sublessee_name)}, the "Sublessee," together referred to as the "Parties."</p>
            
            <p>The Parties agree that the Sublessee shall lease from the Sublessor a portion of the Sublessor's interest in the apartment located at {formatValue(formData.apartment_address)}, California (the "Apartment") on the following terms:</p>
            
            <p className="font-semibold">1. Lease Term.</p>
            <p>The term of the Lease will be for a period of {formatValue(formData.lease_term_duration)}, commencing on {formatValue(formData.lease_start_date)} and ending on {formatValue(formData.lease_end_date)}.</p>
            
            <p className="font-semibold">2. Rent.</p>
            <p>Sublessee will pay a total monthly rent of ${formatValue(formData.monthly_rent)}. Rent shall be payable on the first day of each month directly to the Sublessor.</p>
            
            <p className="font-semibold">3. Security Deposit.</p>
            <p>Sublessee will pay ${formatValue(formData.security_deposit)} to Sublessor as a security deposit. Deductions that are allowed by California law may be made from the security deposit and the remainder, if any, shall be returned to Sublessee within 21 days of the termination of Sublessee's tenancy. The security deposit may not be used as last month's rent.</p>
            
            <p className="font-semibold">4. Termination Notice.</p>
            <p>Sublessee will provide Sublessor with thirty days written notice prior to the termination of tenancy stating whether Sublessee wants to terminate or renew the Sublease. Sublessee's tenancy will terminate on {formatValue(formData.termination_notice_date)}, unless Sublessor and Sublessee sign another written agreement prior to the end of tenancy providing for an additional period of tenancy. Sublessee is not responsible for finding a replacement upon the termination of his/her tenancy.</p>
            
            <p className="font-semibold">5. Sublessee's Interest in the Apartment.</p>
            <p>Sublessee is one of {formatValue(formData.number_of_tenants)} tenants occupying the Apartment (the "Tenants"). Sublessee {formData.willShareBedroom ? '☑' : '☐'} will {!formData.willShareBedroom ? '☑' : '☐'} will not share a bedroom with {formatValue(formData.bedroom_sharing_roommate)}. Sublessee {formData.willShareCommonAreas ? '☑' : '☐'} may {!formData.willShareCommonAreas ? '☑' : '☐'} may not share all of the common spaces (e.g., living room, dining room, kitchen, bathroom) equally with the other Tenants.</p>
            
            <p className="font-semibold">6. Overnight Guests.</p>
            <p>The Sublessee {!formData.requiresOvernightGuestPermission ? '☑' : '☐'} does {formData.requiresOvernightGuestPermission ? '☑' : '☐'} does not need to obtain Sublessor's permission prior to the stay of any overnight guest(s).</p>
            
            <p className="font-semibold">7. Utility and Telephone Charges.</p>
            <p>The Sublessee agrees to pay {formatValue(formData.utility_charge_percentage)}% of all utility charges. The Sublessee will pay {formatValue(formData.telephone_charge_percentage)}% of the monthly telephone service charges and Sublessee will pay all of those telephone charges for which s/he is directly and individually responsible.</p>
            
            <p className="font-semibold">8. Household Chores.</p>
            <p>The Tenants will divide all household chores as follows: {formatValue(formData.household_chores_description)}.</p>
            
            <p className="font-semibold">9. Noise Level.</p>
            <p>During the hours of {formatValue(formData.quiet_hours)}, the Tenants will maintain a noise level that will permit all tenants to study.</p>
            
            <p className="font-semibold">10. Smoking.</p>
            <p>Smoking {formData.smokingAllowed ? '☑' : '☐'} is {!formData.smokingAllowed ? '☑' : '☐'} is not allowed in the Apartment.</p>
            
            <p className="font-semibold">11. Alcohol.</p>
            <p>Alcohol {formData.alcoholAllowed ? '☑' : '☐'} is {!formData.alcoholAllowed ? '☑' : '☐'} is not allowed in the Apartment.</p>
            
            <p className="font-semibold">12. Parking Space.</p>
            <p>The Sublessee agrees that s/he {formData.hasParkingEntitlement ? '☑' : '☐'} is {!formData.hasParkingEntitlement ? '☑' : '☐'} is not entitled to a parking space located at {formatValue(formData.parking_space_location)}.</p>
            
            <p className="font-semibold">13. Master Lease.</p>
            <p>In addition to the provisions of this Sublease Agreement, the Sublessee agrees to be bound by all the conditions of the Master Lease (attached) between Sublessor and the landlord, {formatValue(formData.landlord_name)}. No representation that is not included here or in the Master Lease shall be binding upon the Parties.</p>
            
            <p className="font-semibold">14. Termination of Master Lease.</p>
            <p>If Sublessor terminates his/her tenancy in the Apartment, Sublessor will provide thirty days notice to Sublessee. Sublessee agrees that if the Master Lease is terminated for any reason, this Sublease Agreement will terminate effective the same date.</p>
            
            <p className="font-semibold">15. Condition of the Apartment.</p>
            <p>Sublessee acknowledges that s/he has examined the Apartment and that it is in good condition {formData.apartmentInGoodCondition ? '☑' : '☐'} except {formatValue(formData.apartment_condition_exception)}. Upon the termination of this Sublease Agreement for any cause whatever, Sublessee will leave the Apartment in its original good condition, except for reasonable wear and tear. Sublessee is responsible for the repair of any damage resulting from the act or neglect of Sublessee or those persons who are invitees of the Sublessee.</p>
            
            <p className="font-semibold">16. Subleasing and Assignment.</p>
            <p>Sublessee may not lease, sublease, or assign the Apartment without the prior written consent of the Sublessor.</p>
            
            <p className="font-semibold">17. Agreement is Complete and Binding.</p>
            <p>All preliminary negotiations between the Parties are merged into, and superseded by, the terms of the Lease. This Lease will not be enforceable until signed by both Sublessee and Sublessor. Any modification to this Agreement must be in writing, signed by both Sublessor and Sublessee.</p>
            
            <p className="mt-8">We, the Undersigned, agree to the above stated terms.</p>
            
            <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4">
              <div>
                <p>Date: {formatValue(formData.sublessor_signature_date)}</p>
              </div>
              <div className="border-b border-solid border-black pb-1">
                <p className="text-right">{formData.sublessor_name ? <span className="font-bold">{formData.sublessor_name}</span> : ""}</p>
              </div>
              <div></div>
              <div className="text-right">
                <p>, Sublessor</p>
              </div>
              
              <div className="mt-4">
                <p>Date: {formatValue(formData.sublessee_signature_date)}</p>
              </div>
              <div className="border-b border-solid border-black pb-1">
                <p className="text-right">{formData.sublessee_name ? <span className="font-bold">{formData.sublessee_name}</span> : ""}</p>
              </div>
              <div></div>
              <div className="text-right">
                <p>, Sublessee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 