"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SidebarAdmin = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={50}
            height={50}
            src={"/images/logo/logo.png"}
            alt="Logo"
            priority
          />
        </Link>
        <h1 className="text-orange-500 font-bold">Deal-KH</h1>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link
                  href="/shop"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white text-black duration-300 ease-in-out hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white ${pathname.includes("/shop") &&
                    "bg-orange-500 text-white dark:bg-orange-500 dark:text-white"
                    }`}
                  
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                    fill="currentColor" 
                    d="M8 17q.425 0 .713-.288T9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17m0-4q.425 0 .713-.288T9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13m0-4q.425 0 .713-.288T9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9m4 8h4q.425 0 .713-.288T17 16t-.288-.712T16 15h-4q-.425 0-.712.288T11 16t.288.713T12 17m0-4h4q.425 0 .713-.288T17 12t-.288-.712T16 11h-4q-.425 0-.712.288T11 12t.288.713T12 13m0-4h4q.425 0 .713-.288T17 8t-.288-.712T16 7h-4q-.425 0-.712.288T11 8t.288.713T12 9M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
                    />
                  </svg>
                  Shop
                </Link>
              </li>
              {/* <!-- Menu Item Calendar --> */}
              <li>
                <Link
                  href="/keeper"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white dark:hover:bg-orange-500 text-black hover:bg-orange-500 hover:text-white duration-300 ease-in-out  ${pathname.includes("/keeper") && "bg-orange-500 text-white"
                    }`}
                > 
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      fill="currentColor" 
                      d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"
                    />
                  </svg>
                  Keeper
                </Link>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}
              <li>
                <Link
                  href="/category"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white dark:hover:bg-orange-500 text-black hover:bg-orange-500 hover:text-white duration-300 ease-in-out  ${pathname.includes("/category") && "bg-orange-500 text-white"
                    }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      fill="currentColor" 
                      d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"
                    />
                  </svg>
                  Category
                </Link>
              </li>

              <li>
                <Link
                  href="/promotion"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white dark:hover:bg-orange-500 text-black hover:bg-orange-500 hover:text-white duration-300 ease-in-out  ${pathname.includes("/promotion") && "bg-orange-500 text-white"
                    }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="32" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      fill="currentColor" 
                      d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zm3-6q-.425 0-.712-.288T7 13t.288-.712T8 12h8q.425 0 .713.288T17 13t-.288.713T16 14zm0 4q-.425 0-.712-.288T7 17t.288-.712T8 16h5q.425 0 .713.288T14 17t-.288.713T13 18z"
                    />
                  </svg>
                  Promotion
                </Link>
              </li>

              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out dark:text-white dark:hover:bg-orange-500 hover:text-white hover:bg-orange-500 ${pathname.includes("/profile") &&
                    "bg-orange-500 text-white"
                    }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      fill="currentColor" 
                      d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                    />
                  </svg>
                  Profile
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>

            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              {/*  */}
              <li>
                <Link
                  href="/auth/signup"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium dark:text-white dark:hover:bg-orange-500 text-black duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${pathname.includes("/auth/signup") &&
                    "bg-orange-500 text-white"
                    }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      fill="currentColor" 
                      d="M12.48 20q-.213 0-.356-.143t-.143-.357t.143-.357t.357-.143h5.904q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-5.903q-.214 0-.357-.143t-.143-.357t.143-.357t.357-.143h5.904q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm.407-7.5H4.5q-.213 0-.357-.143T4 12t.143-.357t.357-.143h8.387l-1.972-1.971q-.14-.14-.15-.338q-.01-.199.15-.364t.354-.168t.36.162l2.613 2.613q.242.243.242.566t-.242.566l-2.613 2.613q-.146.146-.347.153t-.367-.159q-.16-.165-.156-.357q.003-.191.162-.35z"
                    />
                  </svg>
                  Log Out
                </Link>
              </li>
              {/*  */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default SidebarAdmin;
