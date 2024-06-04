import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableSeven from "@/components/Tables/TableSeven";
;

export const metadata: Metadata = {
  title: "Promotion Admin",
  description:
    "This is Promotion Admin page",
};

const PromotionPage = () => {
  return (
    <DefaultLayout >
      
      <TableSeven />

    </DefaultLayout>
  );
};

export default PromotionPage;
