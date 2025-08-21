import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Calendar, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Vehicles",
    value: "124",
    icon: Car,
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    title: "Active Bookings",
    value: "89",
    icon: Calendar,
    change: "+8%",
    changeType: "positive" as const,
  },
  {
    title: "Total Customers",
    value: "1,234",
    icon: Users,
    change: "+23%",
    changeType: "positive" as const,
  },
  {
    title: "Monthly Revenue",
    value: "$45,231",
    icon: DollarSign,
    change: "+15%",
    changeType: "positive" as const,
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your vehicle rental business today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">{stat.change}</span> from last month
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
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Toyota Camry 2023</p>
                    <p className="text-sm text-muted-foreground">John Doe • 3 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$240</p>
                    <p className="text-sm text-primary">Active</p>
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
                <span className="text-sm font-medium text-primary">78</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Rented</span>
                <span className="text-sm font-medium text-accent">34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Under Maintenance</span>
                <span className="text-sm font-medium text-destructive">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
