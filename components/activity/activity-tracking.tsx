"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, User, Car, Calendar, Settings, Eye } from "lucide-react"

// Mock activity data
const activities = [
  {
    id: 1,
    user: "John Admin",
    action: "Created new vehicle",
    target: "Toyota Camry 2023",
    timestamp: "2024-01-20 14:30:25",
    type: "create",
    ip: "192.168.1.100",
  },
  {
    id: 2,
    user: "Sarah Staff",
    action: "Approved booking",
    target: "Booking #12345",
    timestamp: "2024-01-20 13:15:10",
    type: "update",
    ip: "192.168.1.101",
  },
  {
    id: 3,
    user: "Mike Customer",
    action: "Made new booking",
    target: "Honda Civic 2022",
    timestamp: "2024-01-20 12:45:33",
    type: "create",
    ip: "203.0.113.45",
  },
  {
    id: 4,
    user: "John Admin",
    action: "Updated vehicle status",
    target: "Ford Mustang 2023",
    timestamp: "2024-01-20 11:20:15",
    type: "update",
    ip: "192.168.1.100",
  },
  {
    id: 5,
    user: "Sarah Staff",
    action: "Deleted customer",
    target: "Customer #789",
    timestamp: "2024-01-20 10:05:42",
    type: "delete",
    ip: "192.168.1.101",
  },
]

export function ActivityTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const getActionIcon = (type: string) => {
    switch (type) {
      case "create":
        return <User className="h-4 w-4" />
      case "update":
        return <Settings className="h-4 w-4" />
      case "delete":
        return <Car className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  const getActionColor = (type: string) => {
    switch (type) {
      case "create":
        return "bg-primary text-primary-foreground"
      case "update":
        return "bg-accent text-accent-foreground"
      case "delete":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || activity.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Activity & Change Tracking</h1>
          <p className="text-muted-foreground mt-2">Monitor all system activities and changes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    {getActionIcon(activity.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{activity.user}</span>
                      <Badge className={getActionColor(activity.type)}>{activity.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {activity.timestamp}
                      </span>
                      <span>IP: {activity.ip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
