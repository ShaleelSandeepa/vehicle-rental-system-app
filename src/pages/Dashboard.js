import React from 'react';
import { Car, Users, Calendar, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function Dashboard() {
  const stats = [
    {
      name: 'Total Vehicles',
      value: '124',
      icon: Car,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Active Bookings',
      value: '89',
      icon: Calendar,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Total Customers',
      value: '1,234',
      icon: Users,
      change: '+23%',
      changeType: 'positive',
    },
    {
      name: 'Monthly Revenue',
      value: '$45,231',
      icon: DollarSign,
      change: '+15%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your vehicle rental business today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-emerald-600">
                <span>{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Toyota Camry 2023</p>
                    <p className="text-sm text-gray-600">John Doe • 3 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$240</p>
                    <p className="text-sm text-emerald-600">Active</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Vehicle Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Available</span>
                <span className="text-sm font-medium text-emerald-600">78</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Rented</span>
                <span className="text-sm font-medium text-blue-600">34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Under Maintenance</span>
                <span className="text-sm font-medium text-red-600">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}