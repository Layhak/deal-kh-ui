import { Libraries } from '@react-google-maps/api';

const getGoogleMapsApiKey = () =>
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const libraries: Libraries = ['geometry', 'drawing', 'places'];

export const googleMapsConfig = {
  id: 'google-map-script',
  googleMapsApiKey: getGoogleMapsApiKey(),
  libraries,
  version: 'weekly',
  language: 'en',
  region: 'KH',
};
