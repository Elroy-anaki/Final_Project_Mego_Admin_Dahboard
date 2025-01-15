import React from 'react'
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Something Went Wrong
        </h1>
        
        <p className="text-gray-600 mb-8">
          Sorry, it seems an error has occurred. Please try refreshing the page or come back later.
        </p>
        
        <div className="space-y-4">
         
          <Link to={'/'}>
          <button 
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Go Back
          </button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          If the problem persists, <a href="mailto:msedetisrel@gmail.com" className="text-blue-500"> please contact technical support </a>.
        </p>
      </div>
    </div>

  )
}
export default ErrorPage;