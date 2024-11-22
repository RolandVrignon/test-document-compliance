export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  condition: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RuleSet {
  id: string;
  name: string;
  description: string;
  rules: Rule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  uploadedAt: Date;
  size: number;
  type: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  progress: number;
  ruleSetId: string;
  documents: Document[];
  results: ComplianceResult[];
  createdAt: Date;
  updatedAt: Date;
  metrics: {
    compliant: number;
    nonCompliant: number;
    toVerify: number;
    notConcerned: number;
    timeSaved: number;
  };
}

export interface ComplianceResult {
  ruleId: string;
  documentId: string;
  status: 'compliant' | 'non-compliant' | 'to-verify' | 'not-concerned';
  excerpt?: string;
  explanation: string;
  evidence?: string;
  relevance: number;
}