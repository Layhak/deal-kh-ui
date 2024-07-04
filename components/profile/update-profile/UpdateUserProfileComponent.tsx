"use client"
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { Button, Link } from "@nextui-org/react";
import ResetPasswordModal from "@/components/pop-up/resetPassword";
import { useGetProfileQuery } from "@/redux/service/user";

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
  coverImage: File | null;
}

const UpdateProfileComponent: React.FC = () => {

  const [sellerData, setSellerData] = useState<any>(null);

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const response = await fetch('{{base-url}}/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setSellerData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSellerData();
    }, []);

    const {
      data: userProfile,
      isLoading: isLoadingUserProfile,
      error,
    } = useGetProfileQuery();

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
    coverImage: null,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("password", values.password);
      formData.append("location", values.location);
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }
      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }

      const response = await fetch("/api/updateProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Internal server error:", error);
    } finally {
      actions.setSubmitting(false); // Reset submitting state in Formik
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikProps<FormValues>
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      formik.setFieldValue("profileImage", file); // Update Formik values
    } else {
      setProfileImagePreview(null);
      formik.setFieldValue("profileImage", null); // Reset Formik value
    }
  };

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikProps<FormValues>
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      formik.setFieldValue("coverImage", file); // Update Formik values
    } else {
      setCoverImagePreview(null);
      formik.setFieldValue("coverImage", null); // Reset Formik value
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleProfileImageClick = () => {
    profileImageRef.current?.click();
  };

  const handleCoverImageClick = () => {
    coverImageRef.current?.click();
  };

  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    dateOfBirth: Yup.date(),
    phoneNumber: Yup.string(),
    email: Yup.string(),
    gender: Yup.string(),
    password: Yup.string(),
    location: Yup.string(),
    profileImage: Yup.mixed(),
    coverImage: Yup.mixed(),
  });

  const profileImageRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="my-4">
        <p className="text-xl font-semibold">Update Profile</p>
      </div>
      <div className="mx-auto p-4 bg-white rounded-lg dark:text-gray-200 dark:bg-zinc-900 text-black">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="m-4">
            {/* Responsive grid layout */}
            {/* <div>
              <div className="flex flex-wrap gap-8 mb-5">
                <div>
                  <p className="mb-4 text-lg font-semibold">Profile</p>
                  <div
                    className="lg:mb-4 p-4 w-[300px] h-[200px] border-dashed border-2 border-stone-300 bg-slate-50 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    onDrop={handleDragOver}
                    onClick={handleProfileImageClick}
                  >
                    {!profileImagePreview && (
                      <>
                        <button
                          type="button"
                          className="bg-gray-200 rounded-full flex items-center justify-center"
                          onClick={handleProfileImageClick}
                        >
                          <div className="bg-slate-200 rounded-full p-3">
                            <IoImagesOutline className="w-6 h-6 text-gray-600" />
                          </div>
                        </button>
                        <p className="text-gray-500 mt-2">Click to upload or drag and drop</p>
                      </>
                    )}
                    {profileImagePreview && (
                      <Image
                        src={profileImagePreview}
                        alt="Profile Preview"
                        width={200}
                        height={130}
                        className="w-full h-[150px] object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <input
                    id="file-upload-profile"
                    type="file"
                    onChange={(e) => handleProfileImageChange(e, formik)}
                    className="hidden"
                    ref={profileImageRef}
                  />
                </div>

                <div>
                  <p className="mb-4 text-lg font-semibold">Cover</p>
                  <div
                    className="mb-4 p-4 w-[300px] h-[200px] border-dashed border-2 border-stone-300 bg-slate-50 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    onDrop={handleDragOver}
                    onClick={handleCoverImageClick}
                  >
                    {!coverImagePreview && (
                      <>
                        <button
                          type="button"
                          className="bg-gray-200 rounded-full flex items-center justify-center"
                          onClick={handleCoverImageClick}
                        >
                          <div className="bg-slate-200 rounded-full p-3">
                            <IoImagesOutline className="w-6 h-6 text-gray-600" />
                          </div>
                        </button>
                        <p className="text-gray-500 mt-2">Click to upload or drag and drop</p>
                      </>
                    )}
                    {coverImagePreview && (
                      <Image
                        src={coverImagePreview}
                        alt="Cover Preview"
                        width={200}
                        height={130}
                        className="w-full h-[150px] object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <input
                    id="file-upload-cover"
                    type="file"
                    onChange={(e) => handleCoverImageChange(e, formik)}
                    className="hidden"
                    ref={coverImageRef}
                  />
                </div>
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-6 md:gap-5 gap-5">
              <div className="flex flex-col ">
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
                  value={userProfile?.payload?.firstName}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col ">
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
                  value={userProfile?.payload?.lastName ?? 'John Doe'}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col">
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
                  value={userProfile?.payload?.dob ?? '1999-11-22'}
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col">
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
                  value={userProfile?.payload?.phonenumber}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col ">
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
                  value={userProfile?.payload?.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col ">
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
                  value={userProfile?.payload?.gender}
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

            <div className="flex flex-col mt-5 mb-5 lg:mb-10">
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
                value={userProfile?.payload?.location}
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-600"
              />
            </div>

            {/* Buttons and Modals */}
            <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />

            <div className="flex justify-between flex-wrap gap-3 pt-3 mb-4 lg:mt-3">
              <div>
                <Link>
                  <p
                    className="text-xl font-bold cursor-pointer  text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                    onClick={openModal}
                  >
                    Change Password
                  </p>
                </Link>
              </div>
              <div>
                <Button
                  className="border-2 border-amber-500 px-4 py-2 mr-5 text-md font-semibold text-orange-500 dark:text-white rounded-md"
                  variant="bordered"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  <span className="relative z-10 text-amber-500">Update</span>
                </Button>
                <Link href="/profiles/profileSellerUpdate">
                  <Button
                    className="px-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-md py-2 dark:text-white rounded-md"
                    type="button"
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
    </div>
  );
};

export default UpdateProfileComponent;



