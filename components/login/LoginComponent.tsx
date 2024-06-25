'use client';

import React, { useEffect } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { Button, Checkbox } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { Cancel, Facebook, Google, Logo } from '@/components/icons';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from 'next-themes';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginUserMutation } from '@/redux/service/auth';
import CustomInput from '@/components/customInput/customInput';
import CustomPasswordInput from '@/components/customInput/CustomPasswordInputProps';

type FormValues = {
  email: string;
  password: string;
};

const initialValues: FormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export default function MyShop() {
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      await loginUser(values).unwrap();
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.data?.message) {
        setErrors({
          email: 'invalid email or password',
          password: 'invalid email or password',
        });
      } else {
        toast.error('An error occurred. Please try again later.', { theme });
      }
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div
      className=" bg-foreground-50 min-h-[500px] w-full rounded-xl  border-1.5 p-4  dark:border-0 sm:w-[500px] sm:px-7 sm:py-10"
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
        <div className={'my-5 flex items-center gap-1'}>
          <Logo size={46} />
          <h2 className=" bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold leading-9 tracking-tight text-transparent">
            Deal KH
          </h2>
        </div>
        <div>
          <h1 className=" text-3xl  font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            Sign in to your account
          </h1>
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Not a member?{' '}
          <NextLink
            href="/register"
            className="font-semibold text-primary-500 hover:text-blue-600"
          >
            Start a new account with us!
          </NextLink>
        </p>
      </div>

      <div className="mt-5">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form action="#" method="POST" className="space-y-5">
                <CustomInput
                  label={'Email'}
                  name={'email'}
                  type={'email'}
                  placeholder={'Enter your email address'}
                />
                <CustomPasswordInput
                  label={'Password'}
                  name={'password'}
                  placeholder={'Please enter your password'}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox defaultSelected color={'primary'}>
                      Remember me
                    </Checkbox>
                  </div>

                  <div className="text-sm leading-6">
                    <a
                      href="#"
                      className="font-semibold text-primary-500 hover:text-primary-600"
                    >
                      Forgot password?
                    </a>
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
                    Sign in
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-10">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-0 border-t border-foreground" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="text-foreground-900  bg-foreground-50 px-3 ">
                Or
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <NextLink
              href="#"
              className="bg-foreground-100 text-foregroundfocus-visible:outline flex w-full items-center justify-center gap-3 rounded-md border-1 border-gray-300 px-3 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              onClick={() => signIn('google')}
            >
              <Google />
              <span className="text-foreground-800 text-sm font-semibold leading-6">
                Google
              </span>
            </NextLink>

            <NextLink
              href="#"
              className="bg-foreground-100 text-foregroundfocus-visible:outline flex w-full items-center justify-center gap-3 rounded-md border-1 border-gray-300 px-3 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              onClick={() => signIn('facebook')}
            >
              <Facebook size={24} className={'text-primary-500'} />
              <span className="text-foreground-800 text-sm font-semibold leading-6">
                Facebook
              </span>
            </NextLink>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
