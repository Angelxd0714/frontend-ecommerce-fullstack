import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../../types/transaction";
const loadTransactionFromStorage = (): Transaction | null => {
  try {
    const savedTransaction = localStorage.getItem("transaction");
    return savedTransaction ? JSON.parse(savedTransaction) : null;
  } catch (error) {
    console.error("Error loading transaction from localStorage", error);
    return null;
  }
};
interface TransactionState {
  selectedTransaction: Transaction | null;
  statePay:boolean;
  transactionCompleted: boolean; // Nuevo estado
  transactionFailed: boolean; // Nuevo estado
}

const initialState: TransactionState = {
  selectedTransaction: null,
  statePay:false,
  transactionCompleted: false,
  transactionFailed: false
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setSelectedTransaction: (state, action: PayloadAction<Transaction>) => {
      state.selectedTransaction = action.payload;
      localStorage.setItem("transaction", JSON.stringify(action.payload));
    },
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
      localStorage.removeItem("transaction");
    },
    // Nuevo reducer para cargar desde localStorage manualmente
    loadTransaction: (state) => {
      state.selectedTransaction = loadTransactionFromStorage();
    },
    setStatePay: (state, action: PayloadAction<boolean>) => {
      state.statePay = action.payload;
    },
    setTransactionCompleted: (state, action: PayloadAction<boolean>) => {
      state.transactionCompleted = action.payload;
    },
    setTransactionFailed: (state, action: PayloadAction<boolean>) => {
      state.transactionFailed = action.payload;
    },
    clearTransactionState: (state) => {
      state.selectedTransaction = null;
      state.statePay = false;
      state.transactionCompleted = false;
      state.transactionFailed = false;
    }
  },
});

export const { setSelectedTransaction, clearSelectedTransaction, loadTransaction, setStatePay, setTransactionCompleted, clearTransactionState, setTransactionFailed } =
  transactionSlice.actions;
export default transactionSlice.reducer;
