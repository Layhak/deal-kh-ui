import { NextPage } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import Map from '@/components/Maps/MapAdmin';
import { Button } from '@nextui-org/react';

type ProfileProps = {
    // Define any props here if needed
};

const AdminProfilePage: NextPage<ProfileProps> = () => {
    return (
        <div className="bg-white dark:bg-black rounded-md min-h-[68vh] w-full px-4 py-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
                <Image
                    src="/images/user/votey.jpg"
                    alt="Admin Profile"
                    width={60}
                    height={60}
                    className="rounded-full"
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
                        <p>Pheakakvotey@gmail.com</p>
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
                        <Map src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096193!2d144.95592831550418!3d-37.817209742021596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43a1b5fdfb%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1627489121071!5m2!1sen!2su'} />
                    </div>
                    <div className="flex justify-end">
                        <NextLink 
                            href="/updateprofile"
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

export default AdminProfilePage;
