// CheckoutConfirmationModal.tsx
import React from 'react';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useGetProfileQuery } from '../../redux/service/user';
import { useOrderProductMutation } from '../../redux/service/order';
import { useAppDispatch } from '../../redux/hook';
import { clearCart } from '../../redux/feature/cart/cartSlice';

type CheckoutConfirmationModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  products: { name: string; slug: string }[];
  refetchWishList?: () => void;
};

const CheckoutConfirmationModal: React.FC<CheckoutConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  products,
  refetchWishList,
}) => {
  const dispatch = useAppDispatch();
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
    const orderRequest = {
      productSlugs: products.map((product) => product.slug), // Pass the product slugs
    };

    try {
      await orderProduct(orderRequest).unwrap();
      toast.success('Products have been ordered');
      dispatch(clearCart()); // Clear the cart after confirming the order
      onOpenChange(false); // Close modal after ordering
      if (refetchWishList) {
        refetchWishList(); // Refetch the wishlist data
      }
    } catch (error) {
      console.error('Failed to order products:', error);
      toast.error('Failed to order products');
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
      <ModalContent className="rounded-lg bg-foreground-50 p-6 shadow-lg">
        <ModalHeader className=" inline-flex flex-col items-center justify-center text-3xl font-bold text-foreground-900">
          Confirm Order
          <Divider
            className={'h-1 w-1/2 bg-gradient-to-r from-pink-500 to-yellow-500'}
          />
        </ModalHeader>
        <ModalBody className="py-4">
          <div className="space-y-4 text-base">
            <p className="text-2xl font-semibold text-foreground-600">
              Our platform exclusively lists products that have discounts.
            </p>
            <p className="leading-relaxed text-foreground-500">
              If you proceed with the order, we will notify the shop owner via
              email about this transaction. You may also reach out directly to
              the shop owner for further information or visit them in person.
            </p>
            <p className="text-lg font-semibold text-red-600">
              Are you sure you want to order these products?
            </p>
            <ul className="list-disc pl-5 text-foreground-500">
              {products.map((product) => (
                <li key={product.slug}>{product.name}</li>
              ))}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between gap-4">
          <Button
            color="danger"
            variant="bordered"
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
