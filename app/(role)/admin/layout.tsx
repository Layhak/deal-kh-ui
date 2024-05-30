"use client"

import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { useState } from 'react';
import Header from '@/components/header'
import { LeftArrowIcon, RightArrowIcon } from "@/components/icons";
import { NavigationBar } from "@/components/navigationBar";

const inter = Inter({ subsets: ['latin'] });

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

					<Sidebar />

					<div className="flex flex-col flex-1">

						<div className="flex items-center justify-between p-4 bg-gray-100 border-b">


							<Header />


						</div>
						<div className="flex-1 overflow-y-auto ">
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
