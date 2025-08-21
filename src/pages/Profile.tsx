"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { useAuth } from "../contexts/AuthContext"

export function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle personal info update
    console.log("Personal info updated:", formData)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change
    console.log("Password changed")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text">Profile Settings</h1>
        <p className="text-text-secondary">Manage your account settings and preferences.</p>
      </div>

      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("personal")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "personal"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-text hover:border-gray-300"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "password"
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-text hover:border-gray-300"
              }`}
            >
              Change Password
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === "personal" && (
            <form onSubmit={handlePersonalSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input mt-1"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input mt-1"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input mt-1"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-text">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input mt-1"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="btn-primary">
                Update Profile
              </Button>
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-text">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="input mt-1"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-text">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="input mt-1"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="input mt-1"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
              </div>
              <Button type="submit" className="btn-primary">
                Change Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
