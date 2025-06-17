import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../types/customer';

interface CustomerState {
  selectedCustomer: Customer | null;
  idCustomer: number;
  customer: Customer | null;
}

const initialState: CustomerState = {
  selectedCustomer: null,
  idCustomer: 0,
  customer: null
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setSelectedCustomer(state, action: PayloadAction<Customer>) {
      state.selectedCustomer = action.payload;
    },
    clearSelectedCustomer(state) {
      state.selectedCustomer = null;
    },
    setIdCustomer(state, action: PayloadAction<number>) {
      state.idCustomer = action.payload;
    },
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
    }
  },
});

export const { setSelectedCustomer, clearSelectedCustomer, setIdCustomer, setCustomer } = customerSlice.actions;
export default customerSlice.reducer;