'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import Link from 'next/link';

import { Input, Image } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { CloseIcon, GoogleIcon, FacebookIcon } from '@/components/icons';

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

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-16 bg-zinc-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-gray w-full max-w-lg space-y-8 rounded-lg bg-white p-8">
          <div>
            <div className="flex justify-between text-xl font-semibold text-[#eb7d52]">
              <h1>DealKH</h1>
              <Link href="/">
                <CloseIcon />
              </Link>
            </div>
            <h2 className="mt-4 text-left text-2xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-1 text-left text-sm text-gray-500">
              Already have an account?{' '}
              <NextLink
                href="/login"
                className="font-medium text-blue-600 transition-all duration-300 ease-in-out"
              >
                Login Here
              </NextLink>
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="mt-6 space-y-6">
                <div className="flex  flex-col gap-4 -space-y-px rounded-md">
                  <div className="flex gap-2">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        First Name
                      </label>
                      <Field
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="firstname"
                        required
                        className="relative block w-[200px] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        placeholder="Enter First Name"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Last Name
                      </label>
                      <Field
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="lastname"
                        required
                        className="relative block w-[250px] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        placeholder="Enter Last Name"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                  </div>
                  {/* row 2 of input 2  */}
                  <div className="flex  gap-2 ">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="relative block w-[300px] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="sr-only">
                        Date of Birth
                      </label>
                      <Field
                        id="date"
                        name="date"
                        type="date"
                        autoComplete="bday"
                        required
                        className="relative block w-[150px] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        placeholder="Enter Date"
                      />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password1
                    </label>
                    <Field
                      id="password1"
                      name="password1"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                      placeholder="Enter Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password2
                    </label>
                    <Field
                      id="password2"
                      name="password2"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                      placeholder="Re-Enter Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mb-4 flex items-center sm:mb-0">
                    <Field
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-500"
                    >
                      I accept and agree to{' '}
                      <span className="text-blue-600">Term</span> and
                      <span className="text-blue-600"> Condition</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  {isSubmitting ? 'Logging in...' : 'Sign Up'}
                </button>
                {status && (
                  <div className="mt-2 text-xs text-red-500">
                    {status.message}
                  </div>
                )}

                {/* ruler */}
                <div className="flex h-[1px]">
                  {/* width of 1st ruler*/}
                  <div className="h-full w-full bg-gray-300"></div>
                  <div className="flex w-[100px] items-center justify-center">
                    <p className="text-gray-500">or</p>
                  </div>
                  {/* width of 2nd ruler */}
                  <div className="h-full w-full bg-gray-300"></div>
                </div>

                <div className="mt-6 flex flex-col items-center justify-between gap-2">
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={handleLoginGoogle}
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <GoogleIcon />
                    <span className="ml-2">Sign up with Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={handleLoginFacebook}
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <FacebookIcon />
                    <span className="ml-2">Sign up with Facebook</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  {
    /* When have session  */
  }
  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <div className="relative mb-2">
          <Image
            src={session.user?.image as string}
            alt=""
            className="rounded-full object-cover"
          />
        </div>
        <p className="mb-2 text-2xl">
          Welcome <span className="font-bold">{session.user?.name}</span>.
          Signed In As
        </p>
        <p className="mb-4 font-bold">{session.user?.email}</p>
        <button
          className="rounded-md bg-red-600 px-6 py-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </main>
    </>
  );
};

export default Register;
