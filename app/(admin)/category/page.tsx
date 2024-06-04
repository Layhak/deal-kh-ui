
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce2 from "@/components/Dashboard/E-commerce_2";
import TableSix from "@/components/Tables/TableSix";

export const metadata: Metadata = {
  title: "Category Admin",
  description:
    "This is Category Admin page",
};

const CategoryPage = () => {
  return (
    <DefaultLayout>
      <ECommerce2 />
      <div className="py-4">
        <TableSix />
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
