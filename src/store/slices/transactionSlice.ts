
 import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
 import type { Transaction } from '../../types/transaction';

 interface TransactionState {
   selectedTransaction: Transaction | null;
 }

 const initialState: TransactionState = {
   selectedTransaction: null,
 };

 const transactionSlice = createSlice({
   name: 'transaction',
   initialState,
   reducers: {
    setSelectedTransaction(state, action: PayloadAction<Transaction>) {
      state.selectedTransaction = action.payload;
    },
    clearSelectedTransaction(state) {
      state.selectedTransaction = null;
    },
  },
});

export const { setSelectedTransaction, clearSelectedTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;