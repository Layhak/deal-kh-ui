
import CardView from "../component/review/viewProduct";
import TableDashboardComponent from "../component/table/tableDashboardComponent";
import RootLayout from "../layout";

export default function DashboardPage() {
  return (
      <div className="z-0">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-black">Dashboard Manage Products</h1>
          <div className="w-[295px] h-1 bg-gradient-to-r to-yellow-500 from-pink-500"></div>
        </div>
        <div className="mb-8 z-0">
          <CardView />
        </div>
        <div className="bg-white p-8 rounded-lg z-0">
          <TableDashboardComponent />
        </div>
      </div>
  );
}
