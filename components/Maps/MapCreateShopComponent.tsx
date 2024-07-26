'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { googleMapsConfig } from '@/config/googleMapConfig';

type Coordinates = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter: Coordinates = {
  lat: 11.5758609956468,
  lng: 104.90154057741165,
};

interface MapComponentProps {
  onLocationSelect: (location: Coordinates, address: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(
    null
  );
  const mapRef = useRef<GoogleMap>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location: Coordinates = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedLocation(location);
      fetchAddressFromCoordinates(location).then((address) => {
        setSelectedAddress(address);
        onLocationSelect(location, address);
      });
    }
  };

  const { isLoaded } = useJsApiLoader(googleMapsConfig);

  const fetchAddressFromCoordinates = async ({
    lat,
    lng,
  }: Coordinates): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsConfig.googleMapsApiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressResult = data.results.find(
          (result: { formatted_address: string }) =>
            result.formatted_address.includes('Cambodia')
        );

        if (addressResult) {
          return addressResult.formatted_address;
        } else {
          return 'Default Address: Street, Sangkat, Khan, City, Country';
        }
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location: Coordinates = {
            lat: latitude,
            lng: longitude,
          };
          setCurrentLocation(location);
          setSelectedLocation(location);
          fetchAddressFromCoordinates(location).then((address) => {
            setSelectedAddress(address);
            onLocationSelect(location, address);
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, [onLocationSelect]);

  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-gray-100 p-4 shadow-md">
        <p className="text-lg font-semibold text-gray-700">
          {selectedAddress
            ? `Selected Address: ${selectedAddress}`
            : 'No location selected'}
        </p>
      </div>
      <Button
        className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 font-semibold text-white shadow-lg transition duration-300 hover:from-blue-600 hover:to-indigo-700"
        onPress={onOpen}
      >
        Select Location
      </Button>
      <Modal
        isOpen={isOpen}
        size="lg"
        className="w-[90vw] max-w-[800px]"
        onOpenChange={onOpenChange}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Select Location</ModalHeader>
              <ModalBody>
                {isLoaded && (
                  <div className="flex flex-col items-center justify-center">
                    <GoogleMap
                      ref={mapRef}
                      mapContainerStyle={containerStyle}
                      center={currentLocation || defaultCenter}
                      zoom={15}
                      onClick={handleMapClick}
                    >
                      {selectedLocation && (
                        <Marker position={selectedLocation} />
                      )}
                    </GoogleMap>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onPress={onClose} className="mr-2">
                  Cancel
                </Button>
                <Button onPress={onClose}>Confirm</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MapComponent;
