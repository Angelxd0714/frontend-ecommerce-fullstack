// service.wompi.ts
import axios from "axios";

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