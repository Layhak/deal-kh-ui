"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import Link from 'next/link';
import { CloseIcon } from '@/components/Icons';
import { Input, Image } from "@nextui-org/react";

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

    return (
        <div className="min-h-screen flex items-center gap-16 justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray p-8 rounded-lg">
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
                                >
                                    <span className="sr-only">Sign in with Google</span>
                                    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 48 48">
                                        <path d="M24 9.5c3.14 0 5.66 1.1 7.78 2.92l5.78-5.77C34.85 3.95 29.71 1.5 24 1.5 14.6 1.5 6.84 7.79 3.96 16.34l6.86 5.36C12.74 13.64 17.9 9.5 24 9.5z" fill="#EA4335" />
                                        <path d="M44.5 20H24v8.5h11.7c-1.1 3.2-3.7 5.4-7 6.4l6.6 5.2c4.1-3.8 6.7-9.4 6.7-15.7 0-1.4-.1-2.8-.3-4.4z" fill="#4285F4" />
                                        <path d="M10.8 29.6c-1.5-4.4-1.5-9.1 0-13.4l-6.8-5.3C1.5 15.2 0 19.5 0 24s1.5 8.8 4 12.4l6.8-5.3z" fill="#FBBC05" />
                                        <path d="M24 46c5.7 0 10.4-1.9 13.8-5.2l-6.6-5.2c-2.4 1.6-5.4 2.5-8.7 2.5-6 0-11.1-3.9-13-9.3l-6.8 5.3C6.8 40.8 14.8 46 24 46z" fill="#34A853" />
                                        <path d="M0 0h48v48H0z" fill="none" />
                                    </svg>
                                    <span className="ml-2">Sign up with Google</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <span className="sr-only">Sign in with GitHub</span>
                                    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.868 8.166 6.839 9.49.5.092.683-.217.683-.482 0-.237-.009-.866-.013-1.699-2.782.604-3.369-1.342-3.369-1.342-.454-1.152-1.109-1.459-1.109-1.459-.908-.621.069-.609.069-.609 1.004.071 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.832.092-.646.35-1.088.635-1.339-2.221-.252-4.555-1.112-4.555-4.95 0-1.093.39-1.986 1.029-2.685-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.024A9.563 9.563 0 0112 7.605a9.563 9.563 0 012.5.336c1.91-1.294 2.75-1.024 2.75-1.024.545 1.378.201 2.397.099 2.65.639.699 1.029 1.592 1.029 2.685 0 3.846-2.336 4.696-4.561 4.942.359.31.68.922.68 1.859 0 1.342-.012 2.423-.012 2.751 0 .267.182.577.688.48A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-2">Sign up with GitHub</span>
                                </button>
                            </div>
                            
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;

