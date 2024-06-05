import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ListAllPromotionTable from "@/components/AdminTable/ListAllPromotionTable";
;

export const metadata: Metadata = {
  title: "Promotion Admin",
  description:
    "This is Promotion Admin page",
};

const PromotionPage = () => {
  return (
    <DefaultLayout >
      
      <ListAllPromotionTable />

    </DefaultLayout>
  );
};

export default PromotionPage;
