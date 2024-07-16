import { useGetApprovedShopsQuery } from '@/redux/service/shop';
import { Card, CardBody, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { BsShop } from 'react-icons/bs';
import React, { useState } from 'react';
import Pagination from '@/components/pagination/Pagination';
import { ShopResponse } from '@/libs/difinition';

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
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div className="grid min-h-[920px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.payload.list.map((shop: ShopResponse) => (
          <Card
            key={shop.slug}
            isPressable
            className=" h-[450px] w-full object-cover shadow-none"
          >
            <CardBody>
              <Link href="#">
                <Image
                  className="h-[195px] w-[350px] object-cover"
                  src={
                    shop.profile ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  alt={shop.name}
                />
              </Link>
              <div className="mt-2 flex">
                <BsShop className="h-[35px] w-[35px] text-[#eb7d52]" />
                <h5 className="ml-2 mt-2 h-[52px] text-2xl font-semibold tracking-tight text-foreground-800 dark:text-white">
                  {shop.name.length > 25
                    ? `${shop.name.substring(0, 25)}...`
                    : shop.name || 'Shop Name'}
                </h5>
              </div>
              <div className="my-1 text-foreground-600">
                <p>
                  {shop.description.length > 25
                    ? `${shop.description.substring(0, 25)}...`
                    : shop.description || 'Shop Description'}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" text-foreground-600">
                  Category :{' '}
                  <span className="font-medium text-foreground-900">
                    {shop.shopType || 'shop Category'}
                  </span>
                </p>
                <p className="text-foreground-600">
                  Open&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
                  <span className="font-medium text-foreground-900">
                    {shop.openAt.slice(0, 5)} AM - {shop.closeAt.slice(0, 5)} PM
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center justify-start">
                  <span className="pt-2 text-sm font-medium text-blue-700 ">
                    Available Now.
                    <p>Get Notified.</p>
                  </span>
                </div>
                <Link href={`/shop/${shop.slug}`}>
                  <button className="h-[37px] w-[130px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[14px] text-white ">
                    Check Us Out
                  </button>
                </Link>
              </div>
            </CardBody>
          </Card>
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
          onSizeChange={handleSizeChange}
        />
      </div>
    </div>
  );
}
