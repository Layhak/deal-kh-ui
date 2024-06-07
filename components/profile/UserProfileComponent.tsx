'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import MapUser from '@/components/Maps/MapUser';
import { Avatar, Button } from '@nextui-org/react';
import { signOut, signIn, useSession } from 'next-auth/react';


type ProfileProps = {
    // Define any props here if needed
};

const UserProfileComponent: NextPage<ProfileProps> = () => {
    const { data: session, status } = useSession();

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
                            <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" />
                            {/* <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" /> */}
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
                        <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" />
                        {/* <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" /> */}
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
    );
}



export default UserProfileComponent;
