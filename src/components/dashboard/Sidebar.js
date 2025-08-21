import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Car, Calendar, Users, BarChart3, X, Home, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Vehicles', href: '/vehicles', icon: Car },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Activity', href: '/activity', icon: Activity },
];

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="font-serif font-bold text-xl text-emerald-800">VehicleRent</h1>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}