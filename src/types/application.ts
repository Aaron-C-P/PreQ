export interface TaxApplication {
  id?: string;
  userId: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  applicationType: 'individual' | 'business';
  serviceId: string;
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    ssn: string;
    occupation: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  taxInfo: {
    taxYear: number;
    estimatedIncome: number;
    filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_household';
    hasDependents: boolean;
    numberOfDependents?: number;
  };
  documents: {
    w2Uploaded: boolean;
    additionalDocsUploaded: boolean;
  };
  createdAt: string;
  updatedAt: string;
}