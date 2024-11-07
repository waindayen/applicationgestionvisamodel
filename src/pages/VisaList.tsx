import React, { useState } from 'react';
import { ArrowLeft, Search, ArrowUpDown, Eye, Edit, Trash2, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const VisaList = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const visaApplications = [
    {
      id: '1',
      country: 'United States',
      type: 'Tourist',
      status: 'pending',
      submissionDate: new Date('2024-03-15'),
      expiryDate: new Date('2024-04-15'),
    },
    {
      id: '2',
      country: 'United Kingdom',
      type: 'Business',
      status: 'approved',
      submissionDate: new Date('2024-02-20'),
      expiryDate: new Date('2024-08-20'),
    },
    {
      id: '3',
      country: 'Canada',
      type: 'Student',
      status: 'pending',
      submissionDate: new Date('2024-03-10'),
      expiryDate: new Date('2025-03-10'),
    }
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  // Mobile card view component
  const VisaCard = ({ visa }: { visa: typeof visaApplications[0] }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{visa.country}</h3>
          <p className="text-sm text-gray-500">{visa.type} Visa</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[visa.status as keyof typeof statusStyles]}`}>
          {visa.status.charAt(0).toUpperCase() + visa.status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Submitted:</span>
          <span>{format(visa.submissionDate, 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex justify-between">
          <span>Expires:</span>
          <span>{format(visa.expiryDate, 'MMM dd, yyyy')}</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
          <Eye className="h-5 w-5" />
        </button>
        <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
          <Edit className="h-5 w-5" />
        </button>
        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Visa Applications</h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="sm:hidden flex items-center space-x-2 text-gray-600"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              
              <div className={`${isFilterOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto`}>
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Countries</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                </select>
                
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Country', 'Type', 'Status', 'Submission Date', 'Expiry Date', 'Actions'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header}</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visaApplications.map((visa) => (
                <tr key={visa.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{visa.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{visa.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[visa.status as keyof typeof statusStyles]}`}>
                      {visa.status.charAt(0).toUpperCase() + visa.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(visa.submissionDate, 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(visa.expiryDate, 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          <div className="grid gap-4 p-4">
            {visaApplications.map((visa) => (
              <VisaCard key={visa.id} visa={visa} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
              <span className="font-medium">3</span> results
            </div>
            <div className="flex justify-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaList;