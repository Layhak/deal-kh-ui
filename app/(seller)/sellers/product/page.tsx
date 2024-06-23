import { Metadata } from 'next';
import TableDashboardComponent from '@/components/seller/component/table/tableDashboardComponent';
import CardViewShop from '@/components/seller/component/review/viewShop';

export const metadata: Metadata = {
  title: 'Prodcut',
  description: 'This is a Product Page',
  openGraph: {
    images: [
      {
        url: '/icon.png',
        alt: 'DealKH Logo Ecommerce Website',
      },
    ],
  },
};

export default function DashboardPage() {
  return (
    <div className="z-0">
      <div className="mb-8">
        <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
          Dashboard{' '}
          <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Manage Product
          </span>
        </p>
      </div>
      <div className="z-0 mb-8">
        <CardViewShop />
      </div>
      <div className="z-0 rounded-lg bg-white p-8">
        <TableDashboardComponent />
      </div>
    </div>
  );
}