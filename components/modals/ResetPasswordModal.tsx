import React, { useState, ChangeEvent, useRef } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Link,
  Spacer,
} from '@nextui-org/react';
import CustomInput from '@/components/customInput/customInput';
import {
  useConfirmOtpMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
} from '@/redux/service/resetpassword';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  email: string;
}

interface EmailFormValues {
  email: string;
}

interface OtpFormValues {
  otp: string[];
}

interface PasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onOpenChange,
  email,
}) => {
  const [sendOtp] = useSendOtpMutation();
  const [confirmOtp] = useConfirmOtpMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [enteredEmail, setEnteredEmail] = useState<string>(email);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newCode = [...code];

    if (value.length === 1 && !isNaN(Number(value))) {
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      newCode[index] = '';
      setCode(newCode);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSendOtp = async (
    values: EmailFormValues,
    { setSubmitting }: FormikHelpers<EmailFormValues>
  ) => {
    try {
      await sendOtp({ email: values.email }).unwrap();
      setEnteredEmail(values.email);
      setStep(2);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      setVerificationError('Failed to send OTP');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmOtp = async (
    values: OtpFormValues,
    { setSubmitting }: FormikHelpers<OtpFormValues>
  ) => {
    const otp = code.reduce((acc, curr) => acc + curr, '');
    console.log('otp', otp);
    if (otp.length !== 6 || isNaN(Number(otp))) {
      setVerificationError('Invalid verification code');
      setSubmitting(false);
      return;
    }

    try {
      const response: any = await confirmOtp({ otp: Number(otp) }).unwrap();
      console.log('response', response);
      if (response.status === 200) {
        setStep(3);
      }
    } catch (error: any) {
      console.error('Failed to confirm OTP:', error);
      if (error?.status === 404 && error?.message) {
        setVerificationError(error.data.message);
      } else {
        setVerificationError('Invalid verification code');
      }
      setCode(Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitPassword = async (
    values: PasswordFormValues,
    { setSubmitting, setErrors }: FormikHelpers<PasswordFormValues>
  ) => {
    const otp = code.reduce((acc, curr) => acc + curr, '');
    if (otp.length !== 6 || isNaN(Number(otp))) {
      setVerificationError('OTP code is invalid');
      setSubmitting(false);
      return;
    }

    try {
      await resetPassword({
        otp: Number(otp),
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }).unwrap();
      alert('Password reset successfully!');
      onOpenChange(false);
    } catch (error: any) {
      console.error('Failed to reset password:', error);
      if (error.data && error.data.error && error.data.error.description) {
        const fieldErrors = error.data.error.description.reduce(
          (acc: any, { field, reason }: { field: string; reason: string }) => {
            acc[field] = reason;
            return acc;
          },
          {}
        );
        setErrors(fieldErrors);
      } else {
        setVerificationError('Failed to reset password');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await sendOtp({ email: enteredEmail }).unwrap();
      alert('OTP sent to your email!');
      setVerificationError('');
      setCode(Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP');
    }
  };

  const passwordValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password cannot be more than 20 characters long')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-50">
                {step === 1
                  ? 'Enter Email'
                  : step === 2
                    ? 'Enter Code'
                    : 'Reset Password'}
              </h3>
            </ModalHeader>
            <ModalBody className="flex flex-col items-center gap-4">
              {step === 1 ? (
                <Formik
                  initialValues={{ email: enteredEmail }}
                  onSubmit={handleSendOtp}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <CustomInput
                        label={'Email'}
                        name={'email'}
                        type={'email'}
                        placeholder={'Enter your email address'}
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        value={enteredEmail}
                      />
                      <Spacer y={1} />
                      {verificationError && (
                        <p className="mt-2 text-red-500">{verificationError}</p>
                      )}
                      <Button
                        type="submit"
                        className="mt-5 w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-lg text-white"
                        disabled={isSubmitting}
                      >
                        Send OTP
                      </Button>
                    </Form>
                  )}
                </Formik>
              ) : step === 2 ? (
                <Formik
                  initialValues={{ otp: code }}
                  onSubmit={handleConfirmOtp}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <p className="text-md mt-1 dark:text-gray-50">
                        We sent a code to{' '}
                        <span className="font-semibold">{enteredEmail}</span>
                      </p>
                      <div className="mt-5 flex items-center justify-center gap-2">
                        {code.map((value, index) => (
                          <div key={index} className="relative">
                            <div className="overflow-hidden rounded-md border-2 border-transparent">
                              <Field
                                type="number"
                                id={`otp${index}`}
                                name={`otp[${index}]`}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  handleChange(index, e)
                                }
                                value={value}
                                maxLength={1}
                                innerRef={(el: HTMLInputElement) =>
                                  (inputRefs.current[index] = el)
                                }
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
                        disabled={isSubmitting}
                      >
                        Confirm OTP
                      </Button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={{ newPassword, confirmPassword }}
                  validationSchema={passwordValidationSchema}
                  onSubmit={handleSubmitPassword}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <div className="mt-4">
                        <Field
                          as={Input}
                          fullWidth
                          label="New Password"
                          placeholder="Enter new password"
                          type="password"
                          name="newPassword"
                          className="mt-4"
                        />
                        {errors.newPassword && touched.newPassword ? (
                          <p className="mt-2 text-red-500">
                            {errors.newPassword}
                          </p>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <Field
                          as={Input}
                          fullWidth
                          label="Confirm Password"
                          placeholder="Confirm new password"
                          type="password"
                          name="confirmPassword"
                          className="mt-4"
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <p className="mt-2 text-red-500">
                            {errors.confirmPassword}
                          </p>
                        ) : null}
                      </div>
                      {verificationError && (
                        <p className="mt-2 text-red-500">{verificationError}</p>
                      )}
                      <Button
                        type="submit"
                        className="mt-5 w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-lg text-white"
                        disabled={isSubmitting}
                      >
                        Reset Password
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
