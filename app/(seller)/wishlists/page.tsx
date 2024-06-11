
import TablePromotionComponent from "../component/table/tablePromotionComponent";
import CardViewPromotion from "../component/review/viewPromotion";
import TableWishlistComponent from "../component/table/tableWishlistComponent";

export default function WishlistPage() {
  return (
    <>
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-black">Dashboard Manage Wishlist</h1>
          <div className=" w-[310px] h-1 bg-warning"></div>
        </div>
        <div className="mb-8">
          <CardViewPromotion/>
        </div>
        <div className="bg-white p-8 rounded-lg">
        <TableWishlistComponent/>
        </div>
    </>
  );
}
