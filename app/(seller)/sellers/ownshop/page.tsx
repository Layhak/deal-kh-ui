
import TableOwnShopComponent from "../../../../components/seller/component/table/tableOwnShopComponent";
import CardViewShop from "../../../../components/seller/component/review/viewShop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Own Shop',
  description: 'This is a Own Shop Page',
  openGraph: {
    images: [
      {
        url: '/icon.png',
        alt: "DealKH Logo Ecommerce Website",
      },
    ],
  },
};

export default function DashboardPage() {
  return (
    <>
        <div className="mb-8">
           <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Manage Shop</span>
            </p>
        </div>
        <div className="mb-8">
          <CardViewShop/>
        </div>
        <div className="bg-white p-8 rounded-lg">
        <TableOwnShopComponent/>
        </div>
    </>
  );
}
