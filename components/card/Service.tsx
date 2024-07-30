'use client';
import { Card, CardBody, CardHeader, Image, Link } from '@nextui-org/react';
import { ScrapedProduct } from '@/types/productScrape';
import React from 'react';

type ServiceCardComponentProps = {
  data: { payload: { list: ScrapedProduct[] } };
};

const ServiceCardComponent: React.FC<ServiceCardComponentProps> = ({
  data,
}) => {
  return (
    <div className={'my-auto flex h-full w-full max-w-7xl flex-col gap-2 px-4 lg:p-0'}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 ">
        {data?.payload.list.map((product: ScrapedProduct) => (
          <Card key={product.name} className=" py-4 shadow-none ">
            <CardHeader className=" flex-col items-start px-4 pb-0  pt-2">
              <h4 className="line-clamp-2 text-large font-bold text-foreground-800">
                {product.name || 'Product Name'}
              </h4>
              <div className="mt-2 flex w-full items-center justify-between">
                <p className="bg-gradient-to-r from-pink-500 from-20% to-yellow-500 to-100% bg-clip-text text-2xl font-bold text-transparent">
                  ${product.price}
                </p>

                <Link href={product.url} target="_blank">
                  <p className="mt-2 text-base font-medium text-blue-800">
                    Check Out
                  </p>
                </Link>
              </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Link href={product.url} target="_blank">
                <Image
                  width={500}
                  alt="Card Service"
                  isZoomed
                  className="mt-2 h-[160px] rounded-xl object-cover"
                  src={
                    product?.image ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                />
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceCardComponent;
