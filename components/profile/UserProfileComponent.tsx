'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { Avatar, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import MapComponent, { fetchShops } from '../Maps/MapComponent';
import { Facebook, InstagramIcon } from '@/components/icons';

type ProfileProps = {
  // Define any props here if needed
};

const UserProfileComponent: NextPage<ProfileProps> = async () => {
  const { data: session, status } = useSession();
  const shops = await fetchShops();

  if (!session) {
    return (
      <div className="min-h-[68vh] w-full rounded-md bg-white px-4 py-4 dark:bg-black">
        <div className="flex flex-col items-center gap-4 p-4 md:flex-row md:items-start">
          <Avatar
            isBordered
            src="/images/members/votey.jpg"
            color="warning"
            className="mb-2 h-8  w-8"
          />
          <div className="text-center text-black dark:text-white md:text-left">
            <h1 className="text-xl font-bold md:text-2xl">Hom Pheakakvotey</h1>
            <p className="text-gray-600">User</p>
          </div>
        </div>
        <hr className="border-gray-600 dark:border-gray-700" />
        <div className="flex flex-col p-4 text-black dark:text-white md:flex-row">
          <div className="mb-4 flex-1 md:mb-0">
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

              {/* <MapComponent shops={shops} /> */}
              <MapComponent shops={[]} />

              {/* 11.578891258922914, 104.90175630917895 */}
            </div>
            <div className="flex justify-end">
              <NextLink href="/profile/update-profile">
                <Button className="w-[70px] bg-warning text-white hover:opacity-70">
                  Edit
                </Button>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[68vh] w-full rounded-md bg-white px-4 py-4 dark:bg-black">
      <div className="flex flex-col items-center gap-4 p-4 md:flex-row md:items-start">
        <Avatar
          isBordered
          src={session?.user?.image as string}
          color="warning"
          className="mb-2 h-8  w-8"
        />
        <div className="text-center text-black dark:text-white md:text-left">
          <h1 className="text-xl font-bold md:text-2xl">
            {session?.user?.name}
          </h1>
          <p className="text-gray-600">User</p>
        </div>
      </div>
      <hr className="border-gray-600 dark:border-gray-700" />
      <div className="flex flex-col p-4 text-black dark:text-white md:flex-row">
        {/* column-1 */}
        <div className="mb-4 flex-1 md:mb-0">
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
            <Facebook />
            <InstagramIcon />
          </div>
          <div className="py-4">
            <p className="font-semibold">Address</p>
            {/* <MapUser location={{ lat: 11.578891258922914, lng: 104.90175630917895 }} width="500px" height="300px" apiKey="AIzaSyBeZtJHgPb_uA_3Fsr9xtAgf31nhAc4LNI" /> */}

            <MapComponent shops={[]} />

            {/* 11.578891258922914, 104.90175630917895 */}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 text-black dark:text-white md:flex-row">
        <div className="flex flex-1 gap-4">
          <NextLink href="/profile/update-profile">
            <button className="rounded-lg border-1 border-warning bg-warning px-8 py-2 text-white transition-all ease-in-out hover:bg-white hover:text-warning">
              Edit
            </button>
          </NextLink>
          <NextLink href="#">
            <button className="rounded-lg border-1 border-warning bg-warning px-8 py-2 text-white transition-all ease-in-out hover:bg-white hover:text-warning dark:bg-black dark:text-white">
              Preview
            </button>
          </NextLink>
        </div>
        <div className="flex flex-1 justify-end">
          <NextLink href="#">
            <button className="rounded-lg border-1 border-warning bg-white px-8 py-2 text-warning transition-all ease-in-out hover:bg-warning hover:text-white dark:bg-black dark:text-white">
              Delete
            </button>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
