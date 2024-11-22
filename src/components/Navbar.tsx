import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Menu className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">NormX</span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-500" />
            </button>
            <div className="ml-3">
              <button className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <User className="h-8 w-8 rounded-full text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}