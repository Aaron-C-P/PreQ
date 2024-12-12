import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { profileService } from '../services/profile.service';
import { UserProfile } from '../types/profile';
import InputField from '../components/common/InputField';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      
      try {
        const userProfile = await profileService.getUserProfile(user.uid);
        setProfile(userProfile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !profile) return;

    setSaveLoading(true);
    try {
      await profileService.updateUserProfile(user.uid, {
        ...profile,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
      setError('');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              value={profile?.firstName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              value={profile?.lastName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={profile?.email || ''}
              onChange={handleChange}
              disabled={true}
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={profile?.phoneNumber || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="Address"
              name="address"
              type="text"
              value={profile?.address || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="City"
              name="city"
              type="text"
              value={profile?.city || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="State"
              name="state"
              type="text"
              value={profile?.state || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <InputField
              label="ZIP Code"
              name="zipCode"
              type="text"
              value={profile?.zipCode || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {saveLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;