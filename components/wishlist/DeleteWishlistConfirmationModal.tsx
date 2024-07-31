import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useDeleteWishListMutation } from '@/redux/service/wishList';
import { toast } from 'react-toastify';
import { useGetProfileQuery } from '@/redux/service/user';
import { useTheme } from 'next-themes';

type DeleteWishListConfirmationModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  wishlistItemUuid: string;
  refetchWishList?: () => void;
};

const DeleteWishListConfirmationModal: React.FC<
  DeleteWishListConfirmationModalProps
> = ({ isOpen, onOpenChange, wishlistItemUuid, refetchWishList }) => {
  const [deleteWishList, { isLoading }] = useDeleteWishListMutation();
  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileQuery();
  const { theme } = useTheme();

  // useEffect(() => {
  //   if (userProfile && refetchWishList) {
  //     refetchWishList();
  //   }
  // }, [userProfile, refetchWishList]);

  const handleDelete = async () => {
    try {
      await deleteWishList({ uuid: wishlistItemUuid }).unwrap();
      toast.success('Wishlist item removed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      onOpenChange(false); // Close modal after delete
      if (refetchWishList) {
        refetchWishList();
      } // Refetch the wishlist data
    } catch (error) {
      console.error('Failed to remove wishlist item:', error);
      toast.error('Failed to remove wishlist item');
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
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this item from your wishlist?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className={'bg-gradient-to-r from-pink-500 to-warning-500'}
            onClick={handleDelete}
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteWishListConfirmationModal;
