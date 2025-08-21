"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { BarChart3, Download, FileText, TrendingUp, Users, Car, DollarSign } from "lucide-react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

export function ReportsManagement() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 1), 30),
  })
  const [reportType, setReportType] = useState("revenue")

  const handleExportPDF = () => {
    console.log("[v0] Exporting PDF report:", { reportType, dateRange })
    // PDF export logic would go here
  }

  const handleExportExcel = () => {
    console.log("[v0] Exporting Excel report:", { reportType, dateRange })
    // Excel export logic would go here
  }

  const reportStats = [
    {
      title: "Total Revenue",
      value: "$45,230",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Active Bookings",
      value: "127",
      change: "+8.2%",
      icon: BarChart3,
      color: "text-accent",
    },
    {
      title: "Total Customers",
      value: "89",
      change: "+15.3%",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Vehicle Utilization",
      value: "78%",
      change: "+5.1%",
      icon: Car,
      color: "text-primary",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">Generate and export rental reports</p>
        </div>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="bookings">Booking History</SelectItem>
                  <SelectItem value="vehicles">Vehicle Utilization</SelectItem>
                  <SelectItem value="customers">Customer Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[250px]">
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleExportPDF} variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button onClick={handleExportExcel} className="bg-primary hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="mx-auto h-12 w-12 mb-4" />
            <p>Select report parameters above to generate preview</p>
            <p className="text-sm mt-2">Charts and detailed data will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
