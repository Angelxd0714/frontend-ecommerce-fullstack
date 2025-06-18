import { Stack, Title, Text, Button, Group, Alert, Paper, Loader, Center } from "@mantine/core";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoAlertFill } from "react-icons/go";
import { BsCart4 } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearTransactionState, setStatePay, setTransactionCompleted, setTransactionFailed } from "../store/slices/transactionSlice";
import { clearCarrito } from "../store/slices/productSlice";

export const Result = () => {
    const navigate = useNavigate();
    const { transactionFailed, selectedTransaction } = useSelector(
        (state: RootState) => state.transaction
    );
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    // Simulate loading state for better UX
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Center style={{ height: '60vh' }}>
                <Stack align="center">
                    <Loader size="xl" />
                    <Text>Procesando tu transacción...</Text>
                </Stack>
            </Center>
        );
    }

    return (
        <Paper withBorder p="xl" radius="md" maw={600} mx="auto" mt="xl">
            <Stack align="center">
                {transactionFailed ? (
                    <>
                        <Alert 
                            icon={<GoAlertFill size="1.5rem" />} 
                            title="Transacción fallida" 
                            color="red"
                            variant="filled"
                            w="100%"
                        >
                            {selectedTransaction?.delivery.transactionId || "Lo sentimos, hubo un error al procesar tu pago."}
                        </Alert>
                        
                        <Text color="dimmed" size="sm">
                            Por favor intenta nuevamente o contacta con nuestro soporte.
                        </Text>
                        
                        <Group>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate('/checkout')}
                            >
                                Reintentar pago
                            </Button>
                            <Button 
                                leftSection={<BsCart4 size="1rem" />}
                                onClick={() => {
                                    navigate('/products');
                                    dispatch(clearTransactionState());
                                    dispatch(setStatePay(false));
                                    dispatch(setTransactionCompleted(false));
                                    dispatch(setTransactionFailed(false));
                                    dispatch(clearCarrito());
                                }}
                            >
                                Regresar a la tienda
                            </Button>
                        </Group>
                    </>
                ) : (
                    <>
                        <Alert 
                            icon={<CiCircleCheck size="1.5rem" />} 
                            title="¡Transacción exitosa!" 
                            color="green"
                            variant="filled"
                            w="100%"
                        >
                            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
                        </Alert>
                        
                        {selectedTransaction?.delivery.transactionId && (
                            <Text size="sm" color="dimmed">
                                Número de transacción: {selectedTransaction?.delivery.transactionId}
                            </Text>
                        )}
                        
                        <Text size="sm" color="dimmed">
                            Hemos enviado un correo electrónico con los detalles de tu compra.
                        </Text>
                        
                        <Group>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate('/orders')}
                            >
                                Ver mis pedidos
                            </Button>
                            <Button 
                                leftSection={<FaShoppingBag size="1rem" />}
                                onClick={() => navigate('/products')}
                            >
                                Seguir comprando
                            </Button>
                        </Group>
                    </>
                )}
            </Stack>
        </Paper>
    );
};