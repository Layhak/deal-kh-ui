import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { CartProductType } from '@/libs/difinition';

const initialState = {
  products: [] as CartProductType[],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductType>) => {
		const productExists = state.products.some(
		  (product) => product.slug === action.payload.slug
		);
  
		if (!productExists) {
		  state.products.push(action.payload);
		  const price = parseFloat(action.payload.price.toString());
		  state.totalPrice += price;
		}
	  },
	  removeFromCart: (state, action: PayloadAction<string>) => {
		const product = state.products.find((product) => product.slug === action.payload);
		if (product) {
		  state.totalPrice -= product.price;
		  state.products = state.products.filter((p) => p.slug !== action.payload);
		}
		if (product) {
		  state.totalPrice -= product.price;
		  state.products = state.products.filter((p) => p.slug !== action.payload);
		}
	  },
	  incrementQuantity: (state, action: PayloadAction<string>) => {
		const product = state.products.find(
		  (product) => product.slug === action.payload
		);
		if (product) {
		  product.quantity = (product.quantity || 0) + 1;
		  state.totalPrice = Number(state.totalPrice) + Number(product.price);
		}
	  },
	  decrementQuantity: (state, action: PayloadAction<string>) => {
		const product = state.products.find(
		  (product) => product.slug === action.payload
		);
		if (product && (product.quantity || 0) > 1) {
		  product.quantity = (product.quantity || 0) - 1;
  
		  state.totalPrice = Number(state.totalPrice) - Number(product.price);
		}
	  },
	  },
  },
);

// export actions
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// create selector
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;