import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice'; // Corrected path
import appSlice from './slices/appSlice'; // Corrected path
import basketSlice from './slices/basketSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    app: appSlice,
    basket:basketSlice
  },
});
