'use client';
import GoogleMapComponent from '@/components/search/GoogleMapComponent';

const Testing = () => {
  return (
    <div className="flex h-screen flex-row">
      <GoogleMapComponent
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      />
    </div>
  );
};

export default Testing;
