import React from 'react';
import { HiOutlineX } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { Image } from '@nextui-org/react';

interface ShopDetails {
  imageUrl: string;
  name: string;
  owner: string;
  description: string;
  address: string;
  contact: string;
  created: string;
}

interface ViewShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopDetails: ShopDetails;
}

const ViewShopModal: React.FC<ViewShopModalProps> = ({ isOpen, onClose, shopDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-orange-600">DealKH</div>
          <div className="cursor-pointer" onClick={onClose}>
            <HiOutlineX size={24} color="black" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-200 mb-6">Product Details</h2>
        <div className="flex">
          <div className="w-1/2 p-8 border rounded-lg mr-8 border-slate-200 dark:border-zinc-700">
            <Image src={shopDetails.imageUrl} alt="Product" className="rounded-lg w-[300px] h-[250px] object-cover" />
          </div>
          <div className="w-1/2 p-8 border text-slate-900 dark:text-gray-200 rounded-lg border-slate-200 dark:border-zinc-700">
            <p className="mb-4"><strong>Name: </strong> {shopDetails.name}</p>
            <p className="mb-4"><strong>Owner: </strong> {shopDetails.owner}</p>
            <p className="mb-4"><strong>Description: </strong> {shopDetails.description}</p>
            <p className="mb-4"><strong>Address: </strong> {shopDetails.address}</p>
            <p className="mb-4"><strong>Contact: </strong> {shopDetails.contact}</p>
            <p className="mb-4"><strong>Created at: </strong> {shopDetails.created}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewShopModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  shopDetails: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewShopModalProps;
