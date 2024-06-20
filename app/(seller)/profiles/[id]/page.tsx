import UpdateProfileSellerComponent from "@/app/(seller)/component/profile/updateProfileComponent";

export default function UpdateProfilePage() {
  return (
    <>
        <div className="mb-8 -z-0">
            <p className="relative w-fit text-[26px] font-bold dark:text-gray-200 text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             Update<span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"> Your Profile</span>
            </p>
        </div>
        <div className="bg-white rounded-lg">
        <UpdateProfileSellerComponent/>
        </div>
    </>
  );
}
