import type { Delivery } from "./delivery";
export type Customer = {
   
    identity: number;
    name: string;
    email: string;

    phone: string;
    delivery: Delivery;
}