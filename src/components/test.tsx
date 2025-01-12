'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function Test() {
  const { user } = useAuth();
  return <div>Test</div>;
} 