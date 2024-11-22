import React, { useState } from 'react';
import { X, Play, Upload } from 'lucide-react';
import type { RuleSet, Rule } from '../types';
import RuleStudio from './RuleStudio';

interface RuleSetEditorProps {
  ruleSet: RuleSet;
  onClose: () => void;
}

export default function RuleSetEditor({ ruleSet, onClose }: RuleSetEditorProps) {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [showStudio, setShowStudio] = useState(false);

  const handlePublishRule = (rule: Rule) => {
    // Logic to publish rule to production
    console.log('Publishing rule:', rule);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[64rem] shadow-lg rounded-md bg-white min-h-[32rem]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{ruleSet.name}</h2>
            <p className="text-sm text-gray-500">{ruleSet.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 border-r pr-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Rules</h3>
              <button
                onClick={() => setShowStudio(true)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                + New Rule
              </button>
            </div>
            <div className="space-y-2">
              {ruleSet.rules.map((rule) => (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRule(rule)}
                  className={`w-full text-left p-3 rounded-lg ${
                    selectedRule?.id === rule.id
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{rule.name}</span>
                    {rule.isPublished ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-2 pl-6">
            {selectedRule ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedRule.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedRule.description}
                    </p>
                  </div>
                  <div className="space-x-3">
                    <button
                      onClick={() => setShowStudio(true)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Test in Studio
                    </button>
                    {!selectedRule.isPublished && (
                      <button
                        onClick={() => handlePublishRule(selectedRule)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Publish to Production
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Rule Condition
                  </h4>
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{selectedRule.condition}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a rule to view or edit its details
              </div>
            )}
          </div>
        </div>
      </div>

      {showStudio && (
        <RuleStudio
          onClose={() => setShowStudio(false)}
          onPublish={handlePublishRule}
          initialRule={selectedRule}
        />
      )}
    </div>
  );
}