import AuthGuard from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsManagement } from "@/components/reports/reports-management"

export default function ReportsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ReportsManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
