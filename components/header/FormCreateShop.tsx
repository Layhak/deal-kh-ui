import React, { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { Input, TimeInput } from "@nextui-org/react";

interface FormCreateShopProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormCreateShop: React.FC<FormCreateShopProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (!selectedImage) return;

    // Implement your upload logic here
    console.log('Uploading image:', selectedImage);

    // Reset the input and preview after upload
    setSelectedImage(null);
    setPreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">DealKH</div>
          <div className="cursor-pointer" onClick={onClose}>
            <HiOutlineX size={24} color="black" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Shop</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input type="name" variant="bordered" label="Name" />
          </div>
          <div>
            <Input type="text" variant="bordered" label="Contact" />
          </div>
          <div>
            <TimeInput isRequired variant="bordered" label="Close Time" />
          </div>
          <div>
            <TimeInput isRequired variant="bordered" label="Open Time" />
          </div>
          <div>
            <Input type="text" variant="bordered" label="Slug" />
          </div>
          <div>
            <Input type="email" variant="bordered" label="Email" />
          </div>
          <div>
            <Input type="text" variant="bordered" label="Shop type" />
          </div>
          <div>
            <Input type="text" variant="bordered" label="Location" />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-8 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

FormCreateShop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FormCreateShop;


// import React, { useState, useEffect } from 'react';
// import { HiMiniXMark } from 'react-icons/hi2';
// import PropTypes from 'prop-types';
// import { ShopCreateRequest, Coordinates } from '@/types/shop'; // Adjust the import paths as needed
// import MapComponent from '@/components/seller/map/MapComponent'; // Adjust the import path as needed
// import { useCreateShopMutation, useUploadImageMutation } from '@/redux/service/shop'; // Adjust the import path as needed
// import { useGetAllShopTypesQuery } from '@/redux/service/shopType'; // Adjust the import path as needed

// interface HeaderCreateShopProps {
//   isOpen: boolean;
//   onClose: () => void;
//   refetch: () => void;
// }

// const HeaderCreateShop: React.FC<HeaderCreateShopProps> = ({ isOpen, onClose, refetch }) => {
//   const [formData, setFormData] = useState<ShopCreateRequest>({
//     name: '',
//     address: '',
//     description: '',
//     slug: '',
//     phoneNumber: '',
//     email: '',
//     openAt: '',
//     closeAt: '',
//     shopType: '',
//     location: '',
//     images: [],
//   });

//   const [createShop] = useCreateShopMutation();
//   const [uploadImage] = useUploadImageMutation();
//   const [isUploading, setIsUploading] = useState(false);
//   const { data: shopTypes, isLoading: isLoadingShopTypes, error } = useGetAllShopTypesQuery();

//   useEffect(() => {
//     console.log('Shop types:', shopTypes);
//     console.log('Is loading shop types:', isLoadingShopTypes);
//     console.log('Error fetching shop types:', error);
//   }, [shopTypes, isLoadingShopTypes, error]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const file = e.target.files[0];
//       const fileData = new FormData();
//       fileData.append('file', file);

//       setIsUploading(true);
//       try {
//         const response = await uploadImage(fileData).unwrap();
//         setFormData((prevData) => ({
//           ...prevData,
//           images: [...(prevData.images ?? []), { url: response.payload.fullUrl }],
//         }));
//       } catch (error) {
//         console.error('Failed to upload image:', error);
//       } finally {
//         setIsUploading(false);
//       }
//     }
//   };

//   const handleLocationSelect = (location: Coordinates, address: string) => {
//     const locationString = `${location.lat},${location.lng}`;
//     setFormData((prevData) => ({
//       ...prevData,
//       location: locationString,
//       address,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createShop(formData).unwrap();
//       // Refetch data and close the modal after successful submission
//       refetch();
//       onClose();
//     } catch (error) {
//       console.error('Failed to create shop:', error);
//     }
//   };

//   if (!isOpen) return null;

//   if (error) {
//     console.error('Error fetching shop types:', error);
//     return <div>Error loading shop types</div>;
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="text-lg font-bold">DealKH</div>
//           <div className="cursor-pointer" onClick={onClose}>
//             <HiMiniXMark size={24} color="black" />
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Shop</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-slate-900 font-medium pb-2">Shop Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//                 placeholder="Shop Name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-slate-900 font-medium pb-2">Contact</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//                 placeholder="Phone Number"
//                 required
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-slate-900 font-medium pb-2">Opening Time</label>
//               <input
//                 type="text"
//                 name="openAt"
//                 value={formData.openAt}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//                 placeholder="08:00"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-slate-900 font-medium pb-2">Closing Time</label>
//               <input
//                 type="text"
//                 name="closeAt"
//                 value={formData.closeAt}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//                 placeholder="16:00"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-slate-900 font-medium pb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//               placeholder="Enter your description here..."
//               maxLength={500}
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-slate-900 font-medium pb-2">Slug</label>
//             <input
//               type="text"
//               name="slug"
//               value={formData.slug}
//               onChange={handleChange}
//               className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//               placeholder="Slug"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-slate-900 font-medium pb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//               placeholder="Email"
//               maxLength={100}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-slate-900 font-medium pb-2">Shop Type</label>
//             <select
//               name="shopType"
//               value={formData.shopType}
//               onChange={handleChange}
//               className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//               required
//             >
//               <option value="" disabled>Select Shop Type</option>
//               {isLoadingShopTypes ? (
//                 <option>Loading...</option>
//               ) : (
//                 shopTypes?.map((type: any) => (
//                   <option key={type.slug} value={type.slug}>
//                     {type.name}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>
//           <div className="">
//             <label className="block text-slate-900 font-medium pb-2">Location</label>
//             <MapComponent onLocationSelect={handleLocationSelect} />
//           </div>
//           <div className="mb-4">
//             <label className="block text-slate-900 font-medium pb-2">Images</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               className="w-full p-2 border border-stone-300 bg-slate-50 rounded-lg"
//             />
//             {isUploading && <p>Uploading...</p>}
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               className="px-8 py-2 border border-gray-300 border-orange-500 text-orange-600 font-semibold rounded-lg"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-8 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg"
//             >
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// HeaderCreateShop.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   refetch: PropTypes.func.isRequired,
// };

// export default HeaderCreateShop;
