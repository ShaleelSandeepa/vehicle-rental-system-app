import AuthGuard from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VehicleManagement } from "@/components/vehicles/vehicle-management"

export default function VehiclesPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <VehicleManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
