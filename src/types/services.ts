export interface TaxService {
  id: string;
  name: string;
  description: string;
  category: 'individual' | 'business';
}

export const taxServices: TaxService[] = [
  {
    id: 'individual_return',
    name: 'Individual Tax Return',
    description: 'Standard tax return filing for individuals',
    category: 'individual'
  },
  {
    id: 'business_return',
    name: 'Business Tax Return',
    description: 'Tax return filing for businesses and corporations',
    category: 'business'
  },
  {
    id: 'tax_planning',
    name: 'Tax Planning Services',
    description: 'Strategic tax planning and consultation',
    category: 'individual'
  },
  {
    id: 'estate_planning',
    name: 'Estate Tax Planning',
    description: 'Estate planning and inheritance tax services',
    category: 'individual'
  },
  {
    id: 'payroll_tax',
    name: 'Payroll Tax Services',
    description: 'Payroll tax management and filing',
    category: 'business'
  },
  {
    id: 'tax_audit',
    name: 'Tax Audit Support',
    description: 'Assistance with tax audits and reviews',
    category: 'individual'
  }
];