import React from 'react';
import { FileText, ChevronRight, Clock } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {project.documents.length} Documents
          </span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              Updated {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <button className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}