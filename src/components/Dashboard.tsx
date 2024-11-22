import React, { useState } from 'react';
import { Plus, Clock, Zap, FileCheck } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectUploader from './ProjectUploader';
import type { Project } from '../types';

export default function Dashboard() {
  const [showUploader, setShowUploader] = useState(false);

  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Q1 2024 Compliance Review',
      description: 'Quarterly compliance review for all policy documents',
      status: 'active',
      progress: 45,
      ruleSetId: '1',
      documents: [
        {
          id: '1',
          name: 'privacy-policy.pdf',
          uploadedAt: new Date(),
          size: 1024000,
          type: 'application/pdf',
        },
        {
          id: '2',
          name: 'terms-of-service.docx',
          uploadedAt: new Date(),
          size: 512000,
          type: 'application/docx',
        },
      ],
      results: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      metrics: {
        compliant: 23,
        nonCompliant: 5,
        toVerify: 3,
        notConcerned: 8,
        timeSaved: 120,
      },
    },
  ];

  const aggregateMetrics = {
    projectsChecked: 15,
    timeSaved: 480,
    documentsProcessed: 45,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects Overview</h1>
        <button
          onClick={() => setShowUploader(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Projects Checked
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {aggregateMetrics.projectsChecked}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Time Saved
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {Math.round(aggregateMetrics.timeSaved / 60)}h {aggregateMetrics.timeSaved % 60}m
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Documents Processed
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {aggregateMetrics.documentsProcessed}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Projects</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {showUploader && (
        <ProjectUploader onClose={() => setShowUploader(false)} />
      )}
    </div>
  );
}