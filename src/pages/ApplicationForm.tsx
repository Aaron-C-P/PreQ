import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { applicationService } from '../services/application.service';
import { profileService } from '../services/profile.service';
import { taxServices } from '../types/services';
import InputField from '../components/common/InputField';

const ApplicationForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    applicationType: 'individual',
    serviceId: '',
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      ssn: '',
      occupation: '',
    },
    contactInfo: {
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    taxInfo: {
      taxYear: new Date().getFullYear() - 1,
      estimatedIncome: 0,
      filingStatus: 'single',
      hasDependents: false,
      numberOfDependents: 0,
    },
    documents: {
      w2Uploaded: false,
      additionalDocsUploaded: false,
    },
  });

  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      try {
        const profile = await profileService.getUserProfile(user.uid);
        if (profile) {
          setFormData(prev => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              fullName: `${profile.firstName} ${profile.lastName}`,
            },
            contactInfo: {
              ...prev.contactInfo,
              email: profile.email,
              phone: profile.phoneNumber,
              address: profile.address || '',
              city: profile.city || '',
              state: profile.state || '',
              zipCode: profile.zipCode || '',
            },
          }));
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };

    loadUserProfile();
  }, [user]);

  const filteredServices = useMemo(() => {
    return taxServices.filter(service => service.category === formData.applicationType);
  }, [formData.applicationType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!formData.serviceId) {
      setError('Please select a tax service');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await applicationService.createApplication({
        ...formData,
        userId: user.uid,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tax Application Form</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Service Selection</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Application Type</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.applicationType}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      applicationType: e.target.value as 'individual' | 'business',
                      serviceId: ''
                    }));
                  }}
                  required
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax Service</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.serviceId}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceId: e.target.value }))}
                  required
                >
                  <option value="">Select a service</option>
                  {filteredServices.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {formData.serviceId && (
                  <p className="mt-2 text-sm text-gray-500">
                    {taxServices.find(s => s.id === formData.serviceId)?.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.personalInfo.fullName}
                onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                required
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.personalInfo.dateOfBirth}
                onChange={(e) => handleChange('personalInfo', 'dateOfBirth', e.target.value)}
                required
              />
              <InputField
                label="Social Security Number"
                name="ssn"
                type="text"
                value={formData.personalInfo.ssn}
                onChange={(e) => handleChange('personalInfo', 'ssn', e.target.value)}
                required
              />
              <InputField
                label="Occupation"
                name="occupation"
                type="text"
                value={formData.personalInfo.occupation}
                onChange={(e) => handleChange('personalInfo', 'occupation', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Tax Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax Year</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.taxInfo.taxYear}
                  onChange={(e) => handleChange('taxInfo', 'taxYear', parseInt(e.target.value))}
                  required
                >
                  {[0, 1, 2].map(offset => {
                    const year = new Date().getFullYear() - offset;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <InputField
                label="Estimated Annual Income"
                name="estimatedIncome"
                type="number"
                value={formData.taxInfo.estimatedIncome.toString()}
                onChange={(e) => handleChange('taxInfo', 'estimatedIncome', parseFloat(e.target.value))}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Filing Status</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.taxInfo.filingStatus}
                  onChange={(e) => handleChange('taxInfo', 'filingStatus', e.target.value)}
                  required
                >
                  <option value="single">Single</option>
                  <option value="married_joint">Married Filing Jointly</option>
                  <option value="married_separate">Married Filing Separately</option>
                  <option value="head_household">Head of Household</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dependents</label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.taxInfo.hasDependents}
                      onChange={(e) => handleChange('taxInfo', 'hasDependents', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      I have dependents
                    </label>
                  </div>
                  {formData.taxInfo.hasDependents && (
                    <InputField
                      label="Number of Dependents"
                      name="numberOfDependents"
                      type="number"
                      value={formData.taxInfo.numberOfDependents?.toString() || '0'}
                      onChange={(e) => handleChange('taxInfo', 'numberOfDependents', parseInt(e.target.value))}
                      required
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;