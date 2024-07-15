'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiEyeOffLine } from 'react-icons/ri';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiEye } from 'react-icons/fi';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: any) => {
    // console.log(values);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6 sm:p-8">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-zinc-800 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-lg font-bold text-transparent">
            DealKH
          </div>
          <div className="cursor-pointer" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 cursor-pointer p-2 text-transparent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="url(#gradient)"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-gray-50 sm:text-left">
          Reset your password
        </h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form>
              <div className="relative mb-4">
                <label
                  className="mb-3 block font-semibold text-slate-800 dark:text-gray-50"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  onChange={handleChange}
                  className="text-md w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 font-medium text-gray-700 hover:border-amber-500 focus:outline-none dark:text-gray-50"
                />
                <div
                  className="absolute inset-y-0 right-3 top-9 flex cursor-pointer items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <RiEyeOffLine size={20} color="gray" />
                  ) : (
                    <FiEye size={20} color="gray" />
                  )}
                </div>
              </div>
              <div className="relative mb-6">
                <label
                  className="mb-3 block font-semibold text-slate-800 dark:text-gray-50"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  className="text-md w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 font-medium text-gray-700 hover:border-amber-500 focus:outline-none dark:text-gray-50"
                />
                <div
                  className="absolute inset-y-0 right-3 top-9 flex cursor-pointer items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <RiEyeOffLine size={20} color="gray" />
                  ) : (
                    <FiEye size={20} color="gray" />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-white"
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

ResetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
