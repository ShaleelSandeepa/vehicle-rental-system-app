import { Car, Users, Calendar, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"

export function Dashboard() {
  const stats = [
    {
      name: "Total Vehicles",
      value: "24",
      change: "+2 from last month",
      icon: Car,
      color: "text-blue-600",
    },
    {
      name: "Active Bookings",
      value: "12",
      change: "+3 from last week",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      name: "Total Customers",
      value: "156",
      change: "+12 from last month",
      icon: Users,
      color: "text-purple-600",
    },
    {
      name: "Monthly Revenue",
      value: "$24,500",
      change: "+15% from last month",
      icon: DollarSign,
      color: "text-emerald-600",
    },
  ]

  const recentBookings = [
    { id: 1, customer: "John Doe", vehicle: "Toyota Camry", status: "Active", date: "2024-01-15" },
    { id: 2, customer: "Jane Smith", vehicle: "Honda Civic", status: "Pending", date: "2024-01-14" },
    { id: 3, customer: "Mike Johnson", vehicle: "Ford Focus", status: "Completed", date: "2024-01-13" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-text">Dashboard Overview</h1>
        <p className="text-text-secondary">Welcome back! Here's what's happening with your rental business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">{stat.name}</p>
                <p className="text-2xl font-bold text-text">{stat.value}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-heading text-lg font-semibold text-text mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div>
                  <p className="font-medium text-text">{booking.customer}</p>
                  <p className="text-sm text-text-secondary">{booking.vehicle}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                  <p className="text-xs text-text-secondary mt-1">{booking.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-heading text-lg font-semibold text-text mb-4">System Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-yellow-800">Maintenance Due</p>
                <p className="text-sm text-yellow-700">Toyota Camry (TC-001) needs service</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-blue-800">High Demand</p>
                <p className="text-sm text-blue-700">SUV category booking increased by 25%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
