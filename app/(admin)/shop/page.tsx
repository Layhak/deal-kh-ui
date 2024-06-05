import AdminHomePage from "@/components/Dashboard/AdminHomePage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Shop Admin",
  description: "This is a Shop Admin Page",
};

export default function ShopPage() {
  return (
    <>
      <DefaultLayout>
        <AdminHomePage />
      </DefaultLayout>
    </>
  );
}
