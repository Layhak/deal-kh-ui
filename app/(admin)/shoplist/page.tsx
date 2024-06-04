import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartFive from "@/components/Charts/ChartFive";
import ChartSix from "@/components/Charts/ChartSix";
import TableThree from "@/components/Tables/TableThree";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const CalendarPage = () => {
  return (
    
    <DefaultLayout>
      <p className="text-2xl text-orange-500 py-4">Top Shops</p> 
      {/* <ChartFive />
      <ChartSix /> */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 pb-4">
        {/* <ChartOne />
        <ChartTwo /> */}
        <ChartFive />
        {/* <MapOne /> */}
        <ChartSix />
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
      <p className="text-2xl text-orange-500 py-4">List All Shopkeepers</p>
      <div className="py-4">
        <TableThree />
      </div>
      
      
    </DefaultLayout>
  );
};

export default CalendarPage;
