
import CardView from "@/app/(seller)/component/review/viewProduct";
import TableDashboardComponent from "@/app/(seller)/component/table/tableDashboardComponent";


export default function DashboardPage() {
  return (
      <div className="z-0">
        <div className="mb-8">
        <p className="relative w-fit text-[26px] font-bold after:absolute after:bottom-[-4px] dark:text-gray-200 after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Dashboard <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Manage Product</span>
            </p>
        </div>
        <div className="mb-8 z-0">
          <CardView />
        </div>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg z-0">
          <TableDashboardComponent />
        </div>
      </div>
  );
}
