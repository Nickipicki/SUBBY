import { Navbar } from '@/components/Navbar';
import { SubscriptionList } from '@/components/SubscriptionList';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function SubscriptionsPage() {
  return (
    <ProtectedRoute>
      <main>
        <Navbar />
        <SubscriptionList />
      </main>
    </ProtectedRoute>
  );
} 