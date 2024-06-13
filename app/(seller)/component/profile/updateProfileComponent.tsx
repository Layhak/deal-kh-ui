"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { RiEyeOffLine } from "react-icons/ri";
import { Link} from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io'; 
import ResetPasswordModal from "../popup/resetPassword";

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

const UpdateProfileSellerComponent: React.FC = () => {
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    const handleDeleteImage = () => {
        // Logic to delete the image preview
        setImagePreview(null);
        // You might also want to clear the file input value if it's a controlled component
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleConfirmPasswordVisibility = () => {
       setShowConfirmPassword(!showConfirmPassword);
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
        <div className="container mx-auto p-4 bg-white rounded-lg dark:bg-black text-black">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form className="m-4">
                        <div className="flex gap-8 px-2 mb-2">
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" htmlFor="firstName">
                                    First Name
                                </label>
                                <Field
                                    className="border px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Ooh"
                                />
                                
                            </div>
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" aria-placeholder="lastname" htmlFor="lastName">
                                    Last Name
                                </label>
                                <Field
                                    className="border px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Tenten"
                                />
                                
                            </div>
                        </div>

                        <div className="flex gap-8 px-2">
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>
                                <Field
                                    className="border px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                />
                                
                            </div>
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <Field
                                    className="border px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="092-984-123"
                                />
                                
                            </div>
                        </div>

                        <div className="flex gap-8 px-2">
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" htmlFor="email">
                                    Email
                                </label>
                                <Field





































































































































































































                                
                                    className="border px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="oohtenten@gmail.com"
                                />
                            
                            </div>
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" htmlFor="gender">
                                    Gender
                                </label>
                                <Field
                                    className="border cursor-pointer pr-5 px-3 py-3 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    as="select"
                                    id="gender"
                                    name="gender"
                                >
                                    <option value="Select">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Field>
                            
                            </div>
                        </div>

                        <div className="flex gap-8 px-2">
                            <div className="flex flex-col mb-4 flex-1 relative">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    className="border px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                />
                                <div
                                    className="absolute top-11 right-4 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                {showConfirmPassword ? <RiEyeOffLine size={20} /> : <FaRegEye size={20} />}
                                </div>
                                
                            </div>
                            <div className="flex flex-col mb-4 flex-1">
                                <label className="mb-3 text-gray-700 font-bold dark:text-white" htmlFor="location">
                                    Location
                                </label>
                                <Field
                                    className="border px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                                    type="text"
                                    id="location"
                                    name="loaction"
                                    placeholder="Phnom penh"
                                />
                                
                            </div>
                        </div>

                        <div className="flex rounded-md my-3 dark:text-white text-white w-[70vw] px-2">
                        <button
                            className="w-[200px] px-4 py-2 bg-gradient-to-tr from-pink-500 text-white to-yellow-500 text-lg rounded-md"
                            onClick={openModal}
                            >
                            Change Password
                        </button>
                            </div>
                        <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />
                        <div className="flex flex-col mb-4 px-2 pt-5">
                        <label className="mb-1 text-gray-700 font-bold dark:text-white" htmlFor="profileImage">
                            Upload Profile
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                            onChange={(event) => handleFileChange(event, formik.setFieldValue)}
                            className="border px-3 py-3 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-md focus:outline-none focus:ring-1 focus:ring-warning-500"
                        />
                        {imagePreview && (
                            <div className="flex items-center mt-2">
                                <img src={imagePreview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full mr-2" />
                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    className="bg-red-500 text-white rounded-md px-1 py-1 hover:bg-red-600 focus:outline-none flex"
                                >
                                    <IoMdClose className="mr-1" /> 
                                </button>
                            </div>
                        )}
                    </div>

                        <div className="flex justify-end pt-3">
                        <Link
                            href="/profiles"
                        >
                            <Button
                                className="relative border-2 border-orange-500 px-6 py-2 mr-5 text-md font-semibold text-orange-500 dark:text-white rounded-md focus:outline-none"
                                variant="bordered"
                                type="submit"
                            >
                                <span className="relative z-10">Update</span>
                            </Button>
                        </Link>
                        <Link
                            href="/profiles"
                        >
                            <Button
                                className="px-6 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-md py-2 dark:text-white rounded-md focus:outline-none"
                                variant="bordered"
                                type="submit"
                            >
                                <span className="relative z-10">Cancel</span>
                            </Button>
                        </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateProfileSellerComponent;
