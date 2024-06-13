import { CartProductType } from '@/libs/difinition';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface CartProduct {
	id: number;
	quantity: number;
}

interface CartState {
	products: CartProduct[];
}

const initialState = {
	products: [] as CartProductType[],
	totalPrice: 0,
  };


const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProductType>) => {
			const productInCart = state.products.find(product => product.id === action.payload.id);

			if (!productInCart) {
				state.products.push(action.payload);
				const price = parseFloat(action.payload.original_price.toString());
				state.totalPrice += price;
			  }
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.products = state.products.filter(product => product.id !== action.payload.id);
		},
		increment: (state, action: PayloadAction<number>) => {
			const product = state.products.find(
			  (product) => product.id === action.payload
			);
			if (product) {
			  product.discount = (product.discount || 0) + 1;
			  state.totalPrice = Number(state.totalPrice) + Number(product.original_price);
			}
		},
		decrement: (state, action: PayloadAction<number>) => {
			const product = state.products.find(
			  (product) => product.id === action.payload
			);
			if (product && (product.discount_price || 0) > 1) {
			  product.discount_price = (product.discount_price || 0) - 1;
	  
			  state.totalPrice = Number(state.totalPrice) - Number(product.original_price);
			}
		  },
	},
});

export const { addToCart, removeFromCart, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;