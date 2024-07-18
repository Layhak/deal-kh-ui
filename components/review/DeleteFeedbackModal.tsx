import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import {
  useDeleteProductFeedbackMutation,
  useDeleteProductRatingMutation,
} from '@/redux/service/ratingAndFeedback';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';

type DeleteFeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  feedbackId: string;
  productSlug: string;
  refetchFeedback: () => void;
  refetchRatings: () => void;
};

const DeleteFeedbackModal: React.FC<DeleteFeedbackModalProps> = ({
  isOpen,
  onClose,
  feedbackId,
  productSlug,
  refetchFeedback,
  refetchRatings,
}) => {
  const [deleteFeedback, { isLoading: isDeletingFeedback }] =
    useDeleteProductFeedbackMutation();
  const [deleteRating, { isLoading: isDeletingRating }] =
    useDeleteProductRatingMutation();
  const { theme } = useTheme();

  const handleDelete = async () => {
    try {
      await deleteFeedback({ feedbackId }).unwrap();
      await deleteRating({ productSlug }).unwrap();
      toast.success('Successfully deleted your feedback and rating', {
        autoClose: 2000,
        theme: theme,
      });
      refetchFeedback();
      refetchRatings();
      onClose();
    } catch (error) {
      toast.error('Failed to delete feedback or rating', {
        autoClose: 2000,
        theme: theme,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Confirm Delete
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this feedback and rating?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleDelete}
              disabled={isDeletingFeedback || isDeletingRating}
            >
              Delete
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default DeleteFeedbackModal;
