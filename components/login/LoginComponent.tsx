"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import Link from 'next/link';
import { CloseIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import { Input, Image } from "@nextui-org/react";
// authentication
import { useSession, signIn, signOut } from "next-auth/react"
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
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC = () => {
    const onSubmit = async (values: LoginFormValues, { setSubmitting, setStatus }: any) => {
        setSubmitting(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus({ message: data.message || 'Login failed. Please check your credentials.' });
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
            <main className="min-h-screen flex items-center gap-16 justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
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
                        <h2 className="mt-6 text-left text-2xl font-extrabold text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-left text-sm text-gray-600">
                            Do not have an account?{' '}
                            <NextLink href="/register" className="font-medium text-orange-600 hover:text-orange-500">Sign up</NextLink>
                        </p>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting, status }) => (
                            <Form className="mt-8 space-y-6">
                                <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
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
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter Email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
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
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter Password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                </div>
                                <div className="flex">
                                    <hr />
                                    <div className="flex gap-4 justify-center w-full ">
                                        <p>or</p>
                                    </div>
                                    <hr />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Field
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                    >
                                        {isSubmitting ? 'Logging in...' : 'Sign In'}
                                    </button>
                                    {status && <div className="text-red-500 text-xs mt-2">{status.message}</div>}
                                </div>
                                <div className="mt-6 flex flex-col gap-2 justify-between items-center">
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        // onClick={() => signIn('google')}
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
                {/* picture in the right of the form */}
                <div>
                    <Image
                        src="/login_pic.png"
                        alt="logo_picture"
                        width={400}
                        height={400}
                    ></Image>
                </div>
            </main>
        );
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
}

export default Login;



