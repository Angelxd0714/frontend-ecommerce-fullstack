import type { Customer } from "./customer";
export type Transaction = {
    products:{
        productId: string;
        quantity: number;
    }[];
    customerIdentity: Customer;
    installments?: number | undefined;
    cardToken: string;
    acceptanceToken: string;
}