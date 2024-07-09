import React from 'react';
import PropTypes from 'prop-types';
import { HiMiniXMark } from 'react-icons/hi2';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ isOpen, onClose, onDelete, productName }) => {
  const handleDelete = () => {
    onDelete(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-orange-600">DealKH</div>
          <div className="cursor-pointer" onClick={onClose}>
            <HiMiniXMark size={24} color="black" />
          </div>
        </div>
        <div className="flex text-center dark:text-gray-100 items-center justify-center m-5 text-slate-900 font-medium text-lg">
          Are you sure you want to delete {productName}?
        </div>
        <div className="flex justify-center space-x-4 mt-5">
          <button
            type="button"
            className="px-4 py-2 border border-orange-500 text-orange-600 font-semibold rounded-lg"
            onClick={onClose}
          >
            No
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};

export default DeleteProductModal;
