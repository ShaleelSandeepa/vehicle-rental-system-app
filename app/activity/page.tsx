import AuthGuard from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ActivityTracking } from "@/components/activity/activity-tracking"

export default function ActivityPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ActivityTracking />
      </DashboardLayout>
    </AuthGuard>
  )
}
