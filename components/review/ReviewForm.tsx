import React, { useEffect, useState } from 'react';
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Badge,
  Button,
  Image,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import 'react-toastify/dist/ReactToastify.css';
import PromptInput from '@/components/review/PromptInput';
import { useUploadImagesMutation } from '@/redux/service/image';
import {
  useCreateProductFeedbackMutation,
  useCreateProductRatingMutation,
  useGetProductFeedbackQuery,
} from '@/redux/service/ratingAndFeedback';
import { Cancel, PhotoIcon, ShareIcon } from '@/components/icons';
import { useGetProfileQuery } from '@/redux/service/user';
import { useRouter } from 'next/navigation';
import RatingSlider from '@/components/review/RatingSlider';
import RatingDisplay from '@/components/review/RatingDisplay';

type ReviewFormProps = {
  productSlug: string;
  onNewRating: () => void;
  hasRated: boolean;
};

type FormValues = {
  description: string;
  productSlug: string;
  images: { file: File | null }[];
};

type UploadedImage = {
  url: string;
};

const fileValidation = Yup.mixed<any>()
  .nullable()
  .test('fileSize', 'File size should be less than 10MB', (value) => {
    if (!value) return true;
    return value.size <= 10 * 1024 * 1024;
  })
  .test('fileFormat', 'Unsupported Format', (value) => {
    if (!value) return true;
    return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
  });

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description is required')
    .max(2000)
    .trim('Please enter a valid description'),
  productSlug: Yup.string().required('Product slug is required'),
  images: Yup.array().of(
    Yup.object().shape({
      file: fileValidation,
    })
  ),
});

export default function ReviewForm({
  productSlug,
  onNewRating,
  hasRated,
}: ReviewFormProps) {
  const [uploadImages] = useUploadImagesMutation();
  const [createFeedback] = useCreateProductFeedbackMutation();
  const [createRating] = useCreateProductRatingMutation();
  const { data: feedbackData } = useGetProductFeedbackQuery({ productSlug });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [hasFeedback, setHasFeedback] = useState(false);
  const { theme } = useTheme();
  const { data: userData, isLoading: isLoadingUserData } = useGetProfileQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0.5);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setIsAuthenticated(true);
      if (feedbackData && Array.isArray(feedbackData.payload)) {
        const userFeedback = feedbackData.payload.find(
          (feedback: any) => feedback.username === userData.payload.username
        );
        setHasFeedback(!!userFeedback);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [userData, feedbackData]);

  const initialValues: FormValues = {
    description: '',
    productSlug,
    images: [],
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      openModal();
    },
  });

  const handleCombinedSubmit = async () => {
    const { values, resetForm, setErrors } = formik;

    try {
      let uploadedUrls: UploadedImage[] = [];

      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => {
          formData.append('files', file);
        });
        const imageResponse = await uploadImages(formData).unwrap();
        uploadedUrls = imageResponse.payload.map((file: any) => ({
          url: file.fullUrl,
        }));
      }

      const feedbackData = {
        description: values.description,
        productSlug: values.productSlug,
        images: uploadedUrls,
      };

      const ratingData = {
        ratingValue: rating,
        productSlug,
      };

      // console.log('Rating Data:', ratingData);
      // console.log('Feedback Data:', feedbackData);

      await createRating(ratingData).unwrap();

      await createFeedback(feedbackData).unwrap();

      toast.success('Feedback and rating submitted successfully.', {
        autoClose: 2000,
        theme: theme,
      });
      resetForm();
      setIsModalOpen(false);
      onNewRating(); // Call onNewRating to refetch data
    } catch (error: any) {
      console.error('Error:', error);
      if (error.status === 400) {
        console.error('Error data:', error.data);
      }
      if (error.status === 400 && error.data?.error?.description) {
        setErrors({ description: error.data.error.description });
      } else {
        toast.error('Failed to submit feedback or rating.', {
          autoClose: 2000,
          theme: theme,
        });
      }
    }
  };

  const { values, setFieldValue, isSubmitting } = formik;

  const onRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setFieldValue(
      'images',
      values.images.filter((_, i) => i !== index)
    );

    if (values.images.length === 1) {
      setFieldValue('images', []);
    }
  };

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles((prev) => prev.concat(filesArray));
      setFieldValue('images', [
        ...values.images,
        ...filesArray.map((file: File) => ({ file })),
      ]);
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    setRating(Array.isArray(value) ? value[0] : value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <FormikProvider value={formik}>
      <form
        className="flex w-full flex-col items-start rounded-medium bg-foreground-50 transition-colors hover:bg-foreground-100/70"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="group flex gap-2 ps-4 pt-4">
          <FieldArray name="images">
            {({ remove }) =>
              values.images.map((imageObj, index) => (
                <Badge
                  key={index}
                  isOneChar
                  className="opacity-0 group-hover:opacity-100"
                  content={
                    <Button
                      isIconOnly
                      radius="full"
                      size="sm"
                      variant="light"
                      onPress={() => {
                        onRemoveImage(index);
                        remove(index);
                      }}
                    >
                      <Cancel size={13} />
                    </Button>
                  }
                >
                  <Image
                    alt="uploaded image cover"
                    className="h-14 w-14 rounded-small border-small border-default-200/50 object-cover"
                    src={
                      imageObj.file ? URL.createObjectURL(imageObj.file) : ''
                    }
                  />
                </Badge>
              ))
            }
          </FieldArray>
        </div>
        <PromptInput
          classNames={{
            inputWrapper: '!bg-transparent shadow-none',
            innerWrapper: 'relative',
            input: 'pt-1 pb-6 !pr-10 text-medium',
          }}
          endContent={
            <div className="absolute right-0 flex h-full flex-col items-end justify-between gap-2">
              <Tooltip showArrow content="Share">
                <Button isIconOnly radius="full" size="sm" variant="solid">
                  <ShareIcon size={20} />
                </Button>
              </Tooltip>
              <div className="flex items-end gap-2">
                <p className="py-1 text-tiny text-default-400">
                  {values.description.length}/2000
                </p>
                {isLoadingUserData ? (
                  <Button
                    color="default"
                    radius="lg"
                    size="sm"
                    variant="solid"
                    isDisabled
                  >
                    Loading...
                  </Button>
                ) : isAuthenticated ? (
                  <Tooltip showArrow content="Send message">
                    <Button
                      color={
                        !values.description || hasFeedback
                          ? 'default'
                          : 'primary'
                      }
                      isDisabled={!values.description || hasFeedback}
                      radius="lg"
                      size="sm"
                      variant="solid"
                      className={
                        'bg-gradient-to-r from-pink-500 to-yellow-500 text-gray-50'
                      }
                      isLoading={isSubmitting}
                      onPress={openModal}
                    >
                      send message
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip showArrow content="Please sign in to send a message">
                    <Button
                      onClick={() => router.push('/login')}
                      color="default"
                      radius="lg"
                      size="sm"
                      variant="solid"
                      className={
                        'bg-gradient-to-r from-pink-500 to-yellow-500 text-gray-50'
                      }
                    >
                      Sign in to send
                    </Button>
                  </Tooltip>
                )}
              </div>
            </div>
          }
          minRows={3}
          radius="lg"
          startContent={
            <Tooltip showArrow content="Add Image">
              <Button isIconOnly as="label" radius="full" variant="light">
                <PhotoIcon size={28} />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={onAddImage}
                />
              </Button>
            </Tooltip>
          }
          value={values.description}
          variant={'flat'}
          onValueChange={(val) => setFieldValue('description', val)}
        />
      </form>
      <ErrorMessage
        name={'description'}
        component={'div'}
        className={'text-red-500'}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader className="flex-col pt-8">
            <h1 className="text-large font-semibold">Rate this product</h1>
            <p className="text-small font-normal text-default-400">
              Share your experience with this product
            </p>
          </ModalHeader>
          <ModalBody className="pb-8">
            <form
              className="flex flex-col gap-6"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleCombinedSubmit();
              }}
            >
              <div>
                <RatingSlider
                  rating={rating}
                  onRatingChange={handleSliderChange}
                />
                <div className="mt-4">
                  <RatingDisplay rating={rating} size={24} />
                  <p className="mt-2">{rating} stars</p>
                </div>
              </div>
              <Button
                color="primary"
                type="submit"
                className={'bg-gradient-to-r from-pink-500 to-warning-400 '}
                isDisabled={hasFeedback}
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormikProvider>
  );
}
