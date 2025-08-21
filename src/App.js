import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import { Vehicles } from './pages/Vehicles';
import { Bookings } from './pages/Bookings';
import { Customers } from './pages/Customers';
import { Reports } from './pages/Reports';
import { Activity } from './pages/Activity';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/vehicles"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Vehicles />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Bookings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Customers />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Reports />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/activity"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Activity />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;