import Loading from '@/app/(user)/loading';
import { Product, WishListResponse } from '@/libs/difinition';
import {
  useCreateWishListMutation,
  useDeleteWishListMutation,
  useGetAllWishListQuery,
} from '@/redux/service/wishList';
import { Slider } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

type WishlistComponentProps = {
  productSlug: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function WishListDropDownComponent({
  productSlug,
  onClose,
  onSubmit,
}: WishlistComponentProps) {
  const [wishlistPercentage, setWishlistPercentage] = useState<number>(0);
  const [wishlistDescription, setWishlistDescription] = useState('');
  const [productSlugToDelete, setProductSlugToDelete] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false); // State to control visibility of validation message

  // for creating wishlist
  const [createWishlist] = useCreateWishListMutation();
  const [deleteWishlist] = useDeleteWishListMutation();
  const {
    data: wishlists = [],
    isLoading,
    error,
    refetch,
  } = useGetAllWishListQuery();

  useEffect(() => {
    // Check if both fields are populated
    setIsFormValid(!!wishlistPercentage && !!wishlistDescription);
  }, [wishlistPercentage, wishlistDescription]);

  const handleCreateWishlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Here is the slug of product: ', productSlug);

    if (!wishlistPercentage || !wishlistDescription) {
      setShowValidationMessage(true); // Show validation message if fields are not valid
      return;
    }

    try {
      if (isLoading) {
        console.log('wishlist is loading');
        return;
      }

      if (error) {
        console.error('Error fetching wishlists:', error);
        return;
      }

      const result = await createWishlist({
        productSlug,
        description: wishlistDescription,
        discountPercentage: wishlistPercentage * 100,
      }).unwrap();

      console.log('Wishlist created successfully:', result);
      refetch();

      setWishlistDescription('');
      setWishlistPercentage(0);
      onSubmit();
    } catch (error) {
      console.error('Error creating wishlist:', error);
    }
  };

  // delete wishlist
  const handleDeleteWishlist = async (productSlug: string) => {
    console.log('Here is the result of deleting...');
    try {
      // Check if there's any loading or error condition
      if (isLoading) {
        console.log('Loading wishlists...');
        return;
      }

      if (error) {
        console.error('Error fetching wishlists:', error);
        return;
      }

      // Find the wishlist item with matching productSlug
      const wishlistToDelete = wishlists.payload.list.find(
        (wishlist: WishListResponse) => wishlist.productSlug === productSlug
      );

      if (!wishlistToDelete) {
        console.log('Wishlist item not found for slug:', productSlug);
        return;
      }

      // Extract UUID from the wishlist item
      const { uuid } = wishlistToDelete;
      console.log('uuid of the wishlist: ', uuid);

      // Perform deletion (assuming deleteWishlist function is correctly implemented)
      await deleteWishlist({ uuid }).unwrap();

      console.log('Wishlist deleted successfully:', productSlug);
      setProductSlugToDelete('');
      refetch();
    } catch (error) {
      console.error('Error deleting wishlist:', error);
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setWishlistPercentage(value);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pb-4 pt-0 sm:pb-4 md:pt-3 lg:pt-3">
              <div className="sm:flex sm:items-start">
                <div className="mt-0 text-center sm:ml-4 sm:text-left md:mt-3 lg:mt-3">
                  <div className="flex justify-between">
                    <div>
                      <h3
                        className="my-5 text-lg font-medium leading-6 text-gray-900"
                        id="modal-headline"
                      >
                        Wishlist
                      </h3>
                    </div>

                    <div
                      className="my-auto"
                      onClick={() => handleDeleteWishlist(productSlug)}
                    >
                      <button
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={onClose}
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-0 md:mt-5 lg:mt-5">
                    <Slider
                      label="Wishlist Percentage"
                      step={0.1}
                      color="warning"
                      maxValue={1}
                      minValue={0}
                      defaultValue={0}
                      showSteps={true}
                      showTooltip={true}
                      showOutline={true}
                      disableThumbScale={true}
                      formatOptions={{
                        style: 'percent',
                        maximumFractionDigits: 0,
                      }}
                      tooltipValueFormatOptions={{
                        style: 'percent',
                        maximumFractionDigits: 0,
                      }}
                      classNames={{
                        base: 'lg:w-[450px] md:w-[450px] w-full',
                        filler: 'bg-gradient-to-r from-yellow-500 to-pink-500',
                        labelWrapper: 'mb-2',
                        label: 'block text-sm font-medium text-gray-700',
                        value: 'font-medium text-default-500 text-small',
                        thumb: [
                          'transition-size',
                          'bg-gradient-to-r from-pink-500 to-yellow-500',
                          'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
                          'data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6',
                        ],
                        step: 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50',
                      }}
                      tooltipProps={{
                        offset: 10,
                        placement: 'bottom',
                        classNames: {
                          base: [
                            'before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500',
                          ],
                          content: [
                            'py-2 shadow-xl',
                            'text-white bg-gradient-to-r from-pink-500 to-yellow-500',
                          ],
                        },
                      }}
                      onChange={(value: number | number[]) =>
                        handleSliderChange(value)
                      }
                    />
                  </div>

                  <div className="mt-6 md:mt-8 lg:mt-8">
                    <label className="block text-start text-sm font-medium text-gray-700 lg:pb-2 ">
                      Wishlist Description
                    </label>
                    <textarea
                      id="wishlistDescription"
                      name="wishlistDescription"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-2 border-gray-500 pl-2 pt-2 text-sm font-medium text-gray-500"
                      placeholder="Make a wish here ✨..."
                      value={wishlistDescription}
                      onChange={(e) => {
                        setWishlistDescription(e.target.value);
                        setShowValidationMessage(false); // Hide validation message on input change
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateWishlist}>
              <div
                className={`mb-2 w-full px-4 text-center text-sm text-red-500 ${!showValidationMessage ? 'hidden' : ''}`}
              >
                Please enter Wishlist Percentage and Description.
              </div>
              <div className="mx-4 bg-gray-50 py-3 sm:flex sm:flex-row-reverse sm:px-6 lg:mx-0">
                <button
                  type="submit"
                  className={`h-10 w-full rounded-md bg-gradient-to-r from-yellow-500 to-pink-500 py-2 font-bold text-white shadow-md transition duration-300 ease-in-out hover:from-yellow-600 hover:to-pink-800 sm:text-sm lg:ml-2 lg:mr-2 lg:h-12 ${!isFormValid ? 'cursor-not-allowed' : ''}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
