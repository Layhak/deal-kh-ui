'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../customInput/customInput';
import CustomSelect from '../customInput/CustomSelect';
import { IoImagesOutline } from 'react-icons/io5';
import { Cancel } from '../icons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import MapCreateShopComponent from '../Maps/MapCreateShopComponent';
import { Coordinates, ShopCreateRequest } from '../../types/shop';
import { useGetAllShopTypesQuery } from '../../redux/service/shopType';
import {
  useCreateShopMutation,
  useUploadShopImageMutation,
} from '../../redux/service/shop';

type CreateShopModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

const timeOptions = [
  { value: '00:00', label: '00:00' },
  { value: '01:00', label: '01:00' },
  { value: '02:00', label: '02:00' },
  { value: '03:00', label: '03:00' },
  { value: '04:00', label: '04:00' },
  { value: '05:00', label: '05:00' },
  { value: '06:00', label: '06:00' },
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
  { value: '24:00', label: '24:00' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(
      /^[a-zA-Z0-9\s\-]+$/,
      'Name must be properly formatted and can contain letters, numbers, single spaces, and single dashes'
    )
    .max(100, 'Name must be less than 100 characters'),
  address: Yup.string().required('Address is required'),
  slug: Yup.string().matches(
    /^[a-z0-9\-]+$/,
    'Slug must be properly formatted and can contain lowercase letters, numbers, and single dashes'
  ),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{9,10}$/, 'Phone number must be 9 or 10 digits long'),
  email: Yup.string()
    .email('Invalid email')
    .max(100, 'Email must be less than 100 characters'),
  openAt: Yup.string().required('Opening time is required'),
  closeAt: Yup.string()
    .required('Closing time is required')
    .test(
      'is-greater',
      'Closing time must be later than opening time',
      function (value) {
        const { openAt } = this.parent;
        return value > openAt;
      }
    ),
  shopType: Yup.string().required('Shop type is required'),
  location: Yup.string().required('Location is required'),
});

const CreateShopModal: React.FC<CreateShopModalProps> = ({
  isOpen,
  onClose,
  refetch,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [createShop] = useCreateShopMutation();
  const [uploadImage] = useUploadShopImageMutation();
  const [isUploading, setIsUploading] = useState(false);
  const {
    data: shopTypes,
    isLoading: isLoadingShopTypes,
    error,
  } = useGetAllShopTypesQuery();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLocationSelect = (
    location: Coordinates,
    address: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const locationString = `${location.lat},${location.lng}`;
    setFieldValue('location', locationString);
    setFieldValue('address', address);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setFieldValue('profile', file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (
    values: ShopCreateRequest,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setIsUploading(true);
    try {
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append('file', selectedFile);

        const response = await uploadImage(fileData).unwrap();
        values.profile = response.payload.fullUrl;
      }

      await createShop(values).unwrap();
      resetForm();
      refetch();
      toast.success('Shop created successfully! Please wait for approval.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create shop:', error);
    } finally {
      setIsUploading(false);
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: '',
    address: '',
    description: '',
    slug: '',
    phoneNumber: '',
    email: '',
    openAt: '',
    closeAt: '',
    shopType: '',
    location: '',
    socialMedias: [],
    profile: '',
  };

  if (error) {
    console.error('Error fetching shop types:', error);
    return <div>Error loading shop types</div>;
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent className="h-auto w-[90vw] max-w-[600px]">
        <ModalHeader className="dark:text-gray-100">DealKh</ModalHeader>
        {isLoggedIn === true && (
          <>
            <ModalBody className="text-2xl font-semibold dark:text-gray-100">
              Create New Shop
            </ModalBody>
            <ModalBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form className="space-y-4">
                    <CustomInput
                      label="Shop Name"
                      placeholder={'Shop Name'}
                      type="text"
                      name="name"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <CustomInput
                        label="Phone Number"
                        type="text"
                        placeholder={'092-984-123'}
                        name="phoneNumber"
                      />
                      <CustomInput
                        label="Email"
                        type="email"
                        name="email"
                        placeholder={'Enter your email'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <CustomSelect
                        label="Opening Time"
                        name="openAt"
                        options={timeOptions}
                        placeholder="Select Opening Time"
                      />
                      <CustomSelect
                        label="Closing Time"
                        name="closeAt"
                        options={timeOptions}
                        placeholder="Select Closing Time"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <CustomInput
                        label="Slug"
                        placeholder="deal-kh-shop"
                        type="text"
                        name="slug"
                      />
                      <CustomSelect
                        label="Shop Type"
                        name="shopType"
                        options={
                          shopTypes
                            ? shopTypes.map((type: any) => ({
                                value: type.slug,
                                label: type.name,
                              }))
                            : []
                        }
                        placeholder="Select Shop Type"
                      />
                    </div>

                    <div>
                      <label className="block pb-2 font-medium text-slate-900">
                        Location
                      </label>
                      <MapCreateShopComponent
                        onLocationSelect={(location: any, address: string) =>
                          handleLocationSelect(location, address, setFieldValue)
                        }
                      />
                    </div>
                    <div className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-foreground-50 p-4 dark:border-2 dark:border-foreground/40 dark:text-white">
                      <input
                        id="file-upload"
                        type="file"
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                      >
                        {preview ? (
                          <div className="relative">
                            <Image
                              src={preview}
                              width={100}
                              height={100}
                              alt="Preview"
                              className="rounded-lg object-cover"
                            />
                            <Button
                              isIconOnly
                              color={'danger'}
                              variant={'solid'}
                              radius={'full'}
                              size={'sm'}
                              className="transform-translate-y-1/2 absolute right-0 top-0 z-10 translate-x-1/2 p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                              }}
                            >
                              <Cancel size={28} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer"
                            >
                              <div className="rounded-full bg-slate-200 p-3">
                                <IoImagesOutline className="h-6 w-6 text-gray-600" />
                              </div>
                            </label>
                            <p className="mt-2 text-gray-500">
                              Click to upload Shop Profile
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                    <ModalFooter className="flex justify-between">
                      <Button
                        type="button"
                        onClick={onClose}
                        variant={'ghost'}
                        color={'warning'}
                        size={'md'}
                        className={'px-14 py-2'}
                        radius={'full'}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="text-md ml-4 w-full max-w-[10rem] rounded-full bg-gradient-to-r from-pink-500 to-warning-500/80 px-4 py-2 font-semibold text-white"
                        disabled={isUploading}
                        isLoading={isUploading}
                      >
                        {isUploading ? 'Creating...' : 'Create'}
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </>
        )}
        {isLoggedIn === false && (
          <ModalBody className="text-center text-lg font-semibold dark:text-gray-100">
            Redirecting to login...
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateShopModal;
