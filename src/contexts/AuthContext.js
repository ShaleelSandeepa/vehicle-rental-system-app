import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      if (email && password) {
        const mockUser = {
          id: '1',
          name: email.split('@')[0],
          email,
          role: email.includes('admin') ? 'admin' : 'staff',
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock registration - in real app, this would be an API call
      if (name && email && password) {
        const mockUser = {
          id: Date.now().toString(),
          name,
          email,
          role: role,
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};