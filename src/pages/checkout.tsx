import { CheckoutForm } from "../components/CheckoutForm";
import { Box } from "@mantine/core";

export const Checkout = () => {
    return (
        <Box maw={600} mx="auto" mt="lg" mb="lg" bg="white" p="md" >
        <CheckoutForm />
        </Box>
    );
};