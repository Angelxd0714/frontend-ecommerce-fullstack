import axios from "axios";
import type { ResponseProduct } from "../models/dto/response-product";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getProducts = async () : Promise<ResponseProduct[]> => {
    try {
    const response = await axios.get<ResponseProduct[]>(`${API_URL}/products`);
    const products = await response.data;
    console.log(products);
    return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getProductsById = async (id: string) : Promise<ResponseProduct> => {
    try {
    const response = await axios.get<ResponseProduct>(`${API_URL}/products/${id}`);
    const product = await response.data;
    console.log(product);
    return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
};