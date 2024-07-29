'use client';
import React, { useState } from 'react';
import { MentorList } from './mentorList';
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa';
import { Button, Image } from '@nextui-org/react';
import NextLink from 'next/link';

type MentorList = {
  img: string;
  name: string;
};

export default function MentorCard() {
  const [mentors, setMentors] = useState<MentorList[]>(MentorList);

  return (
    <div className="my-8 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3">
      {mentors.map((item, index) => (
        <div
          key={index}
          className="w-72 max-w-sm overflow-hidden rounded-xl  p-8 "
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute inset-[-0.35%] animate-[spin_3s_linear_infinite] rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#EAB308_50%,#EC4899_100%)] p-[1px] blur-sm"></span>
            <div className="relative rounded-full bg-foreground-50 p-1">
              <Image
                radius={'full'}
                src={item.img}
                alt={item.name}
                className="h-[210px] w-[210px]"
              />
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="mb-2 text-center text-xl font-bold">
              {item.name}
            </div>
          </div>
          <div className="flex w-full justify-around gap-3 px-6 py-4">
            <Button
              as={NextLink}
              href={'#'}
              className=" group relative overflow-hidden bg-transparent text-small font-normal"
              color="default"
              style={{
                border: 'solid 2px transparent',
                backgroundImage: `linear-gradient(hsl(var(--nextui-foreground-100)), hsl(var(--nextui-foreground-100))), linear-gradient(to right, #f92386, #eaad20)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
              size={'lg'}
              radius={'full'}
              variant="bordered"
              isIconOnly
            >
              <FaFacebookF />
            </Button>{' '}
            <Button
              as={NextLink}
              href={'#'}
              className="group relative  overflow-hidden bg-transparent text-small font-normal"
              color="default"
              style={{
                border: 'solid 2px transparent',
                backgroundImage: `linear-gradient(hsl(var(--nextui-foreground-100)), hsl(var(--nextui-foreground-100))), linear-gradient(to right, #f92386, #eaad20)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
              size={'lg'}
              radius={'full'}
              variant="bordered"
              isIconOnly
            >
              <FaInstagram />
            </Button>
            <Button
              as={NextLink}
              href={'#'}
              className="group relative  overflow-hidden bg-transparent text-small font-normal"
              color="default"
              style={{
                border: 'solid 2px transparent',
                backgroundImage: `linear-gradient(hsl(var(--nextui-foreground-100)), hsl(var(--nextui-foreground-100))), linear-gradient(to right, #f92386, #eaad20)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
              size={'lg'}
              radius={'full'}
              variant="bordered"
              isIconOnly
            >
              <FaGoogle />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
