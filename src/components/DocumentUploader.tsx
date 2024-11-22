import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ArrowRight, FileText } from 'lucide-react';
import type { RuleSet } from '../types';

interface DocumentUploaderProps {
  onClose: () => void;
}

export default function DocumentUploader({ onClose }: DocumentUploaderProps) {
  const [step, setStep] = useState<'upload' | 'select-ruleset'>('upload');
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
    setSelectedFiles(acceptedFiles);
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

  const handleProcessDocuments = () => {
    console.log('Processing documents:', selectedFiles, 'with ruleset:', selectedRuleSet);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[32rem] shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {step === 'upload' ? 'Upload Documents' : 'Select Rule Set'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 'upload' ? (
          <>
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

            <div className="mt-4">
              <button
                onClick={() => setStep('select-ruleset')}
                disabled={selectedFiles.length === 0}
                className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <>
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

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setStep('upload')}
                className="flex-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Back
              </button>
              <button
                onClick={handleProcessDocuments}
                disabled={!selectedRuleSet}
                className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Process Documents
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}