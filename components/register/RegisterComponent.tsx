'use client';

import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { Cancel, Facebook, Google, Logo } from '@/components/icons';
import { ToastContainer } from 'react-toastify';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRegisterUserMutation } from '@/redux/service/auth';
import { togglePasswordVisibility } from '@/redux/feature/password/passwordVisibilitySlice';
import CustomSelect from '@/components/customSelect/CustomSelect';
import { router } from 'next/client';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
  gender: string;
  phoneNumber: string;
  dob: string;
  location: string;
}

const initialValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
  gender: '',
  phoneNumber: '',
  dob: '',
  location: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: Yup.string().required('Gender is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  dob: Yup.date().required('Date of birth is required').nullable(),
  location: Yup.string().required('Location is required'),
});

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const showPassword = useAppSelector((state) => state.passwordVisibility);
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const onSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setStatus }: any
  ) => {
    setSubmitting(true);
    try {
      const response = await registerUser(values).unwrap();
      console.log('Register successful!', response);
      await router.push('/');
      // Handle successful register (e.g., redirect)
    } catch (error) {
      console.error('Error:', error);
      setStatus({ message: 'Something went wrong. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

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
  const handleShowPassword = () => {
    dispatch(togglePasswordVisibility());
  };

  return (
    <div
      className="min-h-[500px] w-full rounded-xl border-1.5 bg-gray-50 p-4 dark:border-0  dark:bg-gray-950 sm:w-[500px] sm:px-7 sm:py-5"
      data-aos="flip-up"
    >
      <div className={'flex items-center justify-between'}>
        <NextLink href="/">
          <Button
            color={'danger'}
            radius={'full'}
            variant={'bordered'}
            className={'border-0'}
            size={'sm'}
            isIconOnly={true}
          >
            <Cancel size={28} />
          </Button>
        </NextLink>
        <ThemeSwitch />
      </div>
      <div>
        <div className={'my-2 flex items-center gap-1'}>
          <Logo size={46} />
          <h2 className=" bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold leading-9 tracking-tight text-transparent">
            Deal KH
          </h2>
        </div>
        <div>
          <h1 className=" text-3xl  font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            Create your account
          </h1>
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Already become our member?{' '}
          <NextLink
            href="/login"
            className="font-semibold text-primary-500 hover:text-blue-600"
          >
            Login here!
          </NextLink>
        </p>
      </div>

      <div className="mt-5">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form action="#" method="POST" className="space-y-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="firstName"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="lastName"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="username"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="email"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {!showPassword ? (
                      <IoEyeOffSharp
                        onClick={() => handleShowPassword()}
                        className="absolute right-3 top-3 cursor-pointer"
                      />
                    ) : (
                      <IoEyeSharp
                        onClick={() => handleShowPassword()}
                        className="absolute right-3 top-3 cursor-pointer"
                      />
                    )}
                    <ErrorMessage
                      name="password"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmedPassword"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-2">
                    <Field
                      id="confirmedPassword"
                      name="confirmedPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {!showPassword ? (
                      <IoEyeOffSharp
                        onClick={() => handleShowPassword()}
                        className="absolute right-3 top-3 cursor-pointer"
                      />
                    ) : (
                      <IoEyeSharp
                        onClick={() => handleShowPassword()}
                        className="absolute right-3 top-3 cursor-pointer"
                      />
                    )}
                    <ErrorMessage
                      name="confirmedPassword"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Gender
                  </label>
                  <div className="mt-2">
                    <CustomSelect
                      label="Gender"
                      name="gender"
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                      ]}
                      placeholder="Select gender"
                    />
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="section"
                    className={'text-danger'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      autoComplete="phoneNumber"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-2">
                    <Field
                      id="dob"
                      name="dob"
                      type="date"
                      autoComplete="dob"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="dob"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <Field
                      id="location"
                      name="location"
                      type="text"
                      autoComplete="location"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-foreground focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="location"
                      component="section"
                      className={'text-danger'}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="acceptPolicy"
                      name="acceptPolicy"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="acceptPolicy"
                      className="ml-2 block text-sm text-foreground"
                    >
                      I agree with the term and condition
                    </label>
                  </div>
                </div>

                <div>
                  <Button
                    color={'warning'}
                    className={
                      ' w-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-lg  text-gray-50 '
                    }
                    type="submit"
                    variant={'solid'}
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-5">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-gray-100  px-3 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
                Or
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <NextLink
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md border-1 border-gray-300 bg-gray-50 px-3 py-1.5 text-white hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              onClick={handleLoginGoogle}
            >
              <Google />
              <span className="text-sm font-semibold leading-6 text-gray-800">
                Google
              </span>
            </NextLink>

            <NextLink
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md border-1 border-gray-300 bg-gray-50 px-3 py-1 text-white hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              onClick={handleLoginFacebook}
            >
              <Facebook size={24} className={'text-primary-500'} />
              <span className="text-sm font-semibold leading-6 text-gray-800">
                Facebook
              </span>
            </NextLink>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
