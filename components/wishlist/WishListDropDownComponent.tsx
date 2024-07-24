import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextArea from '@/components/customInput/CustomTextArea';
import { Product } from '@/libs/difinition';
import { WishiList } from '@/types/wishList';
import { useCreateWishListMutation } from '@/redux/service/wishList';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import CustomInput from '@/components/customInput/customInput';
import { useGetProfileQuery } from '@/redux/service/user';

const validationSchema = Yup.object({
  wishlistDescription: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters long'),
  wishlistPercentage: Yup.number()
    .min(0, 'Percentage must be at least 0')
    .max(100, 'Percentage must be at most 100')
    .required('Percentage is required'),
});

type WishListDropDownComponentProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product;
  refetchWishList?: () => void;
};

const WishListDropDownComponent: React.FC<WishListDropDownComponentProps> = ({
  isOpen,
  onOpenChange,
  product,
  refetchWishList,
}) => {
  const [createWishList, { isLoading }] = useCreateWishListMutation();
  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();
  const { theme } = useTheme();

  const initialValues = {
    wishlistDescription: '',
    wishedProductMessage: '',
    wishlistPercentage: '',
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm, setErrors }: any
  ) => {
    try {
      const discountPercentage = parseFloat(values.wishlistPercentage).toFixed(
        2
      );
      const wishListData: WishiList = {
        productSlug: product.slug,
        discountPercentage: Number(discountPercentage),
        description: values.wishlistDescription,
      };

      await createWishList(wishListData).unwrap();
      toast.success('Wish list created', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      resetForm();
      onOpenChange(false); // Close modal after submit
      if (refetchWishList) {
        refetchWishList();
      } // Refetch the wishlist data
    } catch (error: any) {
      if (
        error?.data?.error?.description ===
        'You have already wished this product!'
      ) {
        setErrors({
          wishedProductMessage:
            'You have already added this product to your wishlist!',
        });
      } else {
        console.error('Failed to create wishlist:', error);
      }
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
      backdrop={'blur'}
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
            {({ errors }) => (
              <Form className="space-y-4">
                <CustomInput
                  label="Wishlist Percentage"
                  name="wishlistPercentage"
                  type="text"
                  placeholder="Enter percentage (0-100)"
                />
                <CustomTextArea
                  label="Wishlist Description"
                  name="wishlistDescription"
                  placeholder="Make a wish here ✨..."
                  isDisabled={false}
                />
                {errors.wishedProductMessage && (
                  <div className="text-sm text-red-500">
                    {errors.wishedProductMessage}
                  </div>
                )}
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    className={'bg-gradient-to-r from-pink-500 to-warning-500'}
                    type="submit"
                    isLoading={isLoading}
                  >
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
