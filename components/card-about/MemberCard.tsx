'use client';
import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa';
import { MemberList } from './memberList';

type Members = {
  img: string;
  name: string;
  role: string;
};

export default function MemberCard() {
  const [mentors, setMentors] = useState<Members[]>(MemberList);

  return (
    <div className="flex flex-wrap justify-center gap-[26.6px] my-8 ">
      {mentors.map((item, index) => (
        <div
          key={index}
          className="max-w-sm w-72 overflow-hidden rounded-2xl border-solid border-2 border-gray-200 p-8 flex flex-col items-center"
        >
          <img
            className="h-auto w-auto rounded-full"
            src={item.img}
            alt={item.name}
          />
          <div className="px-6 py-4 text-center">
            <div className="mb-2 text-[18px] font-bold">
              {item.name}
            </div>
            <div className="mb-2 text-base"> 
              {item.role}
            </div>
          </div>
          <div className="flex justify-around w-full px-6 py-4">
            <div className="flex flex-col justify-center">
              <div className="mx-auto max-w-7xl">
                <div className="st-current group relative flex items-center gap-1.5 overflow-hidden rounded-full p-[1px] font-semibold text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)]"></span>
                  <div className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-background mx-[0.5px] my-[0.5px] text-sm font-medium text-foreground backdrop-blur-3xl transition-background group-hover:bg-background/70">
                    <FaFacebookF />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mx-auto max-w-7xl">
                <div className="st-current group relative flex items-center gap-1.5 overflow-hidden rounded-full p-[1px] font-semibold text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)]"></span>
                  <div className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-background mx-[0.5px] my-[0.5px] text-sm font-medium text-foreground backdrop-blur-3xl transition-background group-hover:bg-background/70">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mx-auto max-w-7xl">
                <div className="st-current group relative flex items-center gap-1.5 overflow-hidden rounded-full p-[1px] font-semibold text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)]"></span>
                  <div className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-background mx-[0.5px] my-[0.5px] text-sm font-medium text-foreground backdrop-blur-3xl transition-background group-hover:bg-background/70">
                    <FaGoogle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

