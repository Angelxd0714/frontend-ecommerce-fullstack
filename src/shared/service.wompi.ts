// service.wompi.ts
import axios from "axios";
import type { PayCard } from "../types/pay-card";

export async function getAcceptanceToken(): Promise<string> {
    const baseUrl = import.meta.env.VITE_WOMPI_API_URL;
    const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY;
    console.log(baseUrl, publicKey);
    if (!baseUrl || !publicKey) {
        throw new Error("Configuración de Wompi no encontrada");
    }

    const url = `${baseUrl}/merchants/${publicKey}`;
    const response = await axios.get(url);
    
    if (!response.data?.data?.presigned_personal_data_auth?.acceptance_token) {
        throw new Error("No se pudo obtener el token de aceptación");
    }
    
    return response.data.data.presigned_personal_data_auth.acceptance_token;
}
export async function createCardToken(card: PayCard): Promise<string> {
    const baseUrl = import.meta.env.VITE_WOMPI_API_URL;
    const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY;
    console.log(baseUrl, publicKey);
    if (!baseUrl || !publicKey) {
        throw new Error("Configuración de Wompi no encontrada");
    }
    const url = `${baseUrl}/tokens/cards`;

    console.log(`Creando token de tarjeta para: ${card.card_holder}`);
    
    const payload = {
      number: card.number,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      cvc: card.cvc,
      card_holder: card.card_holder,
    };

    try {
      const response = await axios.post(url, payload, { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicKey}`
        } 
      });

      if (!response.data.data?.id) {
        throw new Error('Respuesta de Wompi no contiene token de tarjeta');
      }

      return response.data.data.id;
    } catch (error) {
      console.error('Error creando token de tarjeta', error);
      throw error;
    }
}