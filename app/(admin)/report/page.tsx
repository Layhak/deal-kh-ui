
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import ChartSeven from "@/components/Charts/chartSeven";
import ChartEight from "@/components/Charts/ChartEight";
import TableFive from "@/components/Tables/TableFive";

export const metadata: Metadata = {
  title: "Report Admin ",
  description:
    "This is Report Admin Page",
};

const Report = () => {
  return (
    <DefaultLayout>
        <p className="text-2xl text-orange-500 py-4">Report Buyer Visit Shop</p> 
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 pb-4">
            <ChartSeven />
            <ChartEight />
        </div>
        <p className="text-2xl text-orange-500 py-4">List All Sellers</p>
        <div className="py-4">
            <TableFive />
        </div>
    </DefaultLayout>
  );
};

export default Report;
