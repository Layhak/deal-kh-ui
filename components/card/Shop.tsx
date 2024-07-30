import { useGetApprovedShopsQuery } from '@/redux/service/shop';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Pagination from '@/components/pagination/Pagination';
import { ShopResponse } from '@/libs/difinition';
import ShopList from './ShopList';

type ShopCardComponentProps = {
  initialPage: number;
  size: number;
};

export default function ShopCardComponent({
  initialPage,
  size,
}: ShopCardComponentProps) {
  const [page, setPage] = useState(initialPage);
  const [sice, setSize] = useState(size);
  const router = useRouter();
  const { data, isLoading, error } = useGetApprovedShopsQuery({
    page,
    size: sice,
    field: 'name',
    order: 'asc',
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
  };

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div className="grid  grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 lg:p-0">
        {data?.payload.list.map((shop: ShopResponse) => (
          <ShopList
            key={shop.slug}
            name={shop.name}
            shopType={shop.shopType}
            isLoading={isLoading}
            phoneNumber={shop.phoneNumber}
            rating={shop.ratingAvg}
            location={shop.location}
            address={shop.address}
            shopSlug={shop.slug}
            openAt={shop.openAt}
            closeAt={shop.closeAt}
            imageSrc={shop.profile || 'https://via.placeholder.com/150'}
            className="my-4"
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          total={Math.ceil(
            (data?.payload.pagination.totalElements || 0) / size
          )}
          page={page}
          size={size}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
