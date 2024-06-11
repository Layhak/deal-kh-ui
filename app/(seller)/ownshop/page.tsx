
import TableOwnShopComponent from "../component/table/tableOwnShopComponent";
import CardViewShop from "../component/review/viewShop";

export default function DashboardPage() {
  return (
    <>
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-black">Dashboard Manage Shop</h1>
          <div className=" w-[245px] h-1 bg-warning"></div>
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
