import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ArrowRight } from 'lucide-react';
import type { RuleSet } from '../types';

interface ProjectUploaderProps {
  onClose: () => void;
}

export default function ProjectUploader({ onClose }: ProjectUploaderProps) {
  const [step, setStep] = useState<'details' | 'upload' | 'ruleset'>('details');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedRuleSet, setSelectedRuleSet] = useState<string>('');

  const mockRuleSets: RuleSet[] = [
    {
      id: '1',
      name: 'GDPR Compliance',
      description: 'General Data Protection Regulation compliance ruleset',
      rules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'ISO 27001',
      description: 'Information security management standards',
      rules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        '.docx',
      ],
    },
  });

  const handleCreateProject = () => {
    // Project creation logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[32rem] shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">New Project</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <div
              className={`flex-1 border-t-2 ${
                step === 'details'
                  ? 'border-indigo-600'
                  : step === 'upload'
                  ? 'border-indigo-600'
                  : 'border-gray-200'
              }`}
            />
            <div
              className={`flex-1 border-t-2 ${
                step === 'ruleset' ? 'border-indigo-600' : 'border-gray-200'
              }`}
            />
          </div>
        </div>

        {step === 'details' && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="projectDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="projectDescription"
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStep('upload')}
                disabled={!projectName}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'upload' && (
          <div>
            <div
              {...getRootProps()}
              className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                isDragActive ? 'border-indigo-500' : 'border-gray-300'
              }`}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <input {...getInputProps()} />
                  <p className="pl-1">
                    Drag and drop files here, or click to select files
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX up to 10MB each
                </p>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Selected Files ({selectedFiles.length})
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-gray-50 rounded"
                    >
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 truncate">
                        {file.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setStep('details')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep('ruleset')}
                disabled={selectedFiles.length === 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'ruleset' && (
          <div>
            <div className="mt-4 space-y-3">
              {mockRuleSets.map((ruleSet) => (
                <label
                  key={ruleSet.id}
                  className={`block relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 ${
                    selectedRuleSet === ruleSet.id
                      ? 'border-indigo-500 ring-2 ring-indigo-500'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="ruleset"
                    value={ruleSet.id}
                    checked={selectedRuleSet === ruleSet.id}
                    onChange={(e) => setSelectedRuleSet(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {ruleSet.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {ruleSet.description}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setStep('upload')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!selectedRuleSet}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                Create Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}