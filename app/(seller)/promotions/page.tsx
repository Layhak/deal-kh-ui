
import TablePromotionComponent from "../component/table/tablePromotionComponent";
import CardViewPromotion from "../component/review/viewPromotion";

export default function PromotionPage() {
  return (
    <>
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-black">Dashboard Manage Promotions</h1>
          <div className=" w-[310px] h-1 bg-warning"></div>
        </div>
        <div className="mb-8">
          <CardViewPromotion/>
        </div>
        <div className="bg-white p-8 rounded-lg">
        <TablePromotionComponent/>
        </div>
    </>
  );
}
