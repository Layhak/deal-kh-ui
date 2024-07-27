'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginComponent from '@/components/login/LoginComponent'; // Adjust the import path as needed

const LoginPageWrapper = () => {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');

  return <LoginComponent email={emailParam || ''} />;
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageWrapper />
    </Suspense>
  );
}
