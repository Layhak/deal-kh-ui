"use client"
import GoogleMapComponent from '@/components/search/GoogleMapComponent';
import ShopNearbyComponent from '@/components/search/ShopNearbyComponent';
import shopFakes from '@/types/shopFake';
import { GoogleMap } from '@react-google-maps/api';

const Testing = () => {
  return (
    <div className="flex h-screen flex-row">
      {/* This will render the shop nearby */}
      <div className="w-[70%] overflow-y-auto pr-4 scrollbar-hide">
        {shopFakes.map((shop, index) => (
          // <ShopNearbyComponent key={index} shop={shop} />
          <ShopNearbyComponent shop={shop} />
        ))}
      </div>

      {/* This will render the Google Map and the current location */}
      <div className="sticky right-0 top-0 z-10 h-full w-[30%]">
        <GoogleMapComponent
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        />
      </div>
    </div>
  );
};

export default Testing;
