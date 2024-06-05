"use client";

import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from '@nextui-org/react';
import MentorCard from '@/components/card-about/MentorCard';
import MemberCard from '@/components/card-about/MemberCard';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

function AboutPageComponent() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        {/* First section about Deal-KH */}
        <div className="flex flex-col md:flex-row items-center my-8">
          {/* left section text */}
          <div className="text-center md:text-left md:w-1/2 p-4" data-aos="fade-right">
            <p className="text-4xl font-bold"><span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Deal</span>-KH</p>
            <p className="text-lg mt-4">Marketplace facilitates retail by providing a platform for small businesses.</p>
            <Button 
              href="/"
              radius="full" 
              className="mt-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
            >View Product
            </Button>
          </div>
          {/* right section image */}
            <div className="md:w-1/2 p-4">
              <Image  src="/images/about-first.png" alt="About us" width={800} height={900} />
            </div> 
          </div>

        {/* Second section about our story */}
        <div className="flex flex-col md:flex-row-reverse items-center my-8">
          {/* left section image */}
          <div className="md:w-1/2 p-4">
            <Image src="/images/about-second.png" alt="About us" width={800} height={900} />
          </div>
          {/* right section text */}
          <div className="text-center md:text-left md:w-1/2 p-4" data-aos="fade-left">
            <p className="text-4xl font-bold">Our <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Story</span></p>
            <p className="text-lg mt-4">History of Deal-Kh is a testament to its commitment to customer satisfaction, innovation, and ethical business practices. From its humble beginnings to becoming a trusted name in e-commerce, Deal-Kh has consistently focused on enhancing the shopping experience for its customers.</p>
          </div>
        </div>

        {/* Third section about our vision */}
        <div className="flex flex-col md:flex-row items-center my-8">
          {/* left section text */}
          <div className="text-center md:text-left md:w-1/2 p-4" data-aos="fade-right">
            <p className="text-4xl font-bold"><span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Our</span> Vision</p>
            <p className="text-lg mt-4">Our e-commerce platform aims to become a leading global e-commerce platform that revolutionizes the online shopping experience by offering unparalleled convenience, exceptional customer service, and a diverse range of high-quality products.</p>
          </div>
          {/* right section image */}
          <div className="md:w-1/2 p-4">
            <Image src="/images/about-third.png" alt="About us" width={800} height={900} />
          </div>
        </div>

        {/* Fourth section about our mission */}
        <div className="flex flex-col md:flex-row-reverse items-center my-8">
          {/* left section image */}
          <div className="md:w-1/2 p-4">
            <Image src="/images/about-forth.png" alt="About us" width={800} height={900} />
          </div>
          {/* right section text */}
          <div className="text-center md:text-left md:w-1/2 p-4" data-aos="fade-left">
            <p className="text-4xl font-bold">Our <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Mission</span></p>
            <p className="text-lg mt-4">Our mission is to provide exceptional customer satisfaction, continuous innovation, and uphold ethical business practices. From its humble beginnings to becoming a trusted name in e-commerce, Deal-Kh remains committed to enhancing the shopping experience for its customers.</p>
          </div>
        </div>

        {/* Mentors Section */}
        <div className="text-center my-8">
          <p className="text-3xl font-bold">Our <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Mentors</span></p>
          <hr className="mx-auto my-2 w-44 border-0 h-1 bg-gradient-to-r from-pink-500 to-yellow-500" />
        </div>
        <div className="flex justify-center">
          <MentorCard />
        </div>

        {/* Members section */}
        <div className="text-center my-8">
          <p className="text-3xl font-bold">Our <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Members</span></p>
          <hr className="mx-auto my-2 w-48 border-0 h-1 bg-gradient-to-r from-pink-500 to-yellow-500" />
        </div>
        <div className="flex justify-center">
          <MemberCard />
        </div>
      </div>
    </>
  );
}

export default AboutPageComponent;