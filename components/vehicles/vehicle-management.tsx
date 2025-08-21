"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter } from "lucide-react"
import { VehicleForm } from "./vehicle-form"
import { VehicleDetails } from "./vehicle-details"

export function VehicleManagement() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingVehicle, setEditingVehicle] = useState<any>(null)
  const [viewingVehicle, setViewingVehicle] = useState<any>(null)
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      status: "Available",
      rentalPrice: 80,
      licensePlate: "ABC-123",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2022,
      status: "Rented",
      rentalPrice: 70,
      licensePlate: "XYZ-789",
    },
    {
      id: 3,
      make: "Ford",
      model: "Mustang",
      year: 2023,
      status: "Under Maintenance",
      rentalPrice: 120,
      licensePlate: "DEF-456",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-primary text-primary-foreground"
      case "Rented":
        return "bg-accent text-accent-foreground"
      case "Under Maintenance":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleAddVehicle = (vehicleData: any) => {
    const newVehicle = {
      id: vehicles.length + 1,
      ...vehicleData,
      year: Number.parseInt(vehicleData.year),
      rentalPrice: Number.parseInt(vehicleData.rentalPrice),
    }
    setVehicles([...vehicles, newVehicle])
    console.log("[v0] Vehicle added successfully:", newVehicle)
  }

  const handleEditVehicle = (vehicleData: any) => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === editingVehicle.id
        ? {
            ...vehicle,
            ...vehicleData,
            year: Number.parseInt(vehicleData.year),
            rentalPrice: Number.parseInt(vehicleData.rentalPrice),
          }
        : vehicle,
    )
    setVehicles(updatedVehicles)
    setEditingVehicle(null)
    console.log("[v0] Vehicle updated successfully:", vehicleData)
  }

  const startEdit = (vehicle: any) => {
    setEditingVehicle(vehicle)
    console.log("[v0] Starting edit for vehicle:", vehicle.id)
  }

  const viewDetails = (vehicle: any) => {
    setViewingVehicle(vehicle)
    console.log("[v0] Viewing details for vehicle:", vehicle.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Vehicle Management</h1>
          <p className="text-muted-foreground mt-2">Manage your fleet of rental vehicles</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
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
                <p className="text-sm text-muted-foreground">
                  Year: <span className="text-foreground">{vehicle.year}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  License: <span className="text-foreground">{vehicle.licensePlate}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Daily Rate: <span className="text-foreground font-medium">${vehicle.rentalPrice}</span>
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => startEdit(vehicle)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => viewDetails(vehicle)}
                >
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
  )
}
