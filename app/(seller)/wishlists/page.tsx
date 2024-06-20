import TableWishlistComponent from "@/app/(seller)/component/table/tableWishlistComponent";
import CardWishlistPromotion from "@/app/(seller)/component/review/viewWishlist";

export default function WishlistPage() {
  return (
    <>
        <div className="mb-8">
        <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute dark:text-gray-200 after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Manage Wishlist</span>
            </p>
        </div>
        <div className="mb-8">
          <CardWishlistPromotion/>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg">
        <TableWishlistComponent/>
        </div>
    </>
  );
}
