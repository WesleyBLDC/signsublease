"use client";

import { useFormContext } from './FormContext';

export default function SubleaseForm() {
  const { formData, handleInputChange, setRadioValue } = useFormContext();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Sublease Contract Builder</h1>
        <p className="text-gray-600 text-sm">Fill in the information step by step</p>
      </div>

      {/* Form sections */}
      <div className="space-y-8">
        {/* Sublessor Information */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">1. Sublessor Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sublessor Name</label>
              <input 
                type="text" 
                name="sublessor_name"
                value={formData.sublessor_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter sublessor's full name" 
              />
            </div>
          </div>
        </div>

        {/* Sublessee Information */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">2. Sublessee Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sublessee Name</label>
              <input 
                type="text"
                name="sublessee_name"
                value={formData.sublessee_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter sublessee's full name" 
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">3. Property Details</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Apartment Address</label>
              <input 
                type="text"
                name="apartment_address"
                value={formData.apartment_address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter complete property address" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Landlord Name</label>
              <input 
                type="text"
                name="landlord_name"
                value={formData.landlord_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter landlord's name" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Number of Tenants</label>
              <input 
                type="number"
                name="number_of_tenants"
                value={formData.number_of_tenants}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter number of tenants" 
              />
            </div>
          </div>
        </div>

        {/* Lease Terms */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">4. Lease Terms</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Lease Term Duration</label>
              <input 
                type="text"
                name="lease_term_duration"
                value={formData.lease_term_duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., 1 year, 6 months" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                <input 
                  type="date"
                  name="lease_start_date"
                  value={formData.lease_start_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input 
                  type="date"
                  name="lease_end_date"
                  value={formData.lease_end_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Termination Notice Date</label>
              <input 
                type="date"
                name="termination_notice_date"
                value={formData.termination_notice_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Monthly Rent ($)</label>
              <input 
                type="number"
                name="monthly_rent"
                value={formData.monthly_rent}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter monthly rent amount" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Security Deposit ($)</label>
              <input 
                type="number"
                name="security_deposit"
                value={formData.security_deposit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter security deposit amount" 
              />
            </div>
          </div>
        </div>

        {/* Sublessee Interest */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">5. Sublessee's Interest in the Apartment</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="willShareBedroom"
                name="willShareBedroom"
                checked={formData.willShareBedroom}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="willShareBedroom" className="ml-2 block text-sm text-gray-600">
                Will share a bedroom
              </label>
            </div>
            
            {formData.willShareBedroom && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bedroom sharing roommate</label>
                <input 
                  type="text"
                  name="bedroom_sharing_roommate"
                  value={formData.bedroom_sharing_roommate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter roommate name" 
                />
              </div>
            )}
            
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="willShareCommonAreas"
                name="willShareCommonAreas"
                checked={formData.willShareCommonAreas}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="willShareCommonAreas" className="ml-2 block text-sm text-gray-600">
                May share common areas (living room, dining room, kitchen, bathroom)
              </label>
            </div>
          </div>
        </div>
        
        {/* House Rules */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">6. House Rules</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Overnight Guests</label>
              <div className="flex items-center mt-1">
                <input 
                  type="checkbox"
                  id="requiresOvernightGuestPermission"
                  name="requiresOvernightGuestPermission"
                  checked={formData.requiresOvernightGuestPermission}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="requiresOvernightGuestPermission" className="ml-2 block text-sm text-gray-600">
                  Need permission for overnight guests
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Household Chores</label>
              <textarea
                name="household_chores_description"
                value={formData.household_chores_description}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Describe how household chores will be divided"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Quiet Hours</label>
              <input 
                type="text"
                name="quiet_hours"
                value={formData.quiet_hours}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., 10pm - 8am" 
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Smoking</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="smokingAllowed"
                    name="smokingAllowed"
                    checked={formData.smokingAllowed}
                    onChange={() => setRadioValue('smokingAllowed', true)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="smokingAllowed" className="ml-2 block text-sm text-gray-600">
                    Allowed
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="smokingNotAllowed"
                    name="smokingAllowed"
                    checked={!formData.smokingAllowed}
                    onChange={() => setRadioValue('smokingAllowed', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="smokingNotAllowed" className="ml-2 block text-sm text-gray-600">
                    Not allowed
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Alcohol</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="alcoholAllowed"
                    name="alcoholAllowed"
                    checked={formData.alcoholAllowed}
                    onChange={() => setRadioValue('alcoholAllowed', true)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="alcoholAllowed" className="ml-2 block text-sm text-gray-600">
                    Allowed
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="alcoholNotAllowed"
                    name="alcoholAllowed"
                    checked={!formData.alcoholAllowed}
                    onChange={() => setRadioValue('alcoholAllowed', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="alcoholNotAllowed" className="ml-2 block text-sm text-gray-600">
                    Not allowed
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Utilities */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">7. Utilities & Charges</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Utility Charges (%)</label>
              <input 
                type="number"
                name="utility_charge_percentage"
                value={formData.utility_charge_percentage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter percentage of utility charges" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Telephone Charges (%)</label>
              <input 
                type="number"
                name="telephone_charge_percentage"
                value={formData.telephone_charge_percentage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter percentage of telephone charges" 
              />
            </div>
          </div>
        </div>
        
        {/* Parking */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">8. Parking</h2>
          <div className="space-y-3">
            <div className="flex items-center mb-2">
              <input 
                type="checkbox"
                id="hasParkingEntitlement"
                name="hasParkingEntitlement"
                checked={formData.hasParkingEntitlement}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="hasParkingEntitlement" className="ml-2 block text-sm text-gray-600">
                Entitled to a parking space
              </label>
            </div>
            
            {formData.hasParkingEntitlement && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Parking Space Location</label>
                <input 
                  type="text"
                  name="parking_space_location"
                  value={formData.parking_space_location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter parking space location" 
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Apartment Condition */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-3">9. Apartment Condition</h2>
          <div className="space-y-3">
            <div className="flex items-center mb-2">
              <input 
                type="checkbox"
                id="apartmentInGoodCondition"
                name="apartmentInGoodCondition"
                checked={formData.apartmentInGoodCondition}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="apartmentInGoodCondition" className="ml-2 block text-sm text-gray-600">
                Apartment is in good condition
              </label>
            </div>
            
            {!formData.apartmentInGoodCondition && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Exceptions to Good Condition</label>
                <textarea
                  name="apartment_condition_exception"
                  value={formData.apartment_condition_exception}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Describe any exceptions to the good condition"
                ></textarea>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between pt-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Generate Contract
          </button>
        </div>
      </div>
    </div>
  );
} 