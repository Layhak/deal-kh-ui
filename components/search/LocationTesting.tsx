"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Shop } from './shop';

const ShopMap = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const fetchNearbyShops = async () => {
    try {
      const response = await fetch('/api/nearby-shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: 37.7749,
          longitude: -122.4194,
        }),
      });
      const data = await response.json();
      setShops(data.shops);
    } catch (error) {
      console.error('Error fetching nearby shops:', error);
    }
  };

  useEffect(() => {
    fetchNearbyShops();
  }, [fetchNearbyShops]);

  if (loadError) {
    return <div>Error loading Google Maps API:</div>;
  }

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: 37.7749, lng: -122.4194 }}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {shops.map((shop: Shop) => (
            <Marker
              key={shop.id}
              position={{ lat: shop.latitude, lng: shop.longitude }}
              title={shop.name}
              onClick={() => window.open(shop.googleMapsUrl, '_blank')}
            />
          ))}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={fetchNearbyShops}>Find Nearby Shops</button>
    </div>
  );
};

export default ShopMap;