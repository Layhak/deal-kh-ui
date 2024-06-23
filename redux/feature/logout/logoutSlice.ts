// redux/feature/auth/logoutSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { removeAccessToken } from '@/redux/feature/auth/authSlice';

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to logout');
  }

  localStorage.removeItem('loggedIn');
  dispatch(removeAccessToken());
  return true;
});

const logoutSlice = createSlice({
  name: 'logout',
  initialState: { isLoading: false, isError: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const selectLogoutState = (state: RootState) => state.logout;
export default logoutSlice.reducer;
