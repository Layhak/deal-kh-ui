import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import AdminProfilePage from "@/components/Profiles/AdminProfile";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <p className="text-2xl text-orange-500 py-4">Your Information</p>
      <div className="mx-auto max-w-242.5">

      
          <AdminProfilePage />    

      
      </div>

    </DefaultLayout>
  );
};

export default Profile;
