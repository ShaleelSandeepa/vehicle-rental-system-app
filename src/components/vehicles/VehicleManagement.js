import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { VehicleForm } from './VehicleForm';
import { VehicleDetails } from './VehicleDetails';

export function VehicleManagement() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [viewingVehicle, setViewingVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      status: 'Available',
      rentalPrice: 80,
      licensePlate: 'ABC-123',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      status: 'Rented',
      rentalPrice: 70,
      licensePlate: 'XYZ-789',
    },
    {
      id: 3,
      make: 'Ford',
      model: 'Mustang',
      year: 2023,
      status: 'Under Maintenance',
      rentalPrice: 120,
      licensePlate: 'DEF-456',
    },
  ]);

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

  const handleAddVehicle = (vehicleData) => {
    const newVehicle = {
      id: vehicles.length + 1,
      ...vehicleData,
      year: parseInt(vehicleData.year),
      rentalPrice: parseInt(vehicleData.rentalPrice),
    };
    setVehicles([...vehicles, newVehicle]);
    console.log('Vehicle added successfully:', newVehicle);
  };

  const handleEditVehicle = (vehicleData) => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === editingVehicle.id
        ? {
            ...vehicle,
            ...vehicleData,
            year: parseInt(vehicleData.year),
            rentalPrice: parseInt(vehicleData.rentalPrice),
          }
        : vehicle
    );
    setVehicles(updatedVehicles);
    setEditingVehicle(null);
    console.log('Vehicle updated successfully:', vehicleData);
  };

  const startEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    console.log('Starting edit for vehicle:', vehicle.id);
  };

  const viewDetails = (vehicle) => {
    setViewingVehicle(vehicle);
    console.log('Viewing details for vehicle:', vehicle.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600 mt-2">Manage your fleet of rental vehicles</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-lg">
                  {vehicle.make} {vehicle.model}
                </CardTitle>
                <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Year: <span className="text-gray-900">{vehicle.year}</span>
                </p>
                <p className="text-sm text-gray-600">
                  License: <span className="text-gray-900">{vehicle.licensePlate}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Daily Rate: <span className="text-gray-900 font-medium">${vehicle.rentalPrice}</span>
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => startEdit(vehicle)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => viewDetails(vehicle)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && <VehicleForm onClose={() => setShowForm(false)} onSubmit={handleAddVehicle} />}

      {editingVehicle && (
        <VehicleForm
          onClose={() => setEditingVehicle(null)}
          onSubmit={handleEditVehicle}
          initialData={editingVehicle}
          isEditing={true}
        />
      )}

      {viewingVehicle && <VehicleDetails vehicle={viewingVehicle} onClose={() => setViewingVehicle(null)} />}
    </div>
  );
}