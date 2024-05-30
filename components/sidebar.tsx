import { FC, useState } from 'react';
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

interface MenuItem {
  name: string;
  icon: FC<{ className: string }>;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: HomeIcon },
  { name: 'Shop List', icon: ListIcon },
  { name: 'Report', icon: ReportIcon },
  { name: 'Category', icon: CategoryIcon },
  { name: 'Manage Buyer', icon: BuyerIcon },
  { name: 'Manage Ads and Coupon', icon: AdsIcon },
  { name: 'Profile', icon: ProfileIcon },
];

interface SidebarProps {
  visible: boolean;
}

const Sidebar: FC<SidebarProps> = ({ visible }) => {
  const [active, setActive] = useState('Shop List');

  return (
    <div className={`flex flex-col h-screen w-75 bg-white border-r transition-transform duration-300 ${visible ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold">Deal-KH</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-10">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center px-4 py-2 w-full text-left ${
                active === item.name
                  ? 'bg-orange-500 text-white ml-2 mr-2 rounded-lg'
                  : 'text-gray-700 hover:bg-gray-200 ml-2 mr-2 rounded-lg'
              }`}
              onClick={() => setActive(item.name)}
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
  );
};

export default Sidebar;
