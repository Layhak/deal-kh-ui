import { Metadata } from 'next';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

export const metadata: Metadata = {
    title: '404 Not Found ',
    description: 'This is a Error Page 404',
    openGraph: {
        images: [
            {
                url: '/logo.png',
                alt: "DealKH Logo Ecommerce Website",
            },
        ],
    },
};

export default function NotFoundPage() {
    return (

        <>
            <main className="h-[100vh] w-[100vw] flex flex-col items-center justify-center text-center p-4 bg-gray-100">
                <Image
                    src="/Error404.png"
                    alt="Error404"
                    width={400}
                    height={350}
                    className="mb-4 animate-fadeIn"
                />
                <h1 className="text-2xl font-bold mb-2 text-center text-orange-500 animate-slideUp">404 Not Found</h1>
                <p className="text-lg text-black animate-slideUp">Whoops! That page doesn't exist.</p>
            </main>

        </>

    );
}