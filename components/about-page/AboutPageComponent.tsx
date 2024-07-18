'use client';

import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Inter } from 'next/font/google';
import { Button, Image } from '@nextui-org/react';
import MentorCard from '@/components/card/card-about/MentorCard';
import MemberCard from '@/components/card/card-about/MemberCard';
import NextLink from 'next/link';

const inter = Inter({ subsets: ['latin'] });

function AboutPageComponent() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* First section about Deal-KH */}
      <div className="my-2 flex flex-col items-center md:flex-row">
        <div className="text-center md:w-1/2 md:text-left" data-aos="fade-up">
          <p className="text-4xl font-bold">
            <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Deal
            </span>
            -KH
          </p>
          <p className="mt-4 text-lg">
            Easy to use online platform where we connects businesses and
            customers. Businesses can showcase their services or products. While
            customers can discover great deals and discounts or even add their
            favorite item to cart and wishlist all in one place.
          </p>
          <NextLink href="/">
            <Button
              radius="full"
              className="mt-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
            >
              View Product
            </Button>
          </NextLink>
        </div>
        {/* right section image */}
        <div className="md:w-1/2">
          <Image
            src="/images/online.svg"
            alt="About us"
            width={800}
            height={900}
          />
        </div>
      </div>

      {/* Second section about our story */}
      <div className="my-2 flex flex-col items-center md:flex-row-reverse">
        <div className="text-center md:w-1/2 md:text-left" data-aos="fade-up">
          <p className="text-4xl font-bold">
            Our{' '}
            <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Story
            </span>
          </p>
          <p className="mt-4 text-lg">
            History of Deal-Kh is a testament to its commitment to customer
            satisfaction, innovation, and ethical business practices. From its
            humble beginnings to becoming a trusted name in e-commerce, Deal-Kh
            has consistently focused on enhancing the shopping experience for
            its customers.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/story.svg"
            alt="About us"
            width={800}
            height={900}
          />
        </div>
      </div>

      {/* Third section about our vision */}
      <div className="my-2 flex flex-col items-center md:flex-row">
        {/* left section text */}
        <div className="text-center md:w-1/2 md:text-left" data-aos="fade-up">
          <p className="text-4xl font-bold">
            <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Our
            </span>{' '}
            Vision
          </p>
          <p className="mt-4 text-lg">
            Our e-commerce platform aims to become a leading global e-commerce
            platform that revolutionizes the online shopping experience by
            offering unparalleled convenience, exceptional customer service, and
            a diverse range of high-quality products.
          </p>
        </div>
        {/* right section image */}
        <div className="md:w-1/2">
          <Image
            src="/images/vision.svg"
            alt="About us"
            width={800}
            height={900}
          />
        </div>
      </div>

      {/* Fourth section about our mission */}
      <div className="my-2 flex flex-col items-center md:flex-row-reverse">
        {/* left section image */}
        {/* right section text */}
        <div className="text-center md:w-1/2 md:text-left" data-aos="fade-up">
          <p className="text-4xl font-bold">
            Our{' '}
            <span className="text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Mission
            </span>
          </p>
          <p className="mt-4 text-lg">
            Our mission is to provide exceptional customer satisfaction,
            continuous innovation, and uphold ethical business practices. From
            its humble beginnings to becoming a trusted name in e-commerce,
            Deal-Kh remains committed to enhancing the shopping experience for
            its customers.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/mission.svg"
            alt="About us"
            width={800}
            height={900}
          />
        </div>
      </div>

      {/* Mentors Section */}
      <div className="my-2 text-center">
        <p className="text-3xl font-bold" data-aos="fade-up">
          Our{' '}
          <span
            className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            Mentors
          </span>
        </p>
        <hr
          className="mx-auto my-2 h-1 w-44 border-0 bg-gradient-to-r from-pink-500 to-yellow-500"
          data-aos="fade-up"
        />
      </div>
      <div className="flex justify-center" data-aos="fade-up">
        <MentorCard />
      </div>

      {/* Members section */}
      <div className="mt-8 text-center">
        <p className="text-3xl font-bold" data-aos="fade-up">
          Our{' '}
          <span
            className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
            data-aos="fade-up"
          >
            Members
          </span>
        </p>
        <hr
          className="mx-auto my-2 h-1 w-48 border-0 bg-gradient-to-r from-pink-500 to-yellow-500"
          data-aos="fade-up"
        />
      </div>
      <div className="flex justify-center" data-aos="fade-up">
        <MemberCard />
      </div>
    </>
  );
}

export default AboutPageComponent;
