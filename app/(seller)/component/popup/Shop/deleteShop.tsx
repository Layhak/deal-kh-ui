import React from 'react';
import PropTypes from 'prop-types';
import { HiMiniXMark } from 'react-icons/hi2';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  shopName: string;
}

const DeleteShopModal: React.FC<DeleteProductModalProps> = ({ isOpen, onClose, onDelete, shopName }) => {
  const handleDelete = () => {
    onDelete(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-orange-600">DealKH</div>
          <div className="cursor-pointer" onClick={onClose}>
            <HiMiniXMark size={24} color="black" />
          </div>
        </div>
        <div className="flex justify-center m-5 text-slate-900 font-medium text-lg">
          Are you sure you want to delete {shopName}?
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

DeleteShopModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  shopName: PropTypes.string.isRequired,
};

export default DeleteShopModal;
