'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { Avatar, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import MapComponent from '../Maps/MapComponent';
import { fetchShops } from '@/app/api/get-map/route';

type ProfileProps = {
    // Define any props here if needed
};

const UserProfileComponent: NextPage<ProfileProps> = async () => {
    const { data: session, status } = useSession();
    const shops = await fetchShops();

    if (!session) {
        return (
            <div className="bg-white dark:bg-black rounded-md min-h-[68vh] w-full px-4 py-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
                    <Avatar
                        isBordered
                        src="/images/members/votey.jpg"
                        color="warning"
                        className="w-8 h-8  mb-2"
                    />
                    <div className="text-black dark:text-white text-center md:text-left">
                        <h1 className="font-bold text-xl md:text-2xl">Hom Pheakakvotey</h1>
                        <p className="text-gray-600">User</p>
                    </div>
                </div>
                <hr className="border-gray-600 dark:border-gray-700" />
                <div className="p-4 text-black dark:text-white flex flex-col md:flex-row">
                    <div className="flex-1 mb-4 md:mb-0">
                        <p className="text-lg font-semibold">Profile Information</p>
                        <div className="py-4">
                            <p className="font-semibold">Email Address</p>
                            <p>pheakakvotey@gmail.com</p>
                        </div>
                        <div className="py-4">
                            <p className="font-semibold">Phone Number</p>
                            <p>096xxxxxx</p>
                        </div>
                        <div className="py-4">
                            <p className="font-semibold">Date of Birth</p>
                            <p>31-02-2002</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-lg font-semibold">Social Media</p>
                        <div className="flex gap-2 py-2">
                            <Image
                                src="/images/icon/icon-facebook-logo.svg"
                                alt="Facebook Logo"
                                width={24}
                                height={24}
                            />
                            <Image
                                src="/images/icon/icon-instagram-logo.svg"
                                alt="Instagram Logo"
                                width={24}
                                height={24}
                            />
                        </div>
                        <div className="py-4">
                            <p className="font-semibold">Address</p>
                            {/* <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" /> */}


                            <MapComponent shops={shops} />


                            {/* 11.578891258922914, 104.90175630917895 */}
                        </div>
                        <div className="flex justify-end">
                            <NextLink
                                href="/profile/update-profile"
                            >
                                <Button
                                    className="bg-orange-500 w-[70px] hover:opacity-70 text-white"
                                >Edit</Button>
                            </NextLink>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-black rounded-md min-h-[68vh] w-full px-4 py-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
                <Avatar
                    isBordered
                    src={session?.user?.image as string}
                    color="warning"
                    className="w-8 h-8  mb-2"
                />
                <div className="text-black dark:text-white text-center md:text-left">
                    <h1 className="font-bold text-xl md:text-2xl">{session?.user?.name}</h1>
                    <p className="text-gray-600">User</p>
                </div>
            </div>
            <hr className="border-gray-600 dark:border-gray-700" />
            <div className="p-4 text-black dark:text-white flex flex-col md:flex-row">
                {/* column-1 */}
                <div className="flex-1 mb-4 md:mb-0">
                    <p className="text-lg font-semibold">Profile Information</p>
                    <div className="py-4">
                        <p className="font-semibold">Email Address</p>
                        <p>{session?.user?.email}</p>
                    </div>
                    <div className="py-4">
                        <p className="font-semibold">Phone Number</p>
                        <p>096xxxxxx</p>
                    </div>
                    <div className="py-4">
                        <p className="font-semibold">Date of Birth</p>
                        <p>31-02-2002</p>
                    </div>
                </div>
                {/* column-2 */}
                <div className="flex-1">
                    <p className="text-lg font-semibold">Social Media</p>
                    <div className="flex gap-2 py-2">
                        <Image
                            src="/images/icon/icon-facebook-logo.svg"
                            alt="Facebook Logo"
                            width={24}
                            height={24}
                        />
                        <Image
                            src="/images/icon/icon-instagram-logo.svg"
                            alt="Instagram Logo"
                            width={24}
                            height={24}
                        />
                    </div>
                    <div className="py-4">
                        <p className="font-semibold">Address</p>
                        {/* <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" /> */}

                        {/* <MapComponent shops={shops} /> */}

                        {/* 11.578891258922914, 104.90175630917895 */}
                    </div>
                </div>
            </div>
            <div className="p-4 text-black dark:text-white flex flex-col md:flex-row">
                <div className="flex gap-4 flex-1">
                    <NextLink href="/profile/update-profile">
                        <Button className="text-white bg-orange-500 border-orange-500 border-1">Edit</Button>
                    </NextLink>
                    <NextLink href="#">
                        <Button className="w-[75px] text-orange-500 bg-white border-orange-500 border-1 dark:bg-black dark:text-white">Preview</Button>
                    </NextLink>
                </div>
                <div className="flex justify-end flex-1">
                    <NextLink href="#">
                        <Button className="border-1 border-orange-500 text-orange-500 bg-white dark:bg-black dark:text-white ">Delete</Button>
                    </NextLink>
                </div>
            </div>
        </div>
    );
}



export default UserProfileComponent;
