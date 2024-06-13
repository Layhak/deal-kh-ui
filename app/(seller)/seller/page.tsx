import CardViewShop from "../component/review/viewShop";
import TableSellerComponent from "../component/table/tableSellerComponent";

export default function SellerPage() {
  return (
    <>
        <div className="mb-8">
          <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Manage Seller</span>
            </p>
        </div>
        <div className="mb-8">
          <CardViewShop/>
        </div>
        <div className="bg-white p-8 rounded-lg">
        <TableSellerComponent/>
        </div>
    </>
  );
}
