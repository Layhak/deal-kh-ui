import ProfileComponent from "../component/profile/profileComponent";


export default function ProflePage() {
  return (
    <>
        <div className="mb-8">
           <div className="flex-1">
            <p className="relative w-fit text-[26px] font-bold text-gray-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-warning">
             My<span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"> Profile</span>
            </p>
          </div>
        </div>
        <div className="">
        <ProfileComponent/>
        </div>
    </>
  );
}
