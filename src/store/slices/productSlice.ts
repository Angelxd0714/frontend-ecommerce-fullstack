import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

interface ProductState {
  selectedProduct: Product | null;
  products: Product[];
  categories: string[];
  carrito: Array<{
    product: Product;
    quantity: number;
  }>;
  idsProductos: string[];
  quantity: number;
}

const initialState: ProductState = {
  selectedProduct: null,
  products: [],
  categories: [],
  carrito: [],
  idsProductos: [],
  quantity: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    clearProducts(state) {
      state.products = [];
    },
    clearCategories(state) {
      state.categories = [];
      },
      addCarrito(state, action: PayloadAction<Product>) {
        const existingItem = state.carrito.find(item => item.product.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.carrito.push({
            product: action.payload,
            quantity: 1
          });
        }
        localStorage.setItem('carrito', JSON.stringify(state.carrito));
      },
      updateCarrito(state, action: PayloadAction<{productId: string, quantity: number}>) {
        const item = state.carrito.find(item => item.product.id === action.payload.productId);
        if (item) {
          item.quantity = action.payload.quantity;
        }
        localStorage.setItem('carrito', JSON.stringify(state.carrito));
      },
      removeCarrito(state, action: PayloadAction<string>) {
        state.carrito = state.carrito.filter(item => item.product.id !== action.payload);
        localStorage.setItem('carrito', JSON.stringify(state.carrito));
      },
    clearCarrito(state) {
      state.carrito = [];
      state.quantity = 1;
      localStorage.setItem('carrito', JSON.stringify(state.carrito));
    },
    loadCarrito(state) {
      const carritoData = localStorage.getItem('carrito');
      if (carritoData) {
        state.carrito = JSON.parse(carritoData);
      }
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct, setProducts, setCategories, clearProducts, clearCategories, addCarrito, removeCarrito, clearCarrito, updateCarrito, loadCarrito } = productSlice.actions;
export default productSlice.reducer;
