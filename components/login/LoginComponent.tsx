'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import Link from 'next/link';

import { Input, Image } from '@nextui-org/react';
// authentication
import { useSession, signIn, signOut } from 'next-auth/react';
import { CloseIcon, GoogleIcon, FacebookIcon } from '@/components/icons';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
  rememberMe: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC = () => {
  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: any
  ) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({
          message:
            data.message || 'Login failed. Please check your credentials.',
        });
      } else {
        // Handle successful login (e.g., redirect)
        console.log('Login successful!');
        // Example: Redirect to home page
        window.location.href = '/';
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

  // have no session before
  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center gap-16 bg-zinc-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 ">
          <div>
            <div className="flex justify-between text-xl font-semibold text-[#eb7d52]">
              <h1>DealKH</h1>
              <Link href="/">
                <CloseIcon />
              </Link>
            </div>
            <h2 className="mt-6 text-left text-2xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-1 text-left text-sm text-gray-500">
              Do not have an account?{' '}
              <NextLink
                href="/register"
                className="font-medium text-blue-600 transition-all duration-300 ease-in-out"
              >
                Sign up
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
                <div className="flex flex-col gap-4 -space-y-px rounded-md ">
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
                      className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
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
                </div>
                {/*  */}
                <div className="flex flex-col items-center justify-between sm:flex-row">
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
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 transition-all duration-300 ease-in-out "
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? 'Logging in...' : 'Sign In'}
                  </button>
                  {status && (
                    <div className="mt-2 text-xs text-red-500">
                      {status.message}
                    </div>
                  )}
                </div>
                {/* ruler */}
                <div className="flex h-[1px]">
                  {/* width of 1st ruler*/}
                  <div className="h-full w-full bg-gray-500"></div>
                  <div className="flex w-[100px] items-center justify-center">
                    <p className="text-gray-500">or</p>
                  </div>
                  {/* width of 2nd ruler */}
                  <div className="h-full w-full bg-gray-500"></div>
                </div>

                <div className="mt-6 flex flex-col items-center justify-between gap-2">
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    // onClick={() => signIn('google')}
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
        {/* picture in the right of the form */}
      </main>
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
        <div className="flex gap-4">
          <button
            className="rounded-md bg-red-600 px-6 py-2 text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
          <Link href="/">
            <button className="rounded-md bg-warning px-6 py-2 text-white">
              Go Back
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Login;
