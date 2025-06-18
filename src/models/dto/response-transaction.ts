export interface ResponseTransaction {
    transactionId: string;
    amount: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    productId: string;
    status: string;
    customerId: string;
    wompiTransactionId: string;
}