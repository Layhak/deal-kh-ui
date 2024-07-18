'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import {
  Button,
  Card,
  CardBody,
  Image,
  ScrollShadow,
  Spinner,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useGetShopNearbyQuery } from '@/redux/service/shop';
import Loading from '@/app/(user)/loading';
import { googleMapsConfig } from '@/googleMapConfig';
import NextLink from 'next/link';

type GoogleMapProps = {};

const GoogleMapComponent: React.FC<GoogleMapProps> = () => {
  const { isLoaded } = useJsApiLoader(googleMapsConfig);

  const router = useRouter();

  const handleCardClick = (shop: any) => {
    router.push(`/shop/${shop.slug}`);
  };

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 11.5564,
    lng: 104.9282,
  });
  const [latitude, setLatitude] = useState<number>(11.5564);
  const [longitude, setLongitude] = useState<number>(104.9282);
  const [nearbyShops, setNearbyShops] = useState<any[]>([]);
  const [hoveredShop, setHoveredShop] = useState<any | null>(null);

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

  const { data, isLoading, error } = useGetShopNearbyQuery({
    latitude,
    longitude,
  });

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
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (data?.payload) {
      setNearbyShops(data.payload);
    }
  }, [data]);

  const options: google.maps.MapOptions = isLoaded
    ? {
        mapTypeId: 'roadmap',
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
        scrollwheel: true,
        disableDoubleClickZoom: false,
        maxZoom: 18,
        minZoom: 10,
        zoom: 14,
      }
    : {};

  const shopLocationIcon = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="512" y2="512">
  <stop offset="0%" style="stop-color:#f472b6;stop-opacity:1" />
  <stop offset="100%" style="stop-color:#facc15;stop-opacity:1" />
</linearGradient>
<path style="fill:url(#gradient);" d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,512
  l140.896-260.229c13.427-24.844,20.49-52.854,20.49-81.104C408.073,76.563,331.104,0,256,0z"/>
<g>
  <path style="fill:#FFFFFF;" d="M256,256c-47.052,0-85.333-38.281-85.333-85.333S208.948,85.333,256,85.333
    S341.333,123.615,341.333,170.667S303.052,256,256,256z"/>
  <circle style="fill:#FFFFFF;" cx="256" cy="170.667" r="42.667"/>
</g>
</svg>
`;

  const currentLocationIcon = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="512" y2="512">
  <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
  <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
</linearGradient>
<path style="fill:url(#gradient);" d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,512
  l140.896-260.229c13.427-24.844,20.49-52.854,20.49-81.104C408.073,76.563,331.104,0,256,0z"/>
<g>
  <path style="fill:#FFFFFF;" d="M256,256c-47.052,0-85.333-38.281-85.333-85.333S208.948,85.333,256,85.333
    S341.333,123.615,341.333,170.667S303.052,256,256,256z"/>
  <circle style="fill:#ec4899;" cx="256" cy="170.667" r="42.667"/>
</g>
</svg>
`;

  return isLoaded ? (
    <>
      {/* Card Shop Section */}
      <ScrollShadow hideScrollBar>
        <div className="w-full lg:pr-4">
          {nearbyShops.length > 0 ? (
            nearbyShops.map((shop, index) => (
              <Card
                key={shop.slug}
                isPressable
                className="my-8 w-full shadow-none"
                onMouseEnter={() => setHoveredShop(shop)}
                onMouseLeave={() => setHoveredShop(null)}
              >
                <CardBody className="flex flex-col sm:flex-row">
                  {/* Image section */}
                  <div className="h-64 w-full rounded-2xl lg:w-1/3">
                    <Image
                      className="h-64 w-screen object-cover"
                      src={
                        shop.profile ||
                        'https://imgs.search.brave.com/8YEIyVNJNDivQtduj2cwz5qVVIXwC6bCWE_eCVL1Lvw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc'
                      }
                      alt={shop.name}
                    />
                  </div>

                  {/* Content section */}
                  <div className="mt-4 w-full text-foreground-600 lg:my-auto lg:ml-8 lg:w-2/3">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-semibold tracking-tight text-foreground-800 dark:text-white">
                        {shop.name.length > 50
                          ? `${shop.name.substring(0, 20)}...`
                          : shop.name || 'Shop Name'}
                      </h5>
                    </a>
                    <p>
                      {shop.description.length > 115
                        ? `${shop.description.substring(0, 115)}...`
                        : shop.description || 'Product Description'}
                    </p>

                    <div className="my-2 flex flex-col gap-1">
                      <p className=" text-foreground-600">
                        Category :{' '}
                        <span className="font-medium text-foreground-900">
                          {shop.shopType || 'Product Category'}
                        </span>
                      </p>
                      <p className="text-sm text-foreground-600">
                        Open :{' '}
                        <span className="text-sm font-medium text-foreground-900">
                          {shop.openAt.slice(0, 5)}
                          {'  to  '}
                          {shop.closeAt.slice(0, 5)}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start">
                        <span className=" text-sm text-foreground-900 dark:text-white">
                          Available Now.
                          <p>Get Notified.</p>
                        </span>
                      </div>
                      <Button
                        onClick={() => handleCardClick(shop)}
                        className="h-[37px] w-[130px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-center text-[14px] text-white"
                      >
                        Check Us Out
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div>Shop Not Found</div>
          )}
        </div>
      </ScrollShadow>

      {/* Google Map Section */}
      <div className="h-full w-full">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          <Marker
            icon={{
              url: `data:image/svg+xml;base64,${btoa(currentLocationIcon)}`,
              scaledSize: new google.maps.Size(40, 40),
            }}
            position={center}
          />
          {nearbyShops.map((shop, index) => {
            const [shopLat, shopLng] = shop.location.split(',').map(parseFloat);

            return (
              <Marker
                key={index}
                position={{
                  lat: shopLat,
                  lng: shopLng,
                }}
                // custom the icon on google map
                icon={{
                  url: `data:image/svg+xml;base64,${btoa(shopLocationIcon)}`,
                  scaledSize: new google.maps.Size(40, 40),
                }}
                onMouseOver={() => setHoveredShop(shop)}
              >
                {hoveredShop && hoveredShop.location === shop.location && (
                  <InfoWindow
                    onCloseClick={() => {
                      setHoveredShop(null);
                    }}
                  >
                    <div className="h-44 w-40 hover:cursor-pointer">
                      <NextLink href={`/shop/${shop.slug}`}>
                        <Image
                          className="h-36 w-40 object-cover"
                          src={shop.profile}
                          alt={shop.name}
                        />
                      </NextLink>
                      <p className="mt-2 font-medium text-gray-900">
                        {shop.name}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      </div>
    </>
  ) : (
    <div className={'flex w-full items-center justify-center md:w-[50%] '}>
      <Spinner color={'warning'} />
    </div>
  );
};

export default GoogleMapComponent;
