import React from 'react';
import { FileCheck, ChevronRight, Edit2 } from 'lucide-react';
import type { RuleSet } from '../types';
import { useAuth } from '../hooks/useAuth';

interface RuleSetCardProps {
  ruleSet: RuleSet;
  onEdit: (ruleSet: RuleSet) => void;
}

export default function RuleSetCard({ ruleSet, onEdit }: RuleSetCardProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileCheck className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{ruleSet.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{ruleSet.description}</p>
            </div>
          </div>
          {isAdmin && (
            <button
              onClick={() => onEdit(ruleSet)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="mt-4">
          <button className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}