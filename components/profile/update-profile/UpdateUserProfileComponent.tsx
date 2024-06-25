'use client';

import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@nextui-org/react';
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
    userName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    gender: '',
    password: '',
    location: '',
    profileImage: null,
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    setFieldValue('profileImage', file);
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
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    dateOfBirth: Yup.date().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    gender: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    profileImage: Yup.mixed().required('Profile image is required'),
  });

  return (
    <>
      <div className="font-2xl my-6 px-8">
        <h1 className="bold text-base font-semibold text-gray-500 sm:text-lg md:text-xl lg:text-2xl">
          Account <span className="text-warning">Setting</span>
        </h1>
      </div>
      <div className="bg-gray container justify-center rounded-xl px-10 py-6 text-black dark:bg-black">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="mx-auto w-full max-w-2xl">
              <div className="flex flex-col gap-6">
                {/* row-1 */}
                <div className="flex gap-6 px-4">
                  <div className="mb-4 flex flex-col">
                    <label
                      className="mb-1 font-bold text-gray-700 dark:text-white"
                      htmlFor="firstName"
                    >
                      Username
                    </label>
                    <Field
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-warning"
                      type="text"
                      id="userName"
                      name="userName"
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label
                      className="mb-1 font-bold text-gray-700 dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <Field
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-warning"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                {/* row-2 */}
                <div className="flex gap-6 px-4">
                  <div className="mb-4 flex flex-col">
                    <label
                      className="mb-1 font-bold text-gray-700 dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Password
                    </label>
                    <Field
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-warning"
                      type="password"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label
                      className="mb-1 font-bold text-gray-700 dark:text-white"
                      htmlFor="dateOfBirth"
                    >
                      Date of Birth
                    </label>
                    <Field
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-warning"
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                    />
                    <ErrorMessage
                      name="dateOfBirth"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                {/* row-3 */}
                <div className="flex gap-6 px-4">
                  <div className="mb-4 flex flex-col">
                    <label
                      className="mb-1 font-bold text-gray-700 dark:text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-warning"
                      type="email"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="mb-4 flex flex-col gap-4">
                    <label
                      className=" font-bold text-gray-700 dark:text-white"
                      htmlFor="profileImage"
                    >
                      Upload Avatar
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      className="border-50 rounded-md border bg-gray-50"
                      onChange={(event) =>
                        handleFileChange(event, formik.setFieldValue)
                      }
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className=" h-24 w-24 rounded-full object-cover"
                      />
                    )}
                    <ErrorMessage
                      name="profileImage"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 md:flex-row">
                <div className="flex flex-1 gap-4">
                  <NextLink href="#">
                    <button className="w-full rounded-lg border-1 border-warning bg-white px-6 py-2 text-warning transition-all ease-in-out hover:bg-warning hover:text-white dark:bg-black dark:text-white">
                      Update
                    </button>
                  </NextLink>
                  <NextLink href="/profile/update-profile">
                    <button className="w-full rounded-lg border-1 border-warning bg-warning px-6 py-2 text-warning hover:bg-warning hover:text-white">
                      Cancel
                    </button>
                  </NextLink>
                </div>
                <div className="flex flex-1 justify-end">
                  <NextLink href="#">
                    <Button className="w-full border-1 border-orange-500 bg-white text-orange-500 dark:bg-black dark:text-white md:w-auto">
                      Change Password
                    </Button>
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
