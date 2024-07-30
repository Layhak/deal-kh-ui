'use client';
import React, { useState } from 'react';
import { useGetProductsQuery } from '@/redux/service/product';
import Pagination from '@/components/pagination/Pagination';
import ProductCard from '@/components/card/ProductCard';

type ProductPageProps = {

  params: {
    slug: string;
  };
};

export default function ProductsByDiscountTypePage({

  params,
}: ProductPageProps) {
  const { slug } = params;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const { data, isLoading, error } = useGetProductsQuery({
    page,
    size: pageSize,
    filters: { discountTypeSlug: slug },
  }, { refetchOnMountOrArgChange: true });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setPageSize(newSize);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const products = data?.payload?.list || [];
  const totalPages = Math.ceil((data?.payload?.pagination.totalElements || 0) / pageSize);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{`Products for ${slug}`}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product: any) => (
            <ProductCard key={product.slug} product={product} discountType={slug} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          total={totalPages}
          page={page}
          size={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
