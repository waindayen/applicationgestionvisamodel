import React from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Visa Manager</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/create-visa"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Visa Application
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;