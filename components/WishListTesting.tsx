// WishlistComponent.tsx
import React, { useState } from 'react';
import {
  useCreateWishListMutation,
  useDeleteWishListMutation,
} from '@/redux/service/wishList';

type WishlistComponentProps = {
  productSlug: string;
}

const WishlistComponentTesting: React.FC<WishlistComponentProps> = ({ productSlug }) => {
  const [createWishlist] = useCreateWishListMutation();
  const [deleteWishlist] = useDeleteWishListMutation();

  const [newDescription, setNewDescription] = useState('');
  const [newPercentage, setNewPercentage] = useState(0);
  const [productSlugToDelete, setProductSlugToDelete] = useState('');

  // it handles on create new wishlist
  const handleCreateWishlist = async () => {
    try {
      const result = await createWishlist({
        productSlug,
        description: newDescription,
        discountPercentage: newPercentage,
      }).unwrap();
      console.log('Wishlist created successfully:', result);
      setNewDescription('');
      setNewPercentage(0);
    } catch (error) {
      console.error('Error creating wishlist:', error);
    }
  };

  // delete wishlist
  const handleDeleteWishlist = async () => {
    try {
      await deleteWishlist({ uuid: '78c6dd84-3001-460a-a766-090f48122441' }).unwrap();
      console.log('Wishlist deleted successfully:', productSlugToDelete);
      setProductSlugToDelete('');
    } catch (error) {
      console.error('Error deleting wishlist:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateWishlist}>Add to Wishlist</button>

      <h3>Delete Wishlist</h3>
      <label>
        Product Slug:
        <input
          type="text"
          value={productSlugToDelete}
          onChange={(e) => setProductSlugToDelete(e.target.value)}
        />
      </label>
      <button onClick={handleDeleteWishlist} className='bg-red-500'>Delete Wishlist Item</button>
    </div>
  );
};

export default WishlistComponentTesting;