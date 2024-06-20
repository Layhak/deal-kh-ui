import React, { useRef, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '@/components/icons';
import { IoImagesOutline } from "react-icons/io5";

export default function UpdateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque'); 
  const fileInputRef = useRef(null);

  const handleOpen = (backdrop: React.SetStateAction<string>) => {
    if (backdrop === "create product") {
      setBackdrop("blur"); 
    } else {
      setBackdrop(backdrop); 
    }
    onOpen();
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); 
  const handleFileChange = (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null); 
    }
  };

  const handleDrop = (event: { preventDefault: () => void; dataTransfer: { files: any[]; }; }) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null); 
    }
  };

  const handleDragOver = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const handleImageClick = () => {
    document.getElementById('file-upload').click();
  };

  return (
    <>
      <Button
        variant="flat"
        color="warning"
        onClick={() => handleOpen("create product")}
        startContent={<PlusIcon />}
        className="capitalize border dark:text-gray-100 text-gray-600 font-semibold dark:bg-zinc-800 text-lg border-stone-200 bg-slate-50 rounded-md"
      >
        Create Product
      </Button>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-[90vw] h-auto max-w-[500px]">
          <ModalHeader className=" dark:text-gray-100">DealKh</ModalHeader>
          <ModalBody className="text-2xl font-semibold dark:text-gray-100">Create New Product</ModalBody>
          <ModalBody>
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-900 font-medium pb-2 dark:text-gray-100">Product Name</label>
                <input type="text" className="w-full p-2 border border-stone-300 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black bg-slate-50 rounded-lg focus:outline-none focus:ring-0" />
              </div>
                <div>
                  <label className="block text-slate-900 font-medium pb-2 dark:text-gray-100">Price</label>
                  <input type="text" className="w-full p-2 border border-stone-300 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black bg-slate-50 rounded-lg focus:outline-none focus:ring-0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 pb-2">
                <div>
                  <label className="block text-slate-900 font-medium pb-2 dark:text-gray-100">Discount Type</label>
                  <input type="text" className="w-full p-2 border border-stone-300 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black bg-slate-50 rounded-lg focus:outline-none focus:ring-0" />
                </div>
                <div>
                  <label className="block text-slate-900 font-medium pb-2 dark:text-gray-100">Category</label>
                  <input type="text" className="w-full p-2 border border-stone-300 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black bg-slate-50 rounded-lg focus:outline-none focus:ring-0" />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-slate-900 font-medium pb-2 dark:text-gray-100">Description</label>
                <textarea className="w-full p-2 border border-stone-300 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black bg-slate-50 rounded-lg focus:outline-none focus:ring-0" placeholder="Enter your description here..."></textarea>
              </div>
              <div
                className="mb-4 p-4 border-dashed border-2 border-stone-300 bg-slate-50 dark:border-2 dark:text-white dark:border-zinc-800 dark:bg-black rounded-lg flex flex-col items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleImageClick}
              >
                {!preview && (
                  <>
                    <button
                      type="button"
                      className="bg-gray-200 rounded-full flex items-center justify-center "
                      onClick={handleImageClick}
                    >
                      <div className="bg-slate-200 rounded-full p-3">
                        <IoImagesOutline className="w-6 h-6 text-gray-600" />
                      </div>
                    </button>
                    <p className="text-gray-500 mt-2">Click to upload or drag and drop</p>
                    <div className="bg-gradient-to-tr from-pink-300 to-yellow-100 text-black shadow-lg cursor-pointer mt-2 p-1 rounded-lg" onClick={handleImageClick}>
                      Browse File
                    </div>
                  </>
                )}
                {preview && (
                  <img src={preview} alt="Preview" className="w-full h-[150px] object-cover rounded-lg" />
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFile && (
                <div className="file-details mt-4 text-center">
                  {/* <p className="mb-2 text-gray-700">Selected File: {selectedFile.name}</p> */}
                </div>
              )}
            </form>
          </ModalBody>
          <ModalFooter className="flex">
            <Button onClick={onClose} className="w-full max-w-[20rem] px-4 py-2 border-2 bg-transparent dark:bg-transparent border-amber-600 text-warning font-semibold text-md rounded-full">
              Cancel
            </Button>
            <Button onClick={onClose} className="w-full max-w-[20rem] px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-md font-semibold rounded-full ml-4">
              Create
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  );
}
