import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import AdminProfilePage from "@/components/Profiles/AdminProfile";

export const metadata: Metadata = {
  title: "Profile Admin",
  description:
    "This is Profile Admin Page",
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
