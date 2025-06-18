import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../types/customer';

// Helper para cargar desde localStorage
const loadCustomerFromStorage = (): Customer | null => {
  try {
    const savedCustomer = localStorage.getItem('customer');
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  } catch (error) {
    console.error('Error loading customer from localStorage', error);
    return null;
  }
};

interface CustomerState {
  selectedCustomer: Customer | null;
  idCustomer: number;
  customer: Customer | null;
}

const initialState: CustomerState = {
  selectedCustomer: loadCustomerFromStorage(), // Cargar al inicio
  idCustomer: 0,
  customer: loadCustomerFromStorage() // También cargar en customer
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<Customer>) => {
      state.selectedCustomer = action.payload;
      localStorage.setItem('customer', JSON.stringify(action.payload));
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
      localStorage.removeItem('customer');
    },
    setIdCustomer: (state, action: PayloadAction<number>) => {
      state.idCustomer = action.payload;
    },
    setCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
      localStorage.setItem('customer', JSON.stringify(action.payload));
    },
    loadCustomer: (state) => {
      state.customer = loadCustomerFromStorage();
    }
  },
});

export const { 
  setSelectedCustomer, 
  clearSelectedCustomer, 
  setIdCustomer, 
  setCustomer, 
  loadCustomer 
} = customerSlice.actions;

export default customerSlice.reducer;