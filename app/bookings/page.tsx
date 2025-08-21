import AuthGuard from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BookingManagement } from "@/components/bookings/booking-management"

export default function BookingsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <BookingManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
