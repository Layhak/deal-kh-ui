import React from 'react';
import { HiOutlineX } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { Image } from '@nextui-org/react';

interface ProductDetails {
  imageUrl: string;
  name: string;
  description: string;
  price: string;
  category: string;
  discount: string;
  created: string;
}

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productDetails: ProductDetails;
}

const ViewProductModal: React.FC<ViewProductModalProps> = ({ isOpen, onClose, productDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-orange-600">DealKH</div>
          <div className="cursor-pointer dark:text-gray-100" onClick={onClose}>
            <HiOutlineX size={24} color="black" className="text-gray-600 font-semibold dark:text-gray-200" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-200 mb-6">Product Details</h2>
        <div className="flex">
          <div className="w-1/2 p-8 border rounded-lg mr-8 border-slate-200 dark:border-zinc-700">
            <Image src={productDetails.imageUrl} alt="Product" className="rounded-lg w-[300px] h-[250px] object-cover" />
          </div>
          <div className="w-1/2 p-8 border text-slate-900 dark:text-gray-200 rounded-lg border-slate-200 dark:border-zinc-700">
            <p className="mb-4"><strong>Name: </strong> {productDetails.name}</p>
            <p className="mb-4"><strong>Description: </strong> {productDetails.description}</p>
            <p className="mb-4"><strong>Price: </strong> {productDetails.price}</p>
            <p className="mb-4"><strong>Category: </strong> {productDetails.category}</p>
            <p className="mb-4"><strong>Discount: </strong> {productDetails.discount}</p>
            <p className="mb-4"><strong>Created on: </strong> {productDetails.created}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productDetails: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    discount: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewProductModal;
