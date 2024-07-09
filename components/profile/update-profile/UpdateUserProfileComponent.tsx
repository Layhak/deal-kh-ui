"use client"
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, Link } from "@nextui-org/react";
import ResetPasswordModal from "@/components/pop-up/resetPassword";
import { useGetProfileQuery, useUpdateUserByUsernameMutation } from "@/redux/service/user";
import { UserUpdateRequest } from "@/types/profile";

const UpdateProfileComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userProfile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserByUsernameMutation();

  const initialValues: UserUpdateRequest = {
    firstName: userProfile?.payload?.firstName || '',
    lastName: userProfile?.payload?.lastName || '',
    dob: userProfile?.payload?.dob || '',
    phoneNumber: userProfile?.payload?.phoneNumber || '',
    email: userProfile?.payload?.email || '',
    gender: userProfile?.payload?.gender || '', 
    location: userProfile?.payload?.location || '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    dateOfBirth: Yup.date(),
    phoneNumber: Yup.string(),
    email: Yup.string(),
    gender: Yup.string(),
    location: Yup.string(),
  });

  const onSubmit = async (values: UserUpdateRequest, actions: FormikHelpers<UserUpdateRequest>) => {
    try {
      const { ...restValues } = values;

      const mutationResult = await updateProfile({
        userUpdateRequest: restValues
      });

      console.log("Mutation result:", mutationResult);

    } catch (error) {
      console.error("Mutation error:", error);
    } finally {
      actions.setSubmitting(false); 
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Update Profile</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col form-group">
                <label
                  className="mb-2 text-gray-700 font-bold dark:text-white"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <Field
                  className="border-1 bg-transparent dark:text-gray-200 placeholder:text-lg px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-lg focus:outline-none hover:border-amber-400"
                  type="text"
                  id="firstName"
                  name="firstName"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col form-group">
                <label
                  className="mb-2 text-gray-700 font-bold dark:text-white"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <Field
                  className="border-1 bg-transparent dark:text-gray-200 placeholder:text-lg px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-lg focus:outline-none hover:border-amber-400"
                  type="text"
                  id="lastName"
                  name="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col form-group">
                <label
                  className="mb-2 text-gray-700 font-bold dark:text-white"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <Field
                  className="border-1 bg-transparent dark:text-gray-200 placeholder:text-lg px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-lg focus:outline-none hover:border-amber-400"
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col form-group">
                <label
                  className="mb-2 text-gray-700 font-bold dark:text-white"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <Field
                  className="border-1 bg-transparent dark:text-gray-200 placeholder:text-lg px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-lg focus:outline-none hover:border-amber-400"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col form-group">
                <label
                  className="mb-2 text-gray-700 font-bold dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="border-1 bg-transparent dark:text-gray-200 placeholder:text-lg px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-lg focus:outline-none hover:border-amber-400"
                  type="email"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col form-group">
                <label
                  className="mb-2 text-gray-700 font-bold dark:text-white"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <Field  
                  className="border-1 bg-transparent dark:text-gray-200 dark:bg-zinc-800 placeholder:text-lg px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-lg focus:outline-none hover:border-amber-400"
                  as="select"
                  id="gender"
                  name="gender"
                >
                  <option value="Select" className="bg-slate-50 dark:bg-zinc-800 text-gray-700">
                    Select
                  </option>
                  <option value="male" className="bg-slate-50 text-gray-700">
                    Male
                  </option>
                  <option value="female" className="bg-slate-50 text-gray-700">
                    Female
                  </option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>

            <div className="flex flex-col mt-5 mb-5 lg:mb-10 form-group">
              <label
                className="mb-2 text-gray-700 font-bold dark:text-white"
                htmlFor="location"
              >
                Location
              </label>
              <Field
                className="border-1 bg-transparent dark:text-gray-200 placeholder:text-lg px-3 py-2 text-gray-700 font-medium text-md border-stone-200 bg-slate-50 rounded-lg focus:outline-none hover:border-amber-400"
                type="text"
                id="location"
                name="location"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-600"
              />
            </div>

            <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />

            <div className="flex justify-between items-center mt-5">
              <Link>
                <Button
                  type="button"
                  className="text-md font-semibold text-amber-500"
                  onClick={openModal}
                >
                  Change Password
                </Button>
              </Link>
              <div>
                <Button
                  type="submit"
                  className="border-2 border-amber-500 px-4 py-2 mr-5 text-md font-semibold text-orange-500 dark:text-white rounded-md"
                  disabled={!formik.isValid || formik.isSubmitting || isUpdating}
                >
                  <span className="relative z-10">Update</span>
                </Button>
                <Link href="/profile">
                  <Button
                    type="button"
                    className="px-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-md py-2 dark:text-white rounded-md"
                  >
                    <span className="relative z-10">Cancel</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfileComponent;



