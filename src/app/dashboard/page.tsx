import { Navbar } from '@/components/Navbar';
import { Dashboard } from '@/components/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main>
        <Navbar />
        <Dashboard />
      </main>
    </ProtectedRoute>
  );
} 