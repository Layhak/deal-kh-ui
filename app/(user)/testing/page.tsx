"use client"
import GoogleMapComponent from '@/components/search/GoogleMapComponent';
import { useGetShopsQuery } from '@/redux/service/shop';

const Testing = () => {

  const { data, isLoading, error } = useGetShopsQuery({
    page: 1,
    size: 10,
    field: '',
    fieldName: '',
  });

  return (
    <div>
      <GoogleMapComponent apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}/>
    </div>
  );
};

export default Testing;
