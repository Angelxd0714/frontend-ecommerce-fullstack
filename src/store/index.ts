import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import transactionReducer from './slices/transactionSlice';
import customerReducer from './slices/customerSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    transaction: transactionReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
