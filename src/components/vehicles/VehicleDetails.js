import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { X, Calendar, DollarSign, Hash, Car } from 'lucide-react';

export function VehicleDetails({ vehicle, onClose }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-600 text-white';
      case 'Rented':
        return 'bg-blue-600 text-white';
      case 'Under Maintenance':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="font-serif text-2xl">Vehicle Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">
              {vehicle.make} {vehicle.model}
            </h2>
            <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Car className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Make & Model</p>
                  <p className="font-medium">
                    {vehicle.make} {vehicle.model}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">License Plate</p>
                  <p className="font-medium">{vehicle.licensePlate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Daily Rental Rate</p>
                  <p className="font-medium text-lg">${vehicle.rentalPrice}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Vehicle ID</p>
                <p className="font-medium">#{vehicle.id}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Maintenance History</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Last Service</span>
                <span className="text-sm text-gray-600">2024-01-15</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Next Service Due</span>
                <span className="text-sm text-gray-600">2024-04-15</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}