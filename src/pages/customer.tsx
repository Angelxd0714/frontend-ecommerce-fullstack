import { Box } from "@mantine/core";
import { CheckoutCustomerForm } from "../components/CheckoutCostumerForm";

 export const Customer = () => {
    return (
        <Box maw={600} mx="auto" mt="lg" mb="lg" bg="white" p="md" >   
            <CheckoutCustomerForm  />
        </Box>
    );
};