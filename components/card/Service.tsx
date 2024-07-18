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
    <div>
      <div className="flex flex-wrap justify-center gap-7 ">
        {data?.payload.list.map((product: ScrapedProduct) => (
          <Card
            key={product.name}
            className="h-[340px] w-[285px] py-4 shadow-none "
          >
            <CardHeader className="h-[130px] flex-col items-start px-4 pb-0  pt-2">
              <h4 className="text-large font-bold text-foreground-800">
                {product.name.length > 60
                  ? `${product.name.substring(0, 60)}...`
                  : product.name || 'Product Name'}
              </h4>
              <div className="mt-2 flex items-center w-full justify-between">
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
                  alt="Card Service"
                  isZoomed
                  className="mt-2 h-[160px] w-[284px] rounded-xl object-cover"
                  src={
                    product?.image ||
                    'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                  }
                  width={270}
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
