import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import AdminProfilePage from "@/components/Profiles/AdminProfile";
import UpdateAdminForm from "@/components/Profiles/UpdateAdminProfile";

export const metadata: Metadata = {
  title: "Update Profile",
  description:
    "This is Update Profile page",
};

const UpdateProfile = () => {
  return (
    <DefaultLayout>
      <p className="text-2xl text-orange-500 py-4">Your Information</p>
      <div className="mx-auto max-w-242.5">

      
          <UpdateAdminForm />   

      
      </div>

    </DefaultLayout>
  );
};

export default UpdateProfile;
