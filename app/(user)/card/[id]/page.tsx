import CardDetailComponent from '@/components/card/CardDetailComponent';
import { useRouter } from 'next/router';
import React from 'react';

export default function CardDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <CardDetailComponent />
    </div>
  );
}
