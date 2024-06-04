"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";

interface FormValues {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    gender: string;
    password: string;
    location: string;
    profileImage: File | null;
}

const UpdateAdminForm: React.FC = () => {
    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
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
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
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
        <div className="container mx-auto p-4 bg-white dark:bg-black text-black">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        <div className="flex gap-6 w-[70vw] px-2">
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="firstName">
                                    First Name
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="lastName">
                                    Last Name
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6 w-[70vw] px-2">
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

                        <div className="flex gap-6 w-[70vw] px-2">
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="email">
                                    Email
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="gender">
                                    Gender
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    as="select"
                                    id="gender"
                                    name="gender"
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Field>
                                <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6 w-[70vw] px-2">
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="location">
                                    Location
                                </label>
                                <Field
                                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    as="select"
                                    id="location"
                                    name="location"
                                >
                                    <option value="">Select</option>
                                    <option value="cambodia">Phnom Penh, Cambodia</option>
                                    <option value="usa">New York, USA</option>
                                    <option value="japan">Tokyo, Japan</option>
                                    <option value="vietnam">Hanoi, Vietnam</option>
                                    <option value="china">Beijing, China</option>
                                </Field>
                                <ErrorMessage
                                    name="location"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex rounded-md dark:text-white text-black w-[70vw] px-2">
                            <Button className="w-[200px] px-4 bg-orange-500 rounded-md">Change Password</Button>
                        </div>

                        <div className="flex flex-col mb-4 px-2">
                            <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="profileImage">
                                Profile Image
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                accept="image/*"
                                onChange={(event) => handleFileChange(event, formik.setFieldValue)}
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />
                            )}
                            <ErrorMessage
                                name="profileImage"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col mb-4 px-2 w-[100px]">
                            <Button
                                className="flex justify-end bg-orange-500 hover:bg-orange-700 text-black font-bold py-2 px-4 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                                type="submit"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateAdminForm;
