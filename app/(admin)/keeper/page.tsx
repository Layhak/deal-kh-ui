import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ShopChart from "@/components/Charts/ShopChart";
import TrafficBySaleOfWeekChart from "@/components/Charts/TrafficBySaleOfWeekChart";
import ListAllShopkeeperTable from "@/components/AdminTable/ListAllShopkeeperTable";

export const metadata: Metadata = {
  title: "Shopkeeper Admin",
  description:
    "This is a Shopkeeper Admin Page",
};

const ShopkeeperPage = () => {
  return (
    
    <DefaultLayout>
      <p className="text-2xl text-orange-500 py-4">Top Shops</p> 
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 pb-4">
        
        <ShopChart />
        <TrafficBySaleOfWeekChart />
        
      </div>
      <p className="text-2xl text-orange-500 py-4">List All Shopkeepers</p>
      <div className="py-4">
        <ListAllShopkeeperTable />
      </div>
      
    </DefaultLayout>
  );
};

export default ShopkeeperPage;
