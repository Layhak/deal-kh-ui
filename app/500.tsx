import { Metadata } from 'next';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

export const metadata: Metadata = {
    title: '500 Internal Error ',
    description: 'This is a Error Page 500',
    openGraph: {
        images: [
            {
                url: '/logo.png',
                alt: "DealKH Logo Ecommerce Website",
            },
        ],
    },
};

export default function InternalErrorPage() {
    return (

        <>
            <main className="h-[100vh] w-[100vw] flex flex-col items-center justify-center text-center p-4 bg-gray-100">
                <Image
                    src="/Error500.png"
                    alt="Error500"
                    width={400}
                    height={350}
                    className="mb-4 animate-fadeIn"
                />
                <h1 className="text-2xl font-bold mb-2 text-center text-orange-500 animate-slideUp">500 Internal Error</h1>
                <p className="text-lg text-black animate-slideUp">Whoops! That page doesn't exist.</p>
            </main>

        </>

    );
}