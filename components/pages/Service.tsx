'use client';
import React, { useState, useEffect } from 'react';
import { Link, Image } from '@nextui-org/react';
import ServiceCardComponent from '@/components/card/Service';
import { useGetProductScrapeQuery } from '@/redux/service/productScrape';
import Pagination from '@/components/pagination/Pagination';

export default function Service() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(16);

  const { data } = useGetProductScrapeQuery({ page, size });

  const totalElements = data?.payload.pagination?.totalElements || 0;
  const totalPages = data?.payload.pagination?.totalPages || 0;

  return (
    <main>
      {/* Banner */}
      <div className="">
        <Image
          src="https://img.freepik.com/free-vector/flat-design-car-dealer-sale-banner-template_23-2149998205.jpg?t=st=1717932978~exp=1717936578~hmac=d2cc12bf7fd0d8b21f645c1176881947e68cd8601f7397c04fe30391f29febe4&w=1060"
          className="h-[320px] w-[1300px] object-cover"
          alt="Service"
        />
      </div>
      {/* Card */}
      <div className="my-10">
        {data && <ServiceCardComponent data={data} />}
      </div>
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          total={totalPages || 1}
          page={page}
          size={size}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </main>
  );
}
