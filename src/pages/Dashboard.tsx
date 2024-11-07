import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { VisaCard } from '../components/VisaCard';

const Dashboard = () => {
  const visaApplications = [
    {
      country: 'United States',
      type: 'Tourist',
      status: 'pending',
      submissionDate: new Date('2024-03-15'),
      expiryDate: new Date('2024-04-15'),
    },
    {
      country: 'United Kingdom',
      type: 'Business',
      status: 'approved',
      submissionDate: new Date('2024-02-20'),
      expiryDate: new Date('2024-08-20'),
    },
    {
      country: 'Canada',
      type: 'Student',
      status: 'pending',
      submissionDate: new Date('2024-03-10'),
      expiryDate: new Date('2025-03-10'),
    },
    {
      country: 'Australia',
      type: 'Work',
      status: 'rejected',
      submissionDate: new Date('2024-01-05'),
      expiryDate: new Date('2024-01-05'),
    },
    {
      country: 'Japan',
      type: 'Tourist',
      status: 'approved',
      submissionDate: new Date('2024-02-01'),
      expiryDate: new Date('2024-03-01'),
    },
    {
      country: 'Germany',
      type: 'Business',
      status: 'pending',
      submissionDate: new Date('2024-03-18'),
      expiryDate: new Date('2024-09-18'),
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Visa Applications</h1>
        <Link
          to="/create-visa"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Application</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visaApplications.map((visa, index) => (
          <VisaCard
            key={index}
            country={visa.country}
            type={visa.type}
            status={visa.status as 'pending' | 'approved' | 'rejected'}
            submissionDate={visa.submissionDate}
            expiryDate={visa.expiryDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;