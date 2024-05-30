"use client"

import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { useState } from 'react';
import Header from '@/components/header'
import { LeftArrow, RightArrow } from "@/components/icons";
import AdminSidebar from "@/components/sidebar2";


const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
// 	title: 'Dashboard Admin Page',
// 	description: 'Dashboard Admin Page',
// };




export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [sidebarVisible, setSidebarVisible] = useState(true);
	return (
		<html className={inter.className}>
			<header>
			</header>
			<body>

				<div className="flex h-screen">

					{/* <Sidebar visible={sidebarVisible} />
					<button
						className="p-2 text-orange-500 rounded"
						onClick={() => setSidebarVisible(!sidebarVisible)}
					>
						{sidebarVisible ? <LeftArrow /> : <RightArrow />}
					</button> */}
					
					<div className="flex flex-col flex-1">

						<div className="flex items-center justify-between bg-gray-100 p-4 border-b">


							{/* <Header /> */}



						</div>
						<div className="p-4">
							<AdminSidebar />
							{children}
						</div>
					</div>
				</div>
			</body>
			<footer>

			</footer>
		</html>
	);
}
