import CardViewSeller from "@/app/(seller)/component/review/viewSeller";
import TableSellerComponent from "@/app/(seller)/component/table/tableSellerComponent";

export default function SellerPage() {
  return (
    <>
        <div className="mb-8">
          <p className="relative w-fit text-[26px] dark:text-gray-200 font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Manage Seller</span>
            </p>
        </div>
        <div className="mb-8">
          <CardViewSeller/>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg">
        <TableSellerComponent/>
        </div>
    </>
  );
}
