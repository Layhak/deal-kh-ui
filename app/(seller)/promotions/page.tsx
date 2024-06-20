import TablePromotionComponent from "@/app/(seller)/component/table/tablePromotionComponent";
import CardViewPromotion from "@/app/(seller)/component/review/viewPromotion";

export default function PromotionPage() {
  return (
    <>
        <div className="mb-8">
        <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] dark:text-gray-200 after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500  to-yellow-500 bg-clip-text text-transparent">Manage Promotion</span>
            </p>
        </div>
        <div className="mb-8">
          <CardViewPromotion/>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg">
        <TablePromotionComponent/>
        </div>
    </>
  );
}
