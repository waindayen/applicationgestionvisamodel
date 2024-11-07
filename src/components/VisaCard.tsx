import React from 'react';
import { Calendar, Flag, Globe2, Timer } from 'lucide-react';
import { format } from 'date-fns';

interface VisaCardProps {
  country: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: Date;
  expiryDate: Date;
}

export function VisaCard({ country, type, status, submissionDate, expiryDate }: VisaCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Globe2 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">{country}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Flag className="w-5 h-5 mr-2" />
          <span>{type} Visa</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Submitted: {format(submissionDate, 'MMM dd, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Timer className="w-5 h-5 mr-2" />
          <span>Expires: {format(expiryDate, 'MMM dd, yyyy')}</span>
        </div>
      </div>
      
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        View Details
      </button>
    </div>
  );
}