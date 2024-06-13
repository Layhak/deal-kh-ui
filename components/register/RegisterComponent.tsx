"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import Link from 'next/link';
import { CloseIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import { Input, Image } from "@nextui-org/react";
import { signIn, signOut, useSession } from 'next-auth/react';

interface RegisterFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const initialValues: RegisterFormValues = {
    email: '',
    password: '',
    rememberMe: false,
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Register: React.FC = () => {
    const onSubmit = async (values: RegisterFormValues, { setSubmitting, setStatus }: any) => {
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
            <div className="min-h-screen flex items-center gap-16 justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray p-8 rounded-lg bg-white shadow-md">
                    <div>
                        <div className="flex justify-between text-orange-500">
                            <h1>DealKH</h1>
                            <Link
                                href="/"
                            >
                                <CloseIcon />
                            </Link>
                        </div>
                        <h2 className="mt-6 text-left text-2xl font-extrabold text-gray-900">Create your account</h2>
                        <p className="mt-2 text-left text-sm text-gray-600">
                            Already have an account?{' '}
                            <NextLink href="/login" className="font-medium text-orange-600 hover:text-orange-500">Login Here</NextLink>
                        </p>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting, status }) => (
                            <Form className="mt-8 space-y-6">
                                <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
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
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter First Name"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
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
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter Last Name"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>
                                    </div>
                                    {/* row 2 of input 2  */}
                                    <div className="flex gap-2">
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
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm mr-24"
                                                placeholder="Enter Email"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="sr-only">
                                                Date of Birth
                                            </label>
                                            <Field
                                                id="date"
                                                name="date"
                                                type="date"
                                                autoComplete="date"
                                                required
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter Date"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
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
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter Password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
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
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                            placeholder="Re-Enter Password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                >
                                    {isSubmitting ? 'Logging in...' : 'Sign Up'}
                                </button>
                                {status && <div className="text-red-500 text-xs mt-2">{status.message}</div>}

                                <div className="mt-6 flex flex-col gap-2 justify-between items-center">
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        onClick={handleLoginGoogle}
                                    >
                                        <span className="sr-only">Sign in with Google</span>
                                        <GoogleIcon />
                                        <span className="ml-2">Sign up with Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
        )
    }
    
    {/* When have session  */ }
    return (
        <>
            <main className="w-full h-screen flex flex-col justify-center items-center">
                <div className="relative mb-2">
                    <Image
                        src={session.user?.image as string}
                        alt=""
                        className="object-cover rounded-full"
                    />
                </div>
                <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
                <p className="font-bold mb-4">{session.user?.email}</p>
                <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>
            </main>
        </>
    );
};

export default Register;

