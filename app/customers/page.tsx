import AuthGuard from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CustomerManagement } from "@/components/customers/customer-management"

export default function CustomersPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <CustomerManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
