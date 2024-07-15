import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, Link } from '@nextui-org/react';

interface EnterCodeVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnterCodeVerifyModal: React.FC<EnterCodeVerifyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [verificationCode, setVerificationCode] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [verificationError, setVerificationError] = useState<string>('');

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length === 1 && !isNaN(Number(value))) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = verificationCode.join('');
    if (code === '123456') {
      // console.log('Verification successful');
    } else {
      setVerificationError('Invalid verification code');
      setVerificationCode(['', '', '', '', '', '']);
    }
  };

  const handleResendCode = () => {
    // console.log('Resend code logic here');

    setVerificationCode(['', '', '', '', '', '']);
    setVerificationError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-lg font-bold text-transparent">
            DealKH
          </div>
          <div
            className="cursor-pointer rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={onClose}
          >
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
        <h2 className="text-2xl font-bold text-slate-800 dark:text-gray-50">
          Enter Code
        </h2>
        <p className="text-md mt-1 dark:text-gray-50">
          We sent a code to{' '}
          <span className="font-semibold">example@gmail.com</span>
        </p>
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form onSubmit={handleSubmit}>
            <div className="mt-5 flex items-center justify-center gap-2">
              {verificationCode.map((value, index) => (
                <div key={index} className="relative">
                  <div className="overflow-hidden rounded-md border-2 border-transparent">
                    <Field
                      type="text"
                      id={`verificationCode${index}`}
                      name={`verificationCode${index}`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(index, e)
                      }
                      value={value}
                      maxLength={1}
                      className="text-md h-12 w-12 bg-transparent px-3 py-2 text-center font-medium text-gray-700 hover:border-orange-500 focus:outline-none dark:text-gray-50"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-md border-1 border-gray-300"></div>
                </div>
              ))}
            </div>
            {verificationError && (
              <p className="mt-2 text-red-500">{verificationError}</p>
            )}
            <p className="mt-4 dark:text-gray-50">
              Did not get a code?{' '}
              <Link
                href="#"
                className="text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleResendCode();
                }}
              >
                Click to resend
              </Link>
            </p>
            <Button
              type="submit"
              className="mt-5 w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-lg text-white"
            >
              Submit
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

EnterCodeVerifyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EnterCodeVerifyModal;
