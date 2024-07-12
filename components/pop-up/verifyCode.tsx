'use client';
import React, { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

interface VerifyCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerifyCodeModal: React.FC<VerifyCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = async (values: { email: string }) => {
    // Simulate sending email verification logic
    try {
      // Replace with actual API call to send email verification
      // For simulation purposes, assume it's successful immediately
      const response = await sendEmailVerification(values.email);
      setVerificationCodeSent(true);
      setVerificationCode(response.verificationCode); // Example: Assuming the server returns the verification code
      setError('');
    } catch (error) {
      setError('Failed to send verification code. Please try again.');
    }
  };

  const handleSubmitVerificationCode = async (values: {
    verificationCode: string;
  }) => {
    // Handle verification code submission logic
    // console.log('Verification code submitted:', values.verificationCode);
    // Add your logic to handle the verification code here
  };

  const sendEmailVerification = async (email: string) => {
    // Simulated API call - replace with actual API call
    // Example: You would send a POST request to your backend to send an email with verification code
    return new Promise<{ verificationCode: string }>((resolve, reject) => {
      // Simulating a delay and then resolving with a mock verification code
      setTimeout(() => {
        const mockVerificationCode = generateMockVerificationCode(); // Simulated verification code
        resolve({ verificationCode: mockVerificationCode });
      }, 1500); // Simulate delay of 1.5 seconds
    });
  };

  const generateMockVerificationCode = () => {
    // Generate a random 6-digit number as a mock verification code
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-lg font-bold text-transparent">
            DealKH
          </div>
          <div className="cursor-pointer" onClick={onClose}>
            <HiOutlineX
              size={30}
              className="rounded-full p-2 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
            />
          </div>
        </div>
        <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-gray-50">
          Email Verification
        </h2>
        {verificationCodeSent ? (
          <div>
            <p className="mb-4 dark:text-gray-50">
              Verification code sent to{' '}
              <span className="font-semibold">{email}</span>.
            </p>
            <p className="mb-4 dark:text-gray-50">
              Check your email and enter the code below:
            </p>
            <Formik
              initialValues={{ verificationCode: '' }}
              onSubmit={handleSubmitVerificationCode}
            >
              <Form>
                <div className="relative mb-6 dark:text-gray-50">
                  <Field
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setVerificationCode(e.target.value)
                    }
                    placeholder="Enter verification code"
                    className="w-full rounded-md border border-stone-200 px-3 py-2 text-black hover:border-warning-500 focus:outline-none dark:text-gray-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-white"
                >
                  Verify Code
                </button>
              </Form>
            </Formik>
          </div>
        ) : (
          <Formik initialValues={{ email: '' }} onSubmit={handleSubmitEmail}>
            <Form>
              <div className="relative mb-6">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                  className="w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-black hover:border-warning-500 focus:outline-none dark:text-gray-50"
                />
              </div>
              {error && <p className="mb-4 text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-white"
              >
                Send the verification code
              </button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

VerifyCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VerifyCodeModal;
