import axios from "axios";
import type { PayCard } from "../types/pay-card";
import type { ResponseToken } from "../models/dto/reponse-token";
import type { Transaction } from "../types/transaction";
import type { ResponseTransaction } from "../models/dto/response-transaction";
import type { ResponseWebHook } from "../models/dto/reponse-webhokens";
import type { WebHook } from "../types/webHooks";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Importante para cookies/sesión
    headers: {
      'Content-Type': 'application/json',
    },
  });   

  export const createCard = async (card:    PayCard) : Promise<ResponseToken> => {
    try {
      const response = await api.post('/transactions/create-card-token', card);
      return response.data;
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
      throw error;
    }
  };
  export const createTransaction = async (transaction: Transaction) : Promise<ResponseTransaction> => {
    try {
      const response = await api.post('/transactions/process-payment', transaction);
      return response.data;
    } catch (error) {
      console.error('Error al crear la transacción:', error);
      throw error;
    }
  
  };
  export const getTransactions = async (webHook: WebHook) : Promise<ResponseWebHook> => {
    try {
      const response = await api.post('/transactions/webhook', webHook);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las transacciones:', error);
      throw error;
    }
  }