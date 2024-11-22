import React, { useState } from 'react';
import { X, Play, Save, Upload } from 'lucide-react';
import type { Rule } from '../types';

interface RuleStudioProps {
  onClose: () => void;
  onPublish: (rule: Rule) => void;
  initialRule?: Rule | null;
}

export default function RuleStudio({
  onClose,
  onPublish,
  initialRule,
}: RuleStudioProps) {
  const [testDocument, setTestDocument] = useState<string>('');
  const [ruleCondition, setRuleCondition] = useState(
    initialRule?.condition || ''
  );
  const [testResult, setTestResult] = useState<{
    status: 'compliant' | 'non-compliant' | null;
    message: string;
  } | null>(null);

  const handleTest = () => {
    // Mock testing logic
    const result = Math.random() > 0.5;
    setTestResult({
      status: result ? 'compliant' : 'non-compliant',
      message: result
        ? 'Document meets the compliance requirements'
        : 'Document fails to meet requirements: Missing required section',
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[60]">
      <div className="relative top-20 mx-auto p-5 border w-[64rem] shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Rule Studio</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Rule Definition
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Rule Condition
                </label>
                <textarea
                  id="condition"
                  rows={8}
                  className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  value={ruleCondition}
                  onChange={(e) => setRuleCondition(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="testDocument"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Test Document Content
                </label>
                <textarea
                  id="testDocument"
                  rows={8}
                  className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  value={testDocument}
                  onChange={(e) => setTestDocument(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Test Results</h3>
              <div className="space-x-3">
                <button
                  onClick={handleTest}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Test
                </button>
                <button
                  onClick={() => {
                    // Save as draft logic
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </button>
                <button
                  onClick={() =>
                    onPublish({
                      id: initialRule?.id || 'new',
                      name: 'New Rule',
                      description: 'Rule description',
                      category: 'general',
                      severity: 'medium',
                      condition: ruleCondition,
                      isPublished: false,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
                  }
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Publish to Production
                </button>
              </div>
            </div>

            {testResult && (
              <div
                className={`p-4 rounded-md ${
                  testResult.status === 'compliant'
                    ? 'bg-green-50'
                    : 'bg-red-50'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {testResult.status === 'compliant' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`text-sm font-medium ${
                        testResult.status === 'compliant'
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}
                    >
                      {testResult.status === 'compliant'
                        ? 'Compliant'
                        : 'Non-Compliant'}
                    </h3>
                    <div
                      className={`mt-2 text-sm ${
                        testResult.status === 'compliant'
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}
                    >
                      <p>{testResult.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Execution Log
              </h4>
              <div className="bg-gray-800 text-gray-100 p-4 rounded-md h-64 overflow-y-auto font-mono text-sm">
                {/* Add execution log content here */}
                <div className="text-gray-400">
                  Initializing rule engine...
                  <br />
                  Loading document content...
                  <br />
                  Applying rule conditions...
                  <br />
                  Generating results...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}