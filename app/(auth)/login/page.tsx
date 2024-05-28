"use client"

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
import { CloseIcon } from "@/components/icons";

type ValueTypes = {
    email: string;
    password: string;
}

const initialValues: ValueTypes = {
    email: "",
    password: "",
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string().required("Required"),
});

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (values: ValueTypes) => {
        setLoading(true);

        // handle request to api via login
        fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className={'grid h-[100vh] place-content-center'}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="150"
                    height="150"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                    >
                        <animateTransform
                            attributeName="transform"
                            dur="0.75s"
                            repeatCount="indefinite"
                            type="rotate"
                            values="0 12 12;360 12 12"
                        />
                    </path>
                </svg>
            </div>
        )
    }

    return (
        <main className="bg-gray-800 grid justify-center place-content-center min-h-screen">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                }}
            >
                <Form className="bg-gray-900 shadow-2xl rounded-xl p-12 mb-4 w-[50vw] max-w-md">
                    <div className="flex justify-between text-orange-500">
                        <h1>DealKH</h1>
                        <Link
                            href="/"
                        >
                            <CloseIcon />
                        </Link>
                    </div>
                    <h1 className="text-3xl mb-6  text-gray-100 font-bold">Welcome Back</h1>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-500 text-sm font-bold mb-2">Email</label>
                        <Field type="email" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="email" component="section" className="text-red-500 text-xs italic" />
                    </div>
                    {/* Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-500 text-sm font-bold mb-2">Password</label>
                        <div className="relative">
                            <Field type={showPassword ? "text" : "password"} name="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {!showPassword ? (
                                    <IoEyeOffSharp onClick={handleShowPassword} className="text-gray-600 cursor-pointer" />
                                ) : (
                                    <IoEyeSharp onClick={handleShowPassword} className="text-gray-600 cursor-pointer" />
                                )}
                            </div>
                        </div>
                        <ErrorMessage name="password" component="section" className="text-red-500 text-xs italic" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="hover:text-gray-500 transition-all ease-in-out text-gray-100 text-sm text-center mb-4"><Link href="/register">Not Registered Yet?</Link></p>
                        {/* button submit */}
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign Up
                        </button>
                    </div>
                </Form>
            </Formik>
        </main>
    );
}
