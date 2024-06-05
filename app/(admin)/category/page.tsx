import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoryCard from "@/components/Dashboard/CategoryCard";
import ListAllCategoryTable from "@/components/AdminTable/ListAllCategoryTable";

export const metadata: Metadata = {
  title: "Category Admin",
  description:
    "This is Category Admin page",
};

const CategoryPage = () => {
  return (
    <DefaultLayout>

      <CategoryCard />
      
      <div className="py-4">
        <ListAllCategoryTable />
      </div>

    </DefaultLayout>
  );
};

export default CategoryPage;
