// Import Swiper styles
import 'swiper/css';
// import required modules
import Marquee from 'react-fast-marquee';
import { Image } from '@nextui-org/react';
import { useGetCategoryQuery } from '@/redux/service/category';
import { CategoryType } from '@/types/category';

export default function Category() {
  const { data, isLoading, error } = useGetCategoryQuery();
  // console.log('data car=t', data?.payload[0]);
  // console.log('error', error);
  // console.log('isLoading', isLoading);

  return (
    <Marquee pauseOnHover>
      <div className={'flex gap-x-5'}>
        {data?.payload.map((category: CategoryType) => (
          // eslint-disable-next-line react/jsx-key
          <Image
            src={category.icon}
            alt="Category image"
            className="ms-5 h-[240px] w-[240px] rounded-full object-contain"
          />
        ))}
      </div>
    </Marquee>
  );
}
