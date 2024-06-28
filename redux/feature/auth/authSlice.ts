// redux/feature/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const initialState = {
  token: null as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeAccessToken(state) {
      console.log('Removing token'); // Log when the token is removed
      state.token = null;
    },
  },
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state: RootState) => state.auth.token;
