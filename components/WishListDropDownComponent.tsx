import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
} from '@nextui-org/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextArea from '@/components/customInput/CustomTextArea';
import { Product } from '@/libs/difinition';
import { WishiList } from '@/types/wishList';
import { useCreateWishListMutation } from '@/redux/service/wishList';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  wishlistDescription: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters long'),
  wishlistPercentage: Yup.number()
    .min(0, 'Percentage must be at least 0')
    .max(1, 'Percentage must be at most 1')
    .required('Percentage is required'),
});

type WishListDropDownComponentProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product;
};

const WishListDropDownComponent: React.FC<WishListDropDownComponentProps> = ({
  isOpen,
  onOpenChange,
  product,
}) => {
  const [createWishList, { isLoading }] = useCreateWishListMutation();

  const initialValues = {
    wishlistDescription: '',
    wishlistPercentage: 0,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const wishListData: WishiList = {
        productSlug: product.slug,
        discountPercentage: values.wishlistPercentage,
        description: values.wishlistDescription,
      };

      await createWishList(wishListData).unwrap();
      toast.success('Wish list created');
      resetForm();
      onOpenChange(false); // Close modal after submit
    } catch (error) {
      console.error('Failed to create wishlist:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      size="lg"
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader>Wishlist</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <Slider
                  label="Wishlist Percentage"
                  step={0.1}
                  color="warning"
                  maxValue={1}
                  minValue={0}
                  defaultValue={initialValues.wishlistPercentage}
                  showSteps={true}
                  showTooltip={true}
                  showOutline={true}
                  disableThumbScale={true}
                  formatOptions={{
                    style: 'percent',
                    maximumFractionDigits: 0,
                  }}
                  tooltipValueFormatOptions={{
                    style: 'percent',
                    maximumFractionDigits: 0,
                  }}
                  classNames={{
                    base: 'w-[450px]',
                    filler: 'bg-gradient-to-r from-yellow-500 to-pink-500',
                    labelWrapper: 'mb-2',
                    label: 'block text-sm font-medium text-gray-700',
                    value: 'font-medium text-default-500 text-small',
                    thumb: [
                      'transition-size',
                      'bg-gradient-to-r from-pink-500 to-yellow-500',
                      'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
                      'data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6',
                    ],
                    step: 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50',
                  }}
                  tooltipProps={{
                    offset: 10,
                    placement: 'bottom',
                    classNames: {
                      base: [
                        'before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500',
                      ],
                      content: [
                        'py-2 shadow-xl',
                        'text-white bg-gradient-to-r from-pink-500 to-yellow-500',
                      ],
                    },
                  }}
                  onChange={(value: any) =>
                    setFieldValue('wishlistPercentage', value)
                  }
                />
                <CustomTextArea
                  label="Wishlist Description"
                  name="wishlistDescription"
                  placeholder="Make a wish here ✨..."
                  isDisabled={false}
                />
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                  <Button color="primary" type="submit" isLoading={isLoading}>
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WishListDropDownComponent;
