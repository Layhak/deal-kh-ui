import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { Product } from '@/libs/difinition';

interface CartState {
  products: Product[];
  totalPrice: number;
}

const loadStateFromLocalStorage = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return {
        products: [],
        totalPrice: 0,
      };
    }
    return JSON.parse(serializedState) as CartState;
  } catch (e) {
    console.error('Could not load state from localStorage', e);
    return {
      products: [],
      totalPrice: 0,
    };
  }
};

const saveStateToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error('Could not save state to localStorage', e);
  }
};

const initialState: CartState = loadStateFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productExists = state.products.some(
        (product) => product.slug === action.payload.slug
      );

      if (!productExists) {
        state.products.push(action.payload);
        const price = parseFloat(action.payload.price.toString());
        state.totalPrice += price;
        saveStateToLocalStorage(state);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (product) => product.slug === action.payload
      );
      if (product) {
        state.totalPrice -= product.price;
        state.products = state.products.filter(
          (p) => p.slug !== action.payload
        );
        saveStateToLocalStorage(state);
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (product) => product.slug === action.payload
      );
      if (product) {
        product.quantity = (product.quantity || 0) + 1;
        state.totalPrice = Number(state.totalPrice) + Number(product.price);
        saveStateToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (product) => product.slug === action.payload
      );
      if (product && (product.quantity || 0) > 1) {
        product.quantity = (product.quantity || 0) - 1;
        state.totalPrice = Number(state.totalPrice) - Number(product.price);
        saveStateToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      saveStateToLocalStorage(state);
    },
  },
});

// export actions
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart, // Export the clearCart action
} = cartSlice.actions;
export default cartSlice.reducer;

// create selectors
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectIsProductInCart = (state: RootState, productSlug: string) =>
  state.cart.products.some((product) => product.slug === productSlug);
