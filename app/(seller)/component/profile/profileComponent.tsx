// "use client"
// import { Link} from '@nextui-org/react';
// import Next, { NextPage } from 'next';
// import Image from 'next/image';
// import { useState } from 'react';
// import { BsCamera } from 'react-icons/bs';
// import { PiInstagramLogoLight } from "react-icons/pi";
// import { SlSocialFacebook } from "react-icons/sl";
// import { PiTelegramLogo } from "react-icons/pi";
// import Map from '../map/map';
// import {Button} from "@nextui-org/react";

// type ProfileProps = {
    
// };

// const ProfileComponent: NextPage<ProfileProps> = () => {
//     const [profileImage, setProfileImage] = useState('/images/members/votey.jpg');

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             const file = event.target.files[0];
//             const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 setProfileImage(e.target.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div>
//             <div className="bg-white dark:bg-zinc-900 rounded-md min-h-[55vh] w-full p-8">
//             <div className="relative w-full h-72">
//                 <Image 
//                     src="/images/members/layhak.jpg" 
//                     alt="Header Image" 
//                     layout="fill" 
//                     objectFit="cover"
//                     className="rounded-lg"
//                 />
//             </div>
//             <div className="relative mt-4">
//                 <div className="absolute top-0 bottom-24 left-10 flex items-center">
//                     <div className="relative flex-shrink-0">
//                         <label htmlFor="fileInput" className="cursor-pointer relative">
//                             <Image 
//                                 src={profileImage} 
//                                 alt="Logo" 
//                                 width={120} 
//                                 height={120} 
//                                 className="rounded-full"
//                             />
//                             <div className="absolute bottom-0 right-0 bg-warning p-2 rounded-full">
//                                 <BsCamera className="text-white" size={20} />
//                             </div>
//                         </label>
//                         <input 
//                             id="fileInput" 
//                             type="file" 
//                             accept="image/members/votey.jpg" 
//                             className="hidden" 
//                             onChange={handleImageChange}
//                         />
//                     </div>
//                     <div className="ml-4 mr-3">
//                         <h2 className="text-lg font-medium pt-8">Hom Pheakakvotey</h2>
//                         {/* <PiInstagramLogo className="w-8 h-8 " /> */}
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className=" mt-8 bg-white dark:bg-zinc-900 rounded-md min-h-[55vh] w-full p-8">
//             <p className="text-2xl font-medium dark:text-gray-100">Personal Information</p>
//             <div className="p-4 text-black dark:text-white flex flex-col md:flex-row">
//                 <div className="flex-1 mb-4 md:mb-0">
//                     <div className="py-4">
//                         <p className="font-semibold text-lg">Email Address</p>
//                         <p className="text-md mt-2">Pheakakvotey@gmail.com</p>
//                     </div>
//                     <div className="py-4">
//                         <p className="font-semibold text-lg">Phone Number</p>
//                         <p className="mt-2 text-md">096 908 897</p>
//                     </div>
//                     <div className="py-4">
//                         <p className="font-semibold text-lg">Date of Birth</p>
//                         <p className="mt-2 text-md">Aug 30,2024</p>
//                     </div>
//                 </div>
//                 <div className="flex-1">
//                     <div className="py-4">
//                         <p className="font-semibold text-lg">Gender</p>
//                         <p className="mt-2 text-md">Female</p>
//                     </div>
//                     <p className="text-lg font-semibold mb-3">Social Media</p>
//                     <div className="flex gap-2 py-2">
//                     <Link
//                             href="#"
//                         >
//                            <SlSocialFacebook className="w-8 h-8 text-black" />  
//                     </Link>
//                     <Link
//                             href="#"
//                         >
//                              <PiInstagramLogoLight className="w-9 h-9 text-black"/>
//                     </Link>
//                     <Link
//                             href="#"
//                         >
//                              <PiTelegramLogo className="w-9 h-9 text-black"/>
//                     </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className="py-4">
//                 <p className="font-semibold text-lg mb-5">Location</p>
//                 <Map shops={[]}/>
//             </div> */}

//             <div className="flex justify-end ">
//                         <Link
//                             href="/profiles/profileSellerUpdate"
//                         >
//                             <Button color="warning" className="bg-gradient-to-tr text-md from-pink-500 text-white to-yellow-500 rounded-md">
//                                 Update
//                             </Button>  
//                         </Link>
//                 </div>

//         </div>
//         </div>
//     );
// };

// export default ProfileComponent;





"use client"
import { Link ,Button,Image} from '@nextui-org/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTelegram,FaSquareInstagram  } from "react-icons/fa6";
import { BsCamera } from 'react-icons/bs';

type ProfileProps = {
    
};

const ProfileComponent: NextPage<ProfileProps> = () => {
    const [profileImage, setProfileImage] = useState('/images/members/votey.jpg');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
    <div className="flex flex-col md:flex-row justify-between">
  {/* Left Section */}
  <div className="bg-white dark:bg-zinc-900 rounded-lg w-full md:w-[400px] h-auto md:h-[430px] p-8 md:mr-4">
    <div className="flex justify-center relative">
      <Image
        src="/images/members/votey.jpg" 
        alt="Profile" 
        className="object-contain rounded-3xl z-0"
        width={300} 
        height={500} 
      />
      <div className="absolute z-50 bottom-0 right-0 bg-warning p-2 rounded-full">
        <BsCamera className="text-white" size={20} />
      </div>
    </div>
    
    <div className="mt-5 text-center">
      <p className="font-bold text-xl dark:text-gray-100">Hom Pheakakvotey</p>
    </div>

    <div className="flex gap-2 py-2 mt-2 justify-center">
      <Link href="#">
        <FaFacebookSquare className="w-8 h-8 text-blue-700" />  
      </Link>
      <Link href="#">
        <FaTelegram className="w-8 h-8 text-blue-500"/>
      </Link>
      <Link href="#">
        <FaSquareInstagram className="w-8 h-8 text-orange-600"/>
      </Link>
    </div>
  </div>

  {/* Right Section */}
  <div className="bg-white dark:bg-zinc-900 rounded-md min-h-[55vh] p-8 w-full md:max-w-3xl mt-4 md:mt-0">
    <p className="text-3xl font-semibold dark:text-gray-100 text-center">Your Information</p>
    <div className="p-4 text-black dark:text-white flex flex-col md:flex-row">
      <div className="flex-1 md:mb-0 md:mr-5">
        <div className="flex flex-col mb-6 flex-1 ">
            <label className="mb-3 dark:bg-transparent text-gray-700 text-lg font-bold dark:text-white" htmlFor="name">
                Email
            </label>
            <input
            className="border dark:text-gray-200 dark:bg-transparent placeholder:text-lg px-5 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-full focus:outline-none focus:ring-1 focus:ring-warning-500"
            type="text"
            id="email"
            name="email"
            value="hompheakakvotey@gmail.com"
        />
        </div>
        <div className="flex flex-col mb-6 flex-1 ">
            <label className="mb-3 text-gray-700 text-lg font-bold dark:text-white" htmlFor="phone_number">
            Phone Number
            </label>
            <input
            className="border dark:text-gray-200  dark:bg-transparent placeholder:text-lg px-5 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-full focus:outline-none focus:ring-1 focus:ring-warning-500"
            type="text"
            id="phone_number"
            name="phone_number"
            value="092-938-283"
        />
        </div>
        <div className="flex flex-col mb-6 flex-1 ">
            <label className="mb-3 text-gray-700 text-lg font-bold dark:text-white" htmlFor="date_of_birth">
            Date of Birth
            </label>
            <input
            className="border dark:text-gray-200  dark:bg-transparent placeholder:text-lg px-5 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-full focus:outline-none focus:ring-1 focus:ring-warning-500"
            type="text"
            id="date_of_birth"
            name="date_of_birth"
            value="Aug 30, 2024"
        />
        </div>
      </div>
      <div className="flex-1 justify-end">
        <div className="flex flex-col mb-6 flex-1 ">
            <label className="mb-3 text-gray-700 text-lg font-bold dark:text-white" htmlFor="gender">
            Gender
            </label>
            <input
            className="border dark:text-gray-200  dark:bg-transparent placeholder:text-lg px-5 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-full focus:outline-none focus:ring-1 focus:ring-warning-500"
            type="text"
            id="gender"
            name="gender"
            value="Female"
        />
        </div>
        <div className="flex flex-col flex-1 ">
            <label className="mb-3 text-gray-700 text-lg font-bold dark:text-white" htmlFor="location">
            Location
            </label>
            <input
            className="border dark:text-gray-200  dark:bg-transparent placeholder:text-lg px-5 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-full focus:outline-none focus:ring-1 focus:ring-warning-500"
            type="text"
            id="location"
            name="location"
            value="Phnom penh"
        />
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <Link href="/profiles/profileSellerUpdate">
        <Button color="warning" className="bg-gradient-to-tr text-md from-pink-500 text-white to-yellow-500 rounded-md">
          Update
        </Button>  
      </Link>
    </div>
  </div>
</div>

    );
};

export default ProfileComponent;
