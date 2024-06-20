
import TableOwnShopComponent from "@/app/(seller)/component/table/tableOwnShopComponent";
import CardViewShop from "@/app/(seller)/component/review/viewShop";

export default function DashboardPage() {
  return (
    <>
        <div className="mb-8 ">
           <p className="relative w-fit text-[26px] font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Manage Shop</span>
            </p>
        </div>
        <div className="mb-8">
          <CardViewShop/>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg z-0">
        <TableOwnShopComponent/>
        </div>
    </>
  );
}
