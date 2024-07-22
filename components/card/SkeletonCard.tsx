import React from 'react';
import { Card, CardBody, Skeleton, Spacer } from '@nextui-org/react';

export default function SkeletonCard() {
  return (
    <Card className=" relative mb-2 rounded-2xl  text-gray-50 shadow-none">
      <CardBody className={'relative rounded-b-lg '}>
        <Skeleton className={'h-[193px] w-full rounded-2xl '} />
        <div className={'mt-4 h-[16] w-full'}>
          <div className={'flex flex-col '}>
            <div className={'flex gap-1'}>
              <Skeleton className={' h-3 w-24 rounded-full'} />
              <Spacer y={1} />
              <Skeleton className={'h-3 w-14 rounded-full'} />
            </div>
            <Spacer y={4} />
            <Skeleton className={'h-3 w-36 rounded-full'} />
            <Spacer y={12} />
            <div>
              <Skeleton className={'h-3 w-16 rounded-full'} />
              <Spacer y={1} />
              <Skeleton className={'h-3 w-36 rounded-full'} />
              <Spacer y={3} />
              <Skeleton className={'h-3 w-28 rounded-full'} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
