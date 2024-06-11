"use client"
import { Link } from '@nextui-org/react';
import React, { useState } from 'react';
import { MenuList } from "./menu";

    type MenuItem = {
        name: string;
        path: string;
        icon: React.ElementType;
    };

export default function SidebarSellerComponent() {
    const [menuList] = useState<MenuItem[]>(MenuList);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="w-[230px] z-40 bg-white">
           <div className="flex h-screen flex-col justify-between ">
            <div className="px-4 py-6">
                <div className="flex justify-start items-center">
                    <img src="/images/logo/logo.png" alt="Logo" className="w-16 h-16" />
                    <span className="grid h-10 w-32 place-content-center rounded-lg text-2xl font-bold text-slate-700">
                    Deal-KH
                    </span>
                </div>
                <ul className="mt-8">
                        {menuList.map((item, index) => (
                            <li 
                                key={index} 
                                className={`flex pl-2 rounded-md mb-4 ${activeIndex === index ? 'bg-amber-500 text-slate-50' : 'hover:bg-amber-500 hover:text-slate-50 duration-00 ease-in-out'}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <Link href={item.path} className={`text-slate-700 ${activeIndex === index ? 'text-slate-50' : 'hover:text-slate-50'}`}>
                                    <item.icon className="top-5 w-6 h-6" />
                                    <span className="block rounded-lg px-4 py-2 text-base font-medium">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                </ul>

            </div>
           </div>
        </div>
    );
}






// "use client"

// import { AiOutlineShop ,AiOutlineFileProtect} from "react-icons/ai";
// import { FaRegUser } from "react-icons/fa";
// import { LuUserSquare2 } from "react-icons/lu";
// import { GrAnnounce } from "react-icons/gr";
// import { IoIosLogOut } from "react-icons/io";

// export default function SidebarSellerComponent() {
//     return(
//        <div>
//            <div className="flex h-screen w-16 flex-col justify-between bg-white">
//             <div>
//                 <div className="inline-flex size-16 items-center justify-center">
//                 <span className="grid size-14 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
//                    <img src="/images/logo/logo.png" alt="Logo" className="w-35 h-14" />
//                 </span>
//                 </div>

//                 <div className=" border-gray-100">
//                 <div className="px-2">
//                     <ul className="space-y-1 border-gray-100 pt-4">
//                     <li>
//                         <a
//                         href="#"
//                         className="group mb-3 relative flex justify-center rounded px-2 py-1.5 text-slate-50 bg-orange-400 hover:text-gray-700"
//                         >
//                          <AiOutlineShop className="w-12 h-7 "/>
//                         <span
//                             className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
//                         >
//                             Shop
//                         </span>
//                         </a>
//                     </li>

//                     <li>
//                         <a
//                         href="#"
//                         className="group mb-3  relative flex justify-center rounded px-2 py-1.5 text-black hover:bg-gray-50 hover:text-gray-700"
//                         >
//                             <LuUserSquare2 className="w-20 h-8 "/>
//                         <span
//                             className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
//                         >
//                             Seller
//                         </span>
//                         </a>
//                     </li>

//                     <li>
//                         <a
//                         href="#"
//                         className="group mb-3 relative flex justify-center rounded px-2 py-1.5 text-black hover:bg-gray-50 hover:text-gray-700"
//                         >
//                             <AiOutlineFileProtect className="w-20 h-8 "/>
//                         <span
//                             className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
//                         >
//                             Product 
//                         </span>
//                         </a>
//                     </li>

//                     <li>
//                         <a
//                         href="#"
//                         className="group mb-3 relative flex justify-center rounded px-2 py-1.5 text-black  hover:bg-gray-50 hover:text-gray-700"
//                         >
//                          <GrAnnounce className="w-20 h-8 "/>
//                         <span
//                             className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
//                         >
//                             Marketing
//                         </span>
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                         href="#"
//                         className="group mb-3 relative flex justify-center rounded px-2 py-1.5 text-black hover:bg-gray-50 hover:text-gray-700"
//                         >
//                         <FaRegUser className="w-18 h-7 "/>
//                         <span
//                             className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
//                         >
//                             Profile
//                         </span>
//                         </a>
//                     </li>
//                     </ul>
//                 </div>
//                 </div>
//             </div>

//             <div className="sticky inset-x-0 bottom-0 border-gray-100 bg-white p-2">
//                 <form action="#">
//                 <button
//                     type="submit"
//                     className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-black hover:bg-gray-50 hover:text-gray-700"
//                 >
//                     <IoIosLogOut  className="w-18 h-7 "/>
//                     <span
//                     className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
//                     >
//                     Logout
//                     </span>
//                 </button>
//                 </form>
//             </div>
//             </div>
//        </div>
//     );
// }
