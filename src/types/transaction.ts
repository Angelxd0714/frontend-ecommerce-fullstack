import type { Customer } from "./customer";
import type { Delivery } from "./delivery";
export type Transaction = {
    products:{
        productId: string;
        quantity: number;
    }[];
    customerIdentity: Customer;
    installments?: number | undefined;
    cardToken: string;
    acceptanceToken: string;
    delivery: Delivery;
}