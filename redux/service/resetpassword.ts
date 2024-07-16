import { ecommerceApi } from '@/redux/api';

export const resetPassword = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: 'auth/send-otp',
        method: 'POST',
        body,
      }),
    }),
    confirmOtp: builder.mutation<void, { otp: number }>({
      query: (body) => ({
        url: 'auth/confirm-otp',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<
      void,
      { otp: number; newPassword: string; confirmPassword: string }
    >({
      query: (body) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useConfirmOtpMutation,
  useResetPasswordMutation,
} = resetPassword;
