import React from 'react'
import styles from './style.module.css'
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import MentorCard from '@/components/card-about/MentorCard';
import MemberCard from '@/components/card-about/MemberCard';

export default function Page() {
  return (
    <div>
      {/* First section about Deal-KH */}
      <div className={styles.container}>
        {/* left section text */}
        <div className={styles.content}>
            <p className={styles.title}><span className={styles.gradientText}>Deal</span>-KH</p>
            <p className={styles.subtext}>Marketplace facilitates  retail by providing a platform for small businesses.</p>
            <Button radius='full' className={styles.gradientButton}>
              View Product
            </Button>
            

        </div>
        {/* right section image */}
        {/* <div className={styles.image}>
          <Image src="/images/about-first.png" alt="About us" width={800} height={900} />
        </div> */}
      </div>

      {/* Second section about our story */}
      <div className={styles.container}>
        {/* left section text */}
        {/* <div className={styles.image}>
          <Image src="/images/about-second.png" alt="About us" width={800} height={900} />
        </div> */}
        {/* right section image */}
        <div className={styles.content}>
            <p className={styles.title}>Our <span className={styles.gradientText}>Story</span></p>
            <p className={styles.subtext}>
              history of Deal-Kh is a testament to its commitment to customer satisfaction, innovation, and ethical business practices. 
              From its humble beginnings to becoming a trusted name in e-commerce, 
              Deal-Kh has consistently focused on enhancing the shopping experience for its customers.
            </p>
        </div>
      </div>

      {/* Third section about our vision */}
      <div className={styles.container}>
        {/* left section text */}
        <div className={styles.content}>
            <p className={styles.title}><span className={styles.gradientText}>Our</span> Vision</p>
            <p className={styles.subtext}>Our e-commerce become a leading global e-commerce platform that 
            revolutionizes the online shopping experience by offering unparalleled convenience, 
            exceptional customer service, and a diverse range of high-quality products.
            </p>
        </div>
        {/* right section image */}
        {/* <div className={styles.image}>
          <Image src="/images/about-third.png" alt="About us" width={800} height={900} />
        </div> */}
      </div>

      {/* Forth section about our mission */}
      <div className={styles.container}>
        {/* left section text */}
        {/* <div className={styles.image}>
          <Image src="/images/about-forth.png" alt="About us" width={800} height={900} />
        </div> */}
        {/* right section image */}
        <div className={styles.content}>
            <p className={styles.title}>Our <span className={styles.gradientText}>Mission</span></p>
            <p className={styles.subtext}>
              history of Deal-Kh is a testament to its commitment to customer satisfaction, innovation, and ethical business practices. 
              From its humble beginnings to becoming a trusted name in e-commerce, 
              Deal-Kh has consistently focused on enhancing the shopping experience for its customers.
            </p>
        </div>
      </div>

      {/* Mentors Section */}
      <div className="text-center">
        <p className="text-center text-3xl font-bold">Our <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Mentors</span></p>
        <hr className="mx-auto my-2 w-44 border-0 h-1 bg-gradient-to-r from-pink-500 to-yellow-500" />
      </div>
      <div>
        <MentorCard/>
      </div>

      {/* Members section */}
      <div className="text-center">
        <p className="text-center text-3xl font-bold">Our <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Members</span></p>
        <hr className="mx-auto my-2 w-48 border-0 h-1 bg-gradient-to-r from-pink-500 to-yellow-500" />
      </div>
      <div>
        <MemberCard/>
      </div>
    </div>
  )
}
