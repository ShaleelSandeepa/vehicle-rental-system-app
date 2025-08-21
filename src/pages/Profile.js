import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';

export function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        role: user.role,
      }));
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      setSuccess('Profile updated successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess('Password changed successfully!');
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setIsLoading(false);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <Badge variant="secondary" className="mt-2">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member since:</span>
                <span className="text-sm">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last login:</span>
                <span className="text-sm">Today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'password'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Change Password
                </button>
              </nav>
            </div>

            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    {success && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        {success}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === 'password' && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    {success && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        {success}
                      </div>
                    )}
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Changing Password...' : 'Change Password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}