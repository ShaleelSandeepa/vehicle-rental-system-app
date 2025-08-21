"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar } from "lucide-react"

// Mock data
const bookings = [
  {
    id: 1,
    customerName: "John Doe",
    vehicle: "Toyota Camry 2023",
    startDate: "2024-01-15",
    endDate: "2024-01-18",
    status: "Active",
    totalAmount: 240,
  },
  {
    id: 2,
    customerName: "Jane Smith",
    vehicle: "Honda Civic 2022",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    status: "Pending",
    totalAmount: 350,
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    vehicle: "Ford Mustang 2023",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    status: "Completed",
    totalAmount: 240,
  },
]

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-primary text-primary-foreground"
      case "Pending":
        return "bg-accent text-accent-foreground"
      case "Completed":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Booking Management</h1>
        <p className="text-muted-foreground mt-2">Manage customer bookings and reservations</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-serif font-semibold text-lg">{booking.customerName}</h3>
                      <p className="text-muted-foreground">{booking.vehicle}</p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                  <div className="mt-2 flex items-center space-x-6 text-sm text-muted-foreground">
                    <span>Start: {booking.startDate}</span>
                    <span>End: {booking.endDate}</span>
                    <span className="font-medium text-foreground">Total: ${booking.totalAmount}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {booking.status === "Pending" && (
                    <>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
