"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import NextLink from 'next/link';

interface FormValues {
    userName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    gender: string;
    password: string;
    location: string;
    profileImage: File | null;
}

const UpdateUserProfileComponent: React.FC = () => {
    const initialValues: FormValues = {
        userName: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        gender: "",
        password: "",
        location: "",
        profileImage: null,
    };

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        const file = event.currentTarget.files?.[0];
        setFieldValue("profileImage", file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const onSubmit = async (values: FormValues) => {
        try {
            const formData = new FormData();
            formData.append('userName', values.userName);
            formData.append('dateOfBirth', values.dateOfBirth);
            formData.append('phoneNumber', values.phoneNumber);
            formData.append('email', values.email);
            formData.append('gender', values.gender);
            formData.append('password', values.password);
            formData.append('location', values.location);
            formData.append('profileImage', values.profileImage as File);

            const response = await fetch('/api/updateProfile', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Profile updated successfully');
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Internal server error:', error);
        }
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        dateOfBirth: Yup.date().required("Required"),
        phoneNumber: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        gender: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        profileImage: Yup.mixed().required("Profile image is required"),
    });

    return (

        <>
            <div className="my-6 font-2xl px-8">
                <h1 className="font-semibold bold text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl">Account <span className="text-warning">Setting</span></h1>
            </div>
            <div className="container bg-gray dark:bg-black rounded-xl text-black px-10 py-6 justify-center">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <Form className="w-full max-w-2xl mx-auto">
                            <div className="flex flex-col gap-6">
                                {/* row-1 */}
                                <div className="flex gap-6 px-4">
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="firstName">
                                            Username
                                        </label>
                                        <Field
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-warning"
                                            type="text"
                                            id="userName"
                                            name="userName"
                                        />
                                        <ErrorMessage
                                            name="userName"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <Field
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-warning"
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                        />
                                        <ErrorMessage
                                            name="phoneNumber"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>
                                {/* row-2 */}
                                <div className="flex gap-6 px-4">
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="phoneNumber">
                                            Password
                                        </label>
                                        <Field
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-warning"
                                            type="password"
                                            id="password"
                                            name="password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="dateOfBirth">
                                            Date of Birth
                                        </label>
                                        <Field
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-warning"
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                        />
                                        <ErrorMessage
                                            name="dateOfBirth"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>
                                {/* row-3 */}
                                <div className="flex gap-6 px-4">
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="email">
                                            Email
                                        </label>
                                        <Field
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-warning"
                                            type="email"
                                            id="email"
                                            name="email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4 mb-4">
                                        <label className=" text-gray-700 font-bold dark:text-white" htmlFor="profileImage">
                                            Upload Avatar
                                        </label>
                                        <input
                                            type="file"
                                            id="profileImage"
                                            name="profileImage"
                                            accept="image/*"
                                            className="bg-gray-50 border border-50 rounded-md"
                                            onChange={(event) => handleFileChange(event, formik.setFieldValue)}
                                        />
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Profile Preview" className=" w-24 h-24 object-cover rounded-full" />
                                        )}
                                        <ErrorMessage
                                            name="profileImage"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 mt-6">
                                <div className="flex gap-4 flex-1">
                                    <NextLink href="#">
                                        <button className="w-full px-6 py-2 text-warning rounded-lg hover:bg-warning hover:text-white bg-white border-warning border-1 dark:bg-black dark:text-white transition-all ease-in-out">Update</button>
                                    </NextLink>
                                    <NextLink href="/profile/update-profile">
                                        <button className="w-full px-6 py-2 text-warning rounded-lg hover:bg-warning hover:text-white bg-warning border-warning border-1">Cancel</button>
                                    </NextLink>
                                </div>
                                <div className="flex justify-end flex-1">
                                    <NextLink href="#">
                                        <Button className="w-full md:w-auto border-1 border-orange-500 text-orange-500 bg-white dark:bg-black dark:text-white">Change Password</Button>
                                    </NextLink>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

        </>
    );
};

export default UpdateUserProfileComponent;
