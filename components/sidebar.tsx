"use client";

import { FC, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  ClipboardListIcon as ListIcon,
  ChartBarIcon as ReportIcon,
  TagIcon as CategoryIcon,
  UserGroupIcon as BuyerIcon,
  TicketIcon as AdsIcon,
  UserCircleIcon as ProfileIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { LeftArrowIcon, RightArrowIcon } from '@/components/icons';

interface MenuItem {
  name: string;
  icon: FC<{ className: string }>;
  link: string;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: HomeIcon, link: '/admin/dashboard' },
  { name: 'Shop List', icon: ListIcon, link: '/admin/shop-list' },
  { name: 'Report', icon: ReportIcon, link: '/admin/report' },
  { name: 'Category', icon: CategoryIcon, link: '/admin/category' },
  { name: 'Manage Buyer', icon: BuyerIcon, link: '/admin/manage-buyer' },
  { name: 'Manage Ads and Coupon', icon: AdsIcon, link: '/admin/manage-ads' },
  { name: 'Profile', icon: ProfileIcon, link: '/admin/profile' },
];

const Sidebar: FC = () => {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState('Shop List');
  const router = useRouter();

  const toggleSidebar = useCallback(() => {
    setVisible((prevVisible) => !prevVisible);
  }, []);

  const handleItemClick = useCallback((link: string, name: string) => {
    setActive(name);
    router.push(link);
  }, [router]);

  return (
    <div className="flex bg-gray-200">
      <div className={`flex flex-col h-screen bg-white border-r transition-transform duration-300 ${visible ? 'transform translate-x-0 w-64' : 'transform -translate-x-full w-0'}`}>
        <div className="flex items-center justify-between h-16 border-b px-4">
          <h1 className="text-xl font-bold">Deal-KH</h1>
          <button onClick={toggleSidebar} className="p-2 focus:outline-none">
            {visible ? <LeftArrowIcon className="w-6 h-6" /> : <RightArrowIcon className="w-6 h-6" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="mx-2 my-2 py-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center px-4 py-2 w-full text-left gap-2 ${
                  active === item.name
                    ? 'bg-orange-500 text-white rounded-lg'
                    : 'text-gray-700 hover:bg-gray-200 rounded-lg'
                }`}
                onClick={() => handleItemClick(item.link, item.name)}
              >
                <item.icon className="w-6 h-6 mr-3" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t">
          <button className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-200">
            <LogoutIcon className="w-6 h-6 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
