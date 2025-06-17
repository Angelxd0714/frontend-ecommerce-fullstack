import type { ResponseCostumer } from "../models/dto/response-costumer";
import type { Customer } from "../types/customer";
import axios from "axios";
const API_URL = "http://localhost:3000";
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Importante para cookies/sesión
    headers: {
      'Content-Type': 'application/json',
    },
  });
export const getCustomers = async () : Promise<Customer[]> => {
    try {
    const response = await api.get<Customer[]>(`${API_URL}/customers`);
    const customers = response.data;
    console.log(customers);
    return customers;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getCustomersById = async (id: string) : Promise<Customer> => {
    try {
    const response = await api.get<Customer>(`${API_URL}/customers/${id}`);
    const customer = response.data;
    console.log(customer);
    return customer;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const addCustomer = async (customerAdd: Customer) : Promise<ResponseCostumer> => {
    try {
    const response = await api.post<ResponseCostumer>(`${API_URL}/customers`, customerAdd);
    const customer = response.data;
    console.log(customer);
    return customer;
    } catch (error) {
        console.log(error);
        throw error;
    }
};