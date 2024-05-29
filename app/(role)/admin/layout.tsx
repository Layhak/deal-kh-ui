import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dashboard Admin Page',
	description: 'Dashboard Admin Page',
};
  
export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={inter.className}>
			<body>
				<main>
                    {children}
                </main>
			</body>
		</html>
	);
}
