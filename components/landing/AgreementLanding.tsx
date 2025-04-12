import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function AgreementLanding() {
  return (
    <div className="w-full space-y-16">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white rounded-xl p-10 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to agree
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Send, sign and manage all your agreements
          </p>
          <div className="pt-4">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 h-auto text-lg font-medium">
              Get Started Free
            </Button>
          </div>
        </div>
        
        {/* Abstract shapes in background */}
        <div className="absolute right-0 bottom-0 opacity-10">
          <div className="h-32 w-32 rounded-full bg-gray-400 absolute right-10 bottom-10"></div>
          <div className="h-48 w-48 rounded-full bg-gray-500 absolute right-36 bottom-20"></div>
        </div>
      </div>

      {/* Pain Point Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex space-x-6 items-start">
            <div className="bg-gray-100 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Simplify Your Document Management</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Annoyed by managing a bunch of random PDFs, opening a bunch of folders, shitty PDF viewers and going back and forth, and keeping track of all your contacts?
              </p>
            </div>
          </div>
          
          <div className="flex space-x-6 items-start">
            <div className="bg-gray-100 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Built To Solve Real Problems</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                I had this exact problem when I was subleasing my rooms, so I wanted to create a solution to solve my own problem.
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-5 h-auto text-lg font-medium rounded-lg">
              Try It Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 