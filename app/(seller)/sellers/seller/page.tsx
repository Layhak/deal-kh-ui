import { Metadata } from 'next';
import CardViewShop from '@/components/seller/component/review/viewShop';
import TableSellerComponent from '@/components/seller/component/table/tableSellerComponent';

export const metadata: Metadata = {
  title: 'Seller Page',
  description: 'This is a Seller Page',
  openGraph: {
    images: [
      {
        url: '/icon.png',
        alt: 'DealKH Logo Ecommerce Website',
      },
    ],
  },
};

export default function SellerPage() {
  return (
    <>
      <div className="mb-8">
        <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
          Dashboard{' '}
          <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Manage Seller
          </span>
        </p>
      </div>
      <div className="mb-8">
        <CardViewShop />
      </div>
      <div className="rounded-lg bg-white p-8">
        <TableSellerComponent />
      </div>
    </>
  );
}
