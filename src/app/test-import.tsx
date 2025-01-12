'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function TestImport() {
  const { user } = useAuth();
  return <div>Test</div>;
} 