'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { googleMapsConfig } from '@/googleMapConfig';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 11.5758609956468,
  lng: 104.90154057741165,
};

type Coordinates = {
  lat: number;
  lng: number;
};

type MapComponentProps = {
  onLocationSelect: (location: Coordinates, address: string) => void;
};

const MapCreateShopComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const mapRef = useRef<GoogleMap>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

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
        return data.results[0].formatted_address;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location = {
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

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        fetchAddressFromCoordinates(location).then((address) => {
          setSelectedAddress(address);
          onLocationSelect(location, address);
        });
        mapRef.current?.panTo(location);
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = {
            lat: latitude,
            lng: longitude,
          };
          setSelectedLocation(location);
          fetchAddressFromCoordinates(location).then((address) => {
            setSelectedAddress(address);
            onLocationSelect(location, address);
          });
          mapRef.current?.panTo(location);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, [onLocationSelect]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
                <div className="flex flex-col items-center justify-center">
                  <GoogleMap
                    ref={mapRef}
                    mapContainerStyle={containerStyle}
                    center={selectedLocation || defaultCenter}
                    zoom={15}
                    onClick={handleMapClick}
                  >
                    <StandaloneSearchBox
                      onLoad={(ref) => (searchBoxRef.current = ref)}
                      onPlacesChanged={handlePlacesChanged}
                    >
                      <input
                        type="text"
                        placeholder="Search for places..."
                        className="w-full rounded-md border p-2"
                        style={{
                          boxSizing: 'border-box',
                          border: '1px solid transparent',
                          width: '240px',
                          height: '32px',
                          marginTop: '10px',
                          padding: '0 12px',
                          borderRadius: '3px',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                          fontSize: '14px',
                          outline: 'none',
                          textOverflow: 'ellipses',
                        }}
                      />
                    </StandaloneSearchBox>
                    {selectedLocation && <Marker position={selectedLocation} />}
                  </GoogleMap>
                </div>
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

export default MapCreateShopComponent;
