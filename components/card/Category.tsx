import 'swiper/css';
import Marquee from 'react-fast-marquee';
import { Image } from '@nextui-org/react';
import { useGetCategoryQuery } from '@/redux/service/category';
import '@/styles/maquee.css';

export default function Category() {
  const { data, isLoading, error } = useGetCategoryQuery();
  return (
    <Marquee pauseOnHover>
      <div className={'flex gap-x-5'}>
        {data?.payload.map((category: any) => (
          <Image
            key={category.id}
            src={
              category?.icon ||
              'https://i.pinimg.com/564x/2a/4d/c3/2a4dc3ce036e764e3f291de19a71d1b1.jpg'
            }
            alt="Category image"
            className="ms-5 h-[240px] w-[240px] rounded-full bg-foreground object-cover"
          />
        ))}
      </div>
    </Marquee>
  );
}
