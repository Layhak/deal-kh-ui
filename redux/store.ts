import { configureStore } from '@reduxjs/toolkit';
import userProfileSlice from '@/redux/feature/userProfile/userProfileSlice';
import authSlice from '@/redux/feature/auth/authSlice';
import cartSlice from '@/redux/feature/cart/cartSlice';
import passwordVisibilitySlice from '@/redux/feature/password/passwordVisibilitySlice';
import { ecommerceApi } from './api';
import logoutSlice from './feature/logout/logoutSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      userProfile: userProfileSlice,
      auth: authSlice,
      cart: cartSlice,
      logout: logoutSlice,
      passwordVisibility: passwordVisibilitySlice,
      [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ecommerceApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
