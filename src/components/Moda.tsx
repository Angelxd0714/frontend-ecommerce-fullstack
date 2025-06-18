import { 
  Modal, 
  Button, 
  Group, 
  Stack, 
  Title, 
  Divider,
  useMantineTheme,
  Text,
  Badge,
  Card,
  Image,
  NumberInput,
  ActionIcon,
  Box,
  Flex
} from "@mantine/core";
import { CiShoppingCart, CiCircleCheck, CiTrash, CiCircleMinus } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useDispatch } from 'react-redux';
import {updateCarrito, removeCarrito } from '../store/slices/productSlice';
import { useNavigate } from 'react-router-dom';
export const CarritoModal = ({
  opened,
  setOpened,
}: {    
  opened: boolean;
  setOpened: (opened: boolean) => void;
  
}) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const {carrito} = useSelector((state: RootState) => state.product);
  
  
  const customerData = localStorage.getItem('transaction');
  const customer = customerData ? JSON.parse(customerData) : null;
  console.log(customer);
  const total = carrito.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const actualizarCantidad = (productId: string, nuevaCantidad: number) => {
    dispatch(updateCarrito({productId, quantity: nuevaCantidad}));
  };

  const eliminarProducto = (productId: string) => {
    dispatch(removeCarrito(productId));
  };
  const navigate = useNavigate();

  // Eliminar producto


  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      size="md"
      radius="md"
      overlayProps={{
        blur: 3,
        opacity: 0.55,
      }}
      title={
        <Group gap="sm">
          <CiShoppingCart size={24} color={theme.colors.blue[6]} />
          <Title order={3} fw={600}>
            Tu Carrito ({carrito.length})
          </Title>
        </Group>
      }
      centered
      closeButtonProps={{
        icon: <CiCircleMinus size={20} />,
        'aria-label': 'Cerrar modal',
      }}
    >
      <Divider mb="md" />

      {carrito.length === 0 ? (
        <Box py="xl" ta="center">
          <Text c="dimmed" fz="lg" mb="sm">
            Tu carrito está vacío
          </Text>
          <Button 
           
            variant="outline"
          >
            Seguir comprando
          </Button>
        </Box>
      ) : (
        <Stack gap="sm">
          
          {carrito.map((producto) => (
            <Card key={producto.product.id} withBorder p="sm" radius="md">
              <Flex gap="md">
                <Image
                  src={producto.product.image}
                  width={80}
                  height={80}
                  radius="sm"
                  alt={producto.product.name}
                />
                
                <Box style={{ flex: 1 }}>
                  <Group justify="space-between">
                    <Text fw={500}>{producto.product.name}</Text>
                    <ActionIcon 
                      variant="subtle" 
                      color="red" 
                      onClick={() => eliminarProducto(producto.product.id)}
                    >
                      <CiTrash size={18} />
                    </ActionIcon>
                  </Group>
                  
                  <Text c="dimmed" fz="sm" mt={4}>
                    ${producto.product.price} c/u
                  </Text>
                  
                  <Group mt="sm" gap="xs">
                    <NumberInput
                      value={producto.quantity}
                      onChange={(value) => actualizarCantidad(producto.product.id, Number(value))}
                      min={1}
                      max={10}
                      size="sm"
                      style={{ width: 80 }}
                    />
                    <Badge color="blue" variant="light">
                      ${(producto.product.price * producto.quantity).toFixed(2)}
                    </Badge>
                  </Group>
                </Box>
              </Flex>
            </Card>
          ))}

          {/* Resumen de compra */}
          <Card withBorder mt="sm" radius="md">
            <Stack gap="xs">
              <Group justify="space-between">
                <Text>Subtotal:</Text>
                <Text fw={500}>${total}</Text>
              </Group>
              <Group justify="space-between">
                <Text>Envío:</Text>
                <Text fw={500}>$5.00</Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={600}>Total:</Text>
                <Text fw={700} size="lg">
                  ${total + 5}
                </Text>
              </Group>
            </Stack>
          </Card>

          {/* Acciones */}
          <Group grow mt="xl">
            <Button 
              variant="outline" 
              color="gray" 
              onClick={() => setOpened(false)}
              leftSection={<CiCircleMinus size={18} />}
            >
              Seguir comprando
            </Button>
            
            <Button 
              color={theme.primaryColor}
              leftSection={<CiCircleCheck size={18} />}
              onClick={() => {
                setOpened(false);
                navigate('/customerCheckout');
              }}
            >
              Finalizar compra
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
};