import { Navbar } from '@/components/Navbar';
import { FamilyManagement } from '@/components/FamilyManagement';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function FamilyPage() {
  return (
    <ProtectedRoute>
      <main>
        <Navbar />
        <FamilyManagement />
      </main>
    </ProtectedRoute>
  );
} 