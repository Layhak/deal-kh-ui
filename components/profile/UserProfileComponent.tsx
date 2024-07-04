// 'use client';

// import { NextPage } from 'next';
// import Image from 'next/image';
// import NextLink from 'next/link';
// import { Avatar, Button } from '@nextui-org/react';
// import { useSession } from 'next-auth/react';
// import MapComponent, { fetchShops } from '../Maps/MapComponent';
// import { Facebook, InstagramIcon } from '@/components/icons';

// type ProfileProps = {
//   // Define any props here if needed
// };

// const UserProfileComponent: NextPage<ProfileProps> = async () => {
//   const { data: session, status } = useSession();
//   const shops = await fetchShops();

//   if (!session) {
//     return (
//       <div className="min-h-[68vh] w-full rounded-md bg-white px-4 py-4 dark:bg-black">
//         <div className="flex flex-col items-center gap-4 p-4 md:flex-row md:items-start">
//           <Avatar
//             isBordered
//             src="/images/members/votey.jpg"
//             color="warning"
//             className="mb-2 h-8  w-8"
//           />
//           <div className="text-center text-black dark:text-white md:text-left">
//             <h1 className="text-xl font-bold md:text-2xl">Hom Pheakakvotey</h1>
//             <p className="text-gray-600">User</p>
//           </div>
//         </div>
//         <hr className="border-gray-600 dark:border-gray-700" />
//         <div className="flex flex-col p-4 text-black dark:text-white md:flex-row">
//           <div className="mb-4 flex-1 md:mb-0">
//             <p className="text-lg font-semibold">Profile Information</p>
//             <div className="py-4">
//               <p className="font-semibold">Email Address</p>
//               <p>pheakakvotey@gmail.com</p>
//             </div>
//             <div className="py-4">
//               <p className="font-semibold">Phone Number</p>
//               <p>096xxxxxx</p>
//             </div>
//             <div className="py-4">
//               <p className="font-semibold">Date of Birth</p>
//               <p>31-02-2002</p>
//             </div>
//           </div>
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Social Media</p>
//             <div className="flex gap-2 py-2">
//               <Image
//                 src="/images/icon/icon-facebook-logo.svg"
//                 alt="Facebook Logo"
//                 width={24}
//                 height={24}
//               />
//               <Image
//                 src="/images/icon/icon-instagram-logo.svg"
//                 alt="Instagram Logo"
//                 width={24}
//                 height={24}
//               />
//             </div>
//             <div className="py-4">
//               <p className="font-semibold">Address</p>
//               {/* <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" /> */}

//               {/* <MapComponent shops={shops} /> */}
//               <MapComponent shops={[]} />

//               {/* 11.578891258922914, 104.90175630917895 */}
//             </div>
//             <div className="flex justify-end">
//               <NextLink href="/profile/update-profile">
//                 <Button className="w-[70px] bg-warning text-white hover:opacity-70">
//                   Edit
//                 </Button>
//               </NextLink>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[68vh] w-full rounded-md bg-white px-4 py-4 dark:bg-black">
//       <div className="flex flex-col items-center gap-4 p-4 md:flex-row md:items-start">
//         <Avatar
//           isBordered
//           src={session?.user?.image as string}
//           color="warning"
//           className="mb-2 h-8  w-8"
//         />
//         <div className="text-center text-black dark:text-white md:text-left">
//           <h1 className="text-xl font-bold md:text-2xl">
//             {session?.user?.name}
//           </h1>
//           <p className="text-gray-600">User</p>
//         </div>
//       </div>
//       <hr className="border-gray-600 dark:border-gray-700" />
//       <div className="flex flex-col p-4 text-black dark:text-white md:flex-row">
//         {/* column-1 */}
//         <div className="mb-4 flex-1 md:mb-0">
//           <p className="text-lg font-semibold">Profile Information</p>
//           <div className="py-4">
//             <p className="font-semibold">Email Address</p>
//             <p>{session?.user?.email}</p>
//           </div>
//           <div className="py-4">
//             <p className="font-semibold">Phone Number</p>
//             <p>096xxxxxx</p>
//           </div>
//           <div className="py-4">
//             <p className="font-semibold">Date of Birth</p>
//             <p>31-02-2002</p>
//           </div>
//         </div>
//         {/* column-2 */}
//         <div className="flex-1">
//           <p className="text-lg font-semibold">Social Media</p>
//           <div className="flex gap-2 py-2">
//             <Facebook />
//             <InstagramIcon />
//           </div>
//           <div className="py-4">
//             <p className="font-semibold">Address</p>
//             {/* <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" /> */}

//             <MapComponent shops={[]} />

//             {/* 11.578891258922914, 104.90175630917895 */}
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col p-4 text-black dark:text-white md:flex-row">
//         <div className="flex flex-1 gap-4">
//           <NextLink href="/profile/update-profile">
//             <button className="rounded-lg border-1 border-warning bg-warning px-8 py-2 text-white transition-all ease-in-out hover:bg-white hover:text-warning">
//               Edit
//             </button>
//           </NextLink>
//           <NextLink href="#">
//             <button className="rounded-lg border-1 border-warning bg-warning px-8 py-2 text-white transition-all ease-in-out hover:bg-white hover:text-warning dark:bg-black dark:text-white">
//               Preview
//             </button>
//           </NextLink>
//         </div>
//         <div className="flex flex-1 justify-end">
//           <NextLink href="#">
//             <button className="rounded-lg border-1 border-warning bg-white px-8 py-2 text-warning transition-all ease-in-out hover:bg-warning hover:text-white dark:bg-black dark:text-white">
//               Delete
//             </button>
//           </NextLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileComponent;





"use client"
import { useEffect, useState } from 'react';
import { Link, Button } from '@nextui-org/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useGetProfileQuery } from '@/redux/service/user';
import { LuCamera } from "react-icons/lu";

type ProfileProps = {
    
};

const UserProfileComponent: NextPage<ProfileProps> = () => {
    const [profileImage, setProfileImage] = useState('/images/user/votey.jpg');
    const [sellerData, setSellerData] = useState<any>(null);

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const response = await fetch('{{base-url}}/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch seller data');
                }
                const data = await response.json();
                setSellerData(data);
            } catch (error) {
                console.error('Error fetching seller data:', error);
            }
        };

        fetchSellerData();
    }, []);

    const {
      data: userProfile,
      isLoading: isLoadingUserProfile,
      error,
    } = useGetProfileQuery();


  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    // Implement your logic for uploading the selected image
    if (selectedImage) {
      console.log('Uploading image:', selectedImage);
      // Reset state after upload
      setSelectedImage(null);
      setPreview(null);
    }
  };

    return (
        <div className="">
            <div className=" bg-white dark:bg-zinc-900 p-8 rounded-lg w-full h-[280px] lg:h-96">
                <div className="flex w-full flex-col items-center lg:flex-row">
                    <div
                        className="relative flex h-44 w-full justify-start rounded-lg bg-gray-800 lg:h-64"
                        style={{
                            backgroundImage:
                                'url(https://i.pinimg.com/originals/e1/c4/69/e1c46950a62d9df60fa3f1d60eb90e3a.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute -bottom-5 left-8 flex translate-y-1/2 transform flex-col items-start justify-start lg:bottom-0 lg:flex-row">
                        <label htmlFor="profileImage" className="cursor-pointer">
                            <Image
                              src={preview ?? '/images/user/votey.jpg'}
                              alt="Profile Picture"
                              width={130}
                              height={130}
                              className="rounded-full border-4 border-white"
                            />
                            <input
                              id="profileImage"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                          {preview && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <LuCamera className="h-8 w-8 lg:h-12 lg:w-12 text-white cursor-pointer" onClick={handleUpdateProfile} />
                            </div>
                          )}

                            <h1 className="self-center dark:text-gray-50 text-start text-lg font-semibold mt-3 lg:ml-4 lg:mt-16 lg:text-xl">
                            {userProfile?.payload?.firstName +
                            ' ' +
                            userProfile?.payload?.lastName ?? 'John Doe'}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white dark:bg-zinc-900 rounded-md h-auto w-full p-8">
                <p className="text-2xl font-semibold dark:text-gray-100">Personal Information</p>
                <div className=" text-black dark:text-white flex flex-col md:flex-row">
                    <div className="flex-1 mb-4 md:mb-0">
                        <div className="py-4">
                            <p className="font-semibold text-lg">Email</p>
                            <p className="text-md mt-2">{userProfile?.payload?.email}</p> {/* Replace with actual email from fetched data */}
                        </div>
                        <div className="py-4">
                            <p className="font-semibold text-lg">Phone Number</p>
                            <p className="mt-2 text-md">{userProfile?.payload?.phonenumber}</p> {/* Replace with actual phone number from fetched data */}
                        </div>
                        <div className="py-4">
                            <p className="font-semibold text-lg">Date of Birth</p>
                            <p className="mt-2 text-md">{userProfile?.payload?.dob ?? '1999-11-22'}</p> {/* Replace with actual date of birth from fetched data */}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="py-4">
                            <p className="font-semibold text-lg">Gender</p>
                            <p className="mt-2 text-md">{userProfile?.payload?.gender}</p> {/* Replace with actual gender from fetched data */}
                        </div>
                        <div className="py-4">
                            <p className="font-semibold text-lg">Location</p>
                            <p className="mt-2 text-md">{userProfile?.payload?.location}</p> {/* Replace with actual location from fetched data */}
                        </div>
                        <p className="text-lg font-semibold mb-1">Social Media</p>
                        <div className="flex gap-2 py-2">
                        <Link 
                            href="#"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445">
                            </path>
                            <path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"></path>
                            </svg>  
                        </Link>
                        <Link
                                href="#"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width={256} height={256} fill="url(#skillIconsInstagram0)" rx={60}></rect><rect width={256} height={256} fill="url(#skillIconsInstagram1)" rx={60}></rect><path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"></path><defs><radialGradient id="skillIconsInstagram0" cx={0} cy={0} r={1} gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse"><stop stopColor="#fd5"></stop><stop offset={0.1} stopColor="#fd5"></stop><stop offset={0.5} stopColor="#ff543e"></stop><stop offset={1} stopColor="#c837ab"></stop></radialGradient><radialGradient id="skillIconsInstagram1" cx={0} cy={0} r={1} gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse"><stop stopColor="#3771c8"></stop><stop offset={0.128} stopColor="#3771c8"></stop><stop offset={1} stopColor="#60f" stopOpacity={0}></stop></radialGradient></defs></g></svg>
                        </Link>
                        <Link
                                href="#"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" width="1em" height="1em" viewBox="0 0 256 256"><defs><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#2aabee"></stop><stop offset="100%" stopColor="#229ed9"></stop></linearGradient></defs><path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"></path><path fill="#fff" d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"></path></svg>
                        </Link>
                            
                        </div>
                    </div>
                </div>

                <div className="flex justify-end ">
                    <Link href="/profile/update-profile">
                        <Button
                            color="warning"
                            className="bg-gradient-to-tr text-md from-pink-500 text-white to-yellow-500 rounded-md"
                        >
                            Update
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfileComponent;


