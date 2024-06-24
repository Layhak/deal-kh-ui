'use client';

import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { Button, Checkbox } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { Cancel, Facebook, Google, Logo } from '@/components/icons';
import { togglePasswordVisibility } from '@/redux/feature/password/passwordVisibilitySlice';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from 'next-themes';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useLoginUserMutation } from '@/redux/service/auth';

type FormValues = {
  email: string;
  password: string;
};

const initialValues: FormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export default function MyShop() {
  const dispatch = useAppDispatch();
  const showPassword = useAppSelector((state) => state.passwordVisibility);
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const router = useRouter();
  const { theme } = useTheme();

  const handleShowPassword = () => {
    dispatch(togglePasswordVisibility());
  };

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      await loginUser(values).unwrap();
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.data?.message) {
        setErrors({
          email: 'invalid email or password',
          password: 'invalid email or password',
        });
      } else {
        toast.error('An error occurred. Please try again later.', { theme });
      }
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="min-h-[500px] w-full rounded-xl border-1.5 bg-gray-50 p-4 dark:border-0  dark:bg-gray-950 sm:w-[500px] sm:px-7 sm:py-10"
      data-aos="flip-up"
    >
      <div className={'flex items-center justify-between'}>
        <NextLink href="/">
          <Button
            color={'danger'}
            radius={'full'}
            variant={'bordered'}
            className={'border-0'}
            size={'sm'}
            isIconOnly={true}
          >
            <Cancel size={28} />
          </Button>
        </NextLink>
        <ThemeSwitch />
      </div>
      <div>
        <div className={'my-5 flex items-center gap-1'}>
          <Logo size={46} />
          <h2 className=" bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold leading-9 tracking-tight text-transparent">
            Deal KH
          </h2>
        </div>
        <div>
          <h1 className=" text-3xl  font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            Sign in to your account
          </h1>
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Not a member?{' '}
          <NextLink
            href="/register"
            className="font-semibold text-primary-500 hover:text-blue-600"
          >
            Start a new account with us!
          </NextLink>
        </p>
      </div>

      <div className="mt-5">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form action="#" method="POST" className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="section"
                    className={'text-danger'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {!showPassword ? (
                      <IoEyeOffSharp
                        onClick={() => handleShowPassword()}
                        className="absolute right-3 top-3 cursor-pointer"
                      />
                    ) : (
                      <IoEyeSharp
                        onClick={() => handleShowPassword()}
                        className="absolute right-3 top-3 cursor-pointer"
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="section"
                    className={'text-danger'}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox defaultSelected color={'primary'}>
                      Remember me
                    </Checkbox>
                  </div>

                  <div className="text-sm leading-6">
                    <a
                      href="#"
                      className="font-semibold text-primary-500 hover:text-primary-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    color={'warning'}
                    className={
                      ' w-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-lg  text-gray-50 '
                    }
                    type="submit"
                    variant={'solid'}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-10">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-gray-100  px-3 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
                Or
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <NextLink
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md border-1 border-gray-300 bg-gray-50 px-3 py-1.5 text-white hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              onClick={() => signIn('google')}
            >
              <Google />
              <span className="text-sm font-semibold leading-6 text-gray-800">
                Google
              </span>
            </NextLink>

            <NextLink
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md border-1 border-gray-300 bg-gray-50 px-3 py-1.5 text-white hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              onClick={() => signIn('facebook')}
            >
              <Facebook size={24} className={'text-primary-500'} />
              <span className="text-sm font-semibold leading-6 text-gray-800">
                Facebook
              </span>
            </NextLink>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
