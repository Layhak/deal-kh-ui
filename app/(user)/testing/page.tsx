"use client"
import GoogleMapComponent from '@/components/search/GoogleMapComponent';
import GoogleMapComponentTesting from '@/components/search/GoogleMapComponentTesting';
import ShopNearbyComponent from '@/components/search/ShopNearbyComponent';
import ShopNearbyComponentTesting from '@/components/search/ShopNearbyComponentTesting';
import { useGetShopsQuery } from '@/redux/service/shop';
import { ShopDetail } from '@/types/shopDtail';
import { GoogleMap } from '@react-google-maps/api';

const Testing = () => {

  const { data, isLoading, error } = useGetShopsQuery({
    page: 1,
    size: 10,
    field: '',
    fieldName: '',
  });

  return (
    <div>
      <GoogleMapComponentTesting apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}/>
    </div>
  );
};

export default Testing;
