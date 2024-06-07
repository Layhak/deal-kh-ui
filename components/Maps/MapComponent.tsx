'use client';

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import { Shop } from '@/types/shop';

type MapComponentProps = {
    shops: Shop[];
};

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const MapComponent: React.FC<MapComponentProps> = ({ shops }) => {
    const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);
    console.log(shops);
    const handleMouseOver = useCallback((shop: Shop) => {
        setSelectedShop(shop);
    }, []);

    const handleMouseOut = useCallback(() => {
        setSelectedShop(null);
    }, []);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                {shops.map((shop) => (
                    <Marker
                        key={shop.id}
                        position={{ lat: shop.latitude, lng: shop.longitude }}
                        onMouseOver={() => handleMouseOver(shop)}
                        onMouseOut={handleMouseOut}
                    />
                ))}
                {selectedShop && (
                    <InfoWindow
                        position={{ lat: selectedShop.latitude, lng: selectedShop.longitude }}
                        onCloseClick={() => setSelectedShop(null)}
                    >
                        <div>{selectedShop.name}</div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;