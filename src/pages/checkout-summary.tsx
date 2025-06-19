import {
  Card,
  Title,
  Text,
  Stack,
  Group,
  Divider,
  Button,
  Box,
  Badge,
  useMantineTheme,
  Overlay,
  Loader
} from "@mantine/core";
import {
  CiShoppingCart,
  CiUser,
  CiMapPin,
  CiCreditCard1
} from "react-icons/ci";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Transaction } from "../types/transaction";
import { createTransaction, getTransactions } from "../api/transactionApi";
import { useDispatch } from "react-redux";
import { clearTransactionState, setStatePay, setTransactionCompleted, setTransactionFailed } from "../store/slices/transactionSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CheckoutSummary = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
 
  const [errorMessage, setErrorMessage] = useState("");
  
  const { selectedTransaction, statePay, transactionCompleted } = useSelector(
    (state: RootState) => state.transaction
  );
  const { carrito } = useSelector((state: RootState) => state.product);
  const { customer } = useSelector((state: RootState) => state.customer);
 
  useEffect(() => {
    if (transactionCompleted) {
      navigate('/payment-success');
      dispatch(clearTransactionState());

    }
  }, [transactionCompleted, navigate, dispatch]);

  const createTransactionHandler = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      dispatch(setStatePay(true));
      
      if (!selectedTransaction) {
        setErrorMessage("No hay datos de transacción disponibles");
        throw new Error(errorMessage);
      }

      const orderDetails: Transaction = {
        products: carrito.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        })),
        customerIdentity: customer || { 
          identity: 0, 
          name: '', 
          email: '', 
          phone: '', 
          delivery: { address: '', city: '', postalCode: '' }
        },
        installments: selectedTransaction.installments,
        cardToken: selectedTransaction.cardToken,
        acceptanceToken: selectedTransaction.acceptanceToken,
        delivery: customer?.delivery || { address: '', city: '', postalCode: '' }
      };

      const response = await createTransaction(orderDetails);
      console.log("Transacción creada:", response);
      
      const responseWebHook = await getTransactions({
        wompiTransactionId: response.wompiTransactionId,
        status: response.status
      });
      console.log("Transacción webHook:", responseWebHook);
      if(responseWebHook.status === "APPROVED"){
        dispatch(setTransactionCompleted(true));
      }else{
        dispatch(setTransactionFailed(true));
        navigate('/payment-success');
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error al procesar el pago. Por favor intenta nuevamente.");
      navigate('/payment-success');
      dispatch(setTransactionFailed(true));
    } finally {
      setLoading(false);
      dispatch(setStatePay(false));
    }
  };

  // Calcular totales
  const subtotal = carrito.reduce(
    (total, product) => total + product.product.price * product.quantity,
    0
  );
  const shippingCost = 5000;
  const total = subtotal + shippingCost;

  return (
    <Card
      withBorder
      radius="md"
      p="xl"
      shadow="sm"
      style={{
        borderTop: `3px solid ${theme.colors.blue[6]}`,
        maxWidth: 500,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Overlay de carga */}
      {(statePay || loading) && (
        <Overlay blur={2} center>
          <Stack align="center">
            <Loader size="xl" variant="dots" color="blue" />
            <Text size="lg" fw={500} mt="md" color="white">
              Procesando tu pago...
            </Text>
          </Stack>
        </Overlay>
      )}

      {/* Notificación de error */}
    

      <Stack>
        {/* Encabezado */}
        <Group justify="center">
          <CiShoppingCart size={24} color={theme.colors.blue[6]} />
          <Title order={2}>Resumen de la compra</Title>
        </Group>

        <Divider my="sm" />

        {/* Productos */}
        <Box component="div">
          <Text mb="sm">Productos:</Text>
          <Stack>
            {carrito.map((product, index) => (
              <Group key={index} justify="space-between">
                <Box component="div">
                  {product.product.name}{" "}
                  <Badge color="gray">x{product.quantity}</Badge>
                </Box>
                <Text>
                  ${(product.product.price * product.quantity).toLocaleString("es-CO")}
                </Text>
              </Group>
            ))}
          </Stack>
        </Box>

        <Divider my="sm" />

        {/* Información del cliente */}
        <Box component="div">
          <Text mb="sm">Información de envío:</Text>
          <Stack>
            <Group >
              <CiUser size={18} color={theme.colors.gray[6]} />
              <Text>{customer?.name}</Text>
            </Group>
            <Group >
              <CiMapPin size={18} color={theme.colors.gray[6]} />
              <Text>{customer?.delivery.address}</Text>
            </Group>
          </Stack>
        </Box>

        <Divider my="sm" />

        {/* Resumen de pago */}
        <Box component="div">
          <Text mb="sm">Resumen de pago:</Text>
          <Stack>
            <Group justify="space-between">
              <Text>Subtotal:</Text>
              <Text>${subtotal.toLocaleString("es-CO")}</Text>
            </Group>
            <Group justify="space-between">
              <Text>Envío:</Text>
              <Text>${shippingCost.toLocaleString("es-CO")}</Text>
            </Group>
            <Group justify="space-between" mt="md">
              <Text>Total:</Text>
              <Badge size="xl" color="blue" variant="filled">
                ${total.toLocaleString("es-CO")}
              </Badge>
            </Group>
          </Stack>
        </Box>

        <Divider my="sm" />

        {/* Método de pago */}
        <Group justify="space-between">
          <CiCreditCard1 size={18} color={theme.colors.gray[6]} />
          <Text color="dimmed">
            Método de pago: {selectedTransaction?.installments ? selectedTransaction.installments > 1 ? "Tarjeta de crédito" : "Tarjeta débito" : ""}
          </Text>
        </Group>

        {/* Botón de confirmación */}
        <Button
          onClick={createTransactionHandler}
          size="lg"
          radius="md"
          loading={loading}
          disabled={statePay || loading}
          leftSection={<CiCreditCard1 size={20} />}
          fullWidth
          mt="xl"
          styles={{
            root: {
              backgroundColor: theme.colors.blue[6],
              "&:hover": {
                backgroundColor: theme.colors.blue[7],
              },
            },
          }}
        >
          Pagar
        </Button>
      </Stack>
    </Card>
  );
};