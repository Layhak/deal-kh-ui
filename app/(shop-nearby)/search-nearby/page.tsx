'use client';
import GoogleMapComponent from '@/components/search/GoogleMapComponent';

const SearchNearBy = () => {
  return (
    <div className="flex h-screen w-full ps-0 md:ps-10 lg:ps-32">
      <GoogleMapComponent />
    </div>
  );
};

export default SearchNearBy;
