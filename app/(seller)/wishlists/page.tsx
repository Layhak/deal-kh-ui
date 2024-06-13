
import TablePromotionComponent from "../component/table/tablePromotionComponent";
import CardViewPromotion from "../component/review/viewPromotion";
import TableWishlistComponent from "../component/table/tableWishlistComponent";
import CardWishlistPromotion from "../component/review/viewWishlist";

export default function WishlistPage() {
  return (
    <>
        <div className="mb-8">
        <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Manage Wishlist</span>
            </p>
        </div>
        <div className="mb-8">
          <CardWishlistPromotion/>
        </div>
        <div className="bg-white p-8 rounded-lg">
        <TableWishlistComponent/>
        </div>
    </>
  );
}
