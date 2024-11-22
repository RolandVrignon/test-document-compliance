import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import type { DocumentStatus } from '../types';

interface DocumentProgressProps {
  document: DocumentStatus;
}

export default function DocumentProgress({ document }: DocumentProgressProps) {
  const getStatusIcon = () => {
    switch (document.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-gray-400" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{document.name}</h3>
            <p className="text-sm text-gray-500">
              Uploaded {document.uploadedAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
            </span>
          </div>
          <div className="w-32">
            <div className="bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${document.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}