"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import shopFakes, { ShopFake } from '@/types/shopFake';
import { Image } from '@nextui-org/react';

type GoogleMapProps = {
  apiKey: string;
};

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [nearbyShops, setNearbyShops] = useState<ShopFake[]>([]);
  const [selectedShop, setSelectedShop] = useState<ShopFake | null>(null);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
    },
    [setMap]
  );

  const onUnmount = useCallback(
    (map: google.maps.Map) => {
      setMap(null);
    },
    [setMap]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({
            lat: latitude,
            lng: longitude,
          });
          setLatitude(latitude);
          setLongitude(longitude);
          findNearbyShops(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, []);

  const findNearbyShops = (lat: number, lng: number) => {

    const filteredShops = shopFakes.filter((shop) => {
      const distance = calculateDistance(lat, lng, shop.location.latitude, shop.location.longitude);
      return distance <= 1000;
    });

    setNearbyShops(filteredShops);
  };

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 18, // Increase the maximum zoom level
  minZoom: 10, // Increase the minimum zoom level
  zoom: 14, // Set the default zoom level to 12
  };

  return isLoaded ? (
    <div style={{height: '100vh'}}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '91%' }}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        <Marker position={center} />
        {nearbyShops.map((shop, index) => (
          <Marker
            key={index}
            position={{
              lat: shop.location.latitude,
              lng: shop.location.longitude
            }}
            onMouseOver={() => setSelectedShop(shop)}
            // onMouseOut={() => setSelectedShop(null)}
          >
            {selectedShop && selectedShop.location.latitude === shop.location.latitude && selectedShop.location.longitude === shop.location.longitude && (
              <InfoWindow>
                <div className='w-40 h-44'>
                  <Image className='h-36 w-40 object-cover' src={shop.imageUrl} alt={shop.name} />
                  <p className='mt-2 text-foreground-900 font-medium'>{shop.name}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;