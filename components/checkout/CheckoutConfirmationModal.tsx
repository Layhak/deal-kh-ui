import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useOrderProductMutation } from '@/redux/service/order';
import { toast } from 'react-toastify';
import { useGetProfileQuery } from '@/redux/service/user';
import { OrderRequest } from '@/types/order'; // Ensure you have this type

type CheckoutConfirmationModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  wishlistItemUuid: string;
  refetchWishList?: () => void;
};

const CheckoutConfirmationModal: React.FC<CheckoutConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  wishlistItemUuid,
  refetchWishList,
}) => {
  // Mutation to order products
  const [orderProduct, { isLoading: isOrdering }] = useOrderProductMutation();
  // Query to get user profile
  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();

  const handleOrderProduct = async () => {
    // Make sure userProfile is available
    if (!userProfile) {
      toast.error('Unable to get user profile');
      return;
    }

    // Prepare the order request payload
    const orderRequest: OrderRequest = {
      productSlugs: [wishlistItemUuid], // Adjust according to your API requirements
    };

    try {
      await orderProduct(orderRequest).unwrap();
      toast.success('Product has been ordered');
      onOpenChange(false); // Close modal after ordering
      if (refetchWishList) {
        refetchWishList(); // Refetch the wishlist data
      }
    } catch (error) {
      console.error('Failed to order product:', error);
      toast.error('Failed to order product');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      size="lg"
      backdrop="blur"
      isKeyboardDismissDisabled
    >
      <ModalContent className="rounded-lg bg-white p-6 shadow-lg">
        <ModalHeader className="border-b border-gray-200 text-3xl font-bold text-gray-900">
          Confirm Order
        </ModalHeader>
        <ModalBody className="py-4">
          <div className="space-y-4 text-base">
            <p className="text-2xl font-semibold text-gray-800">
              Our platform exclusively listing products that have discounts.
            </p>
            <p className="leading-relaxed text-gray-700">
              If you proceed with the order, we will notify the shop owner via
              email about this transaction. You may also reach out directly to
              the shop owner for further information or visit them in person.
            </p>
            <p className="text-lg font-semibold text-red-600">
              Are you sure you want to order this product?
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between gap-4">
          <Button
            color="danger"
            variant="light"
            onClick={() => onOpenChange(false)}
            disabled={isOrdering}
            className="w-full py-2"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 py-2 font-semibold text-white"
            onClick={handleOrderProduct}
            isLoading={isOrdering}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutConfirmationModal;
