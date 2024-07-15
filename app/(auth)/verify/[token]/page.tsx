'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/(user)/loading';
import NotFoundPage from '@/app/(user)/not-found';
import { toast } from 'react-toastify';
import { useVerifyUserQuery } from '@/redux/service/verify';

type TokenVerificationProp = {
  params: {
    token: string;
  };
};

const VerificationPage = ({ params }: TokenVerificationProp) => {
  const { token } = params;
  const { data, error, isLoading } = useVerifyUserQuery({ token });
  const router = useRouter();

  useEffect(() => {
    if (data) {
      toast.success('Email verified successfully!');
      localStorage.setItem('token', 'verified');
      setTimeout(() => router.push('/'), 3000);
    }
  }, [data, router]);

  if (isLoading) return <Loading />;
  if (error) {
    toast.error('Verification failed. Please request a new token.');
    return <NotFoundPage />;
  }

  return <Loading />;
};

export default VerificationPage;
