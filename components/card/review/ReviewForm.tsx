import React, { useState } from 'react';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, Tooltip, Image, Badge } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from 'next-themes';
import 'react-toastify/dist/ReactToastify.css';

import PromptInput from '@/components/card/review/PromptInput';
import { useUploadImagesMutation } from '@/redux/service/image';
import {
  useCreateProductFeedbackMutation,
  useLazyGetProductFeedbackQuery,
} from '@/redux/service/ratingAndFeedback';
import { Cancel, PhotoIcon, ShareIcon } from '@/components/icons';

interface ReviewFormProps {
  productSlug: string;
  onNewRating: () => void; // Add onNewRating prop
}

interface FormValues {
  description: string;
  productSlug: string;
  images: { file: File | null }[];
}

interface UploadedImage {
  url: string;
}

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
  description: Yup.string().required('Description is required').max(2000),
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
}: ReviewFormProps) {
  const [uploadImages] = useUploadImagesMutation();
  const [createFeedback] = useCreateProductFeedbackMutation();
  const [triggerGetProductFeedback] = useLazyGetProductFeedbackQuery();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { theme } = useTheme();
  const initialValues: FormValues = {
    description: '',
    productSlug,
    images: [],
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
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

        await createFeedback(feedbackData).unwrap();
        toast.success('Feedback submitted successfully.', { theme });
        resetForm();
        onNewRating(); // Call onNewRating to refetch data
      } catch (error) {
        console.error('Error uploading images or submitting feedback:', error);
        toast.error('Failed to submit feedback.', { theme });
      }
    },
  });

  const { values, handleSubmit, setFieldValue, isSubmitting } = formik;

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

  return (
    <FormikProvider value={formik}>
      <form
        className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70"
        onSubmit={handleSubmit}
      >
        <div className="group flex gap-2 px-4 pt-4">
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
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <ShareIcon size={20} />
                </Button>
              </Tooltip>
              <div className="flex items-end gap-2">
                <p className="py-1 text-tiny text-default-400">
                  {values.description.length}/2000
                </p>
                <Tooltip showArrow content="Send message">
                  <Button
                    color={!values.description ? 'default' : 'primary'}
                    isDisabled={!values.description}
                    radius="lg"
                    size="sm"
                    variant="solid"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    send message
                  </Button>
                </Tooltip>
              </div>
            </div>
          }
          minRows={3}
          radius="lg"
          startContent={
            <Tooltip showArrow content="Add Image">
              <Button
                isIconOnly
                as="label"
                radius="full"
                size="sm"
                variant="light"
              >
                <PhotoIcon size={20} />
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
          variant="flat"
          onValueChange={(val) => setFieldValue('description', val)}
        />
      </form>
      <ToastContainer />
    </FormikProvider>
  );
}
