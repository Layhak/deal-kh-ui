'use client';

import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';

import { Button, Checkbox } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import { Cancel, Facebook, Google, Logo } from '@/components/icons';
import { ToastContainer } from 'react-toastify';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useLoginUserMutation } from '@/redux/service/auth';
import { togglePasswordVisibility } from '@/redux/feature/password/passwordVisibilitySlice';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  password1: string;
  password2: string;
  acceptPolicy: boolean;
}

const initialValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: new Date(),
  password1: '',
  password2: '',
  acceptPolicy: false,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  dateOfBirth: Yup.date().required('Date of birth is required').nullable(),
  password1: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1')], 'Passwords must match')
    .required('Confirm password is required'),
  acceptPolicy: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ), // Validation for the checkbox
});

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const showPassword = useAppSelector((state) => state.passwordVisibility);
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const onSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setStatus }: any
  ) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setStatus({ message: 'Login failed. Please check your credentials.' });
      } else {
        // Handle successful register (e.g., redirect)
        console.log('Register successful!');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ message: 'Something went wrong. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  // authentication
  const { data: session } = useSession();
  // check session
  console.log('Session data:', session);

  // handle redirect to home page
  const handleLoginGoogle = async () => {
    await signIn('google', {
      redirect: false, // Prevent automatic redirection
      callbackUrl: '/', // Redirect to home page after successful authentication
    });
  };
  const handleLoginFacebook = async () => {
    await signIn('facebook', {
      redirect: false, // Prevent automatic redirection
      callbackUrl: '/', // Redirect to home page after successful authentication
    });
  };
  const handleShowPassword = () => {
    dispatch(togglePasswordVisibility());
  };
  const handleSubmit = () => {
    console.log('Hello');
  };

  return (
    <div
      className="min-h-[500px] w-full rounded-xl border-1.5 bg-gray-50 p-4 dark:border-0  dark:bg-gray-950 sm:w-[500px] sm:px-7 sm:py-5"
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
        <div className={'my-2 flex items-center gap-1'}>
          <Logo size={46} />
          <h2 className=" bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold leading-9 tracking-tight text-transparent">
            Deal KH
          </h2>
        </div>
        <div>
          <h1 className=" text-3xl  font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            Create your account
          </h1>
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Already become our member?{' '}
          <NextLink
            href="/login"
            className="font-semibold text-primary-500 hover:text-blue-600"
          >
            Login here!
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
              <Form action="#" method="POST" className="space-y-2">
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
                      className="block w-full basis-[70%] rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
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
                      className="block w-full basis-[70%] rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className={'grid grid-cols-3 gap-3'}>
                  <div className={'col-span-2'}>
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
                        className="block w-full basis-[70%] rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="email"
                        component="section"
                        className={'text-danger'}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium leading-6 text-foreground"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="dob"
                        name="dob"
                        type="date"
                        autoComplete="date"
                        required
                        className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="email"
                        component="section"
                        className={'text-danger'}
                      />
                    </div>
                  </div>
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
                      I agree with the term and condition
                    </Checkbox>
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
                    Sign up
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-5">
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
              className="flex w-full items-center justify-center gap-3 rounded-md border-1 border-gray-300 bg-gray-50 px-3 py-1 text-white hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
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
};

export default Register;
