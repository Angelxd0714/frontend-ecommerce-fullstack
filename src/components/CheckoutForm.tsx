import { useState } from 'react';
import { 
  Card, 
  TextInput, 
  Button, 
  Stack, 
  Title, 
  Divider, 
  Radio, 
  Group, 
  Select,
 
  Grid,
  Text,
  Badge
} from '@mantine/core';
import { CiCreditCard1, CiCalendar, CiLock } from 'react-icons/ci';
import { createCard, createTransaction } from '../api/transactionApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { getAcceptanceToken } from '../shared/service.wompi';
export const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit'>('credit');
  const [installments, setInstallments] = useState<number | null>(1);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const {carrito} = useSelector((state: RootState) => state.product);
  const {customer} = useSelector((state: RootState) => state.customer);
  const installmentOptions = Array.from({ length: 12 }, (_, i) => 
    ({ value: String(i + 1), label: `${i + 1} cuota${i > 0 ? 's' : ''}` })
  );
  const  createToken = async () => {
    console.log(cardNumber, cvv, expiry, cardName);
    try {
      const response = await createCard({
        number: cardNumber,
        cvc: cvv,   
        exp_month: expiry.slice(0, 2),
        exp_year: expiry.slice(3),
        card_holder: cardName
      });
      console.log('Token creado:', response);
      return response;
    } catch (error) {
      console.error('Error al crear el token:', error);
      return;
    }
  };
  const handlePayment = async () => {
    try {
      const token = await createToken();
      if (!token) return;
      const acceptanceToken = await getAcceptanceToken(); 
      const transaction = await createTransaction({
        products: carrito.map(item => ({ 
          productId: item.product.id, 
          quantity: item.quantity // O usa item.quantity si cada producto tiene su propia cantidad
        })),
        customerIdentity: customer || {identity: 0, name: '', email: '', password: '', address: '', phone: ''},
        installments: installments || 1,
        cardToken: token.token, // Access the token string from the ResponseToken object
        acceptanceToken: acceptanceToken,
      });
      console.log('Transacción creada:', transaction);
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
    }
  };
  const calculateInstallment = (total: number, installments: number) => {
    const interestRate = installments > 3 ? 0.02 : 0; // 2% de interés después de 3 cuotas
    const totalWithInterest = total * (1 + interestRate);
    return (totalWithInterest / installments).toFixed(2);
  };

  const totalAmount = 199.99; // Ejemplo, debería venir del carrito
  const installmentAmount = installments ? 
    calculateInstallment(totalAmount, installments) : 
    totalAmount.toFixed(2);

  return (
    <Card withBorder radius="md" p="xl" maw={600} mx="auto">
      <Title order={2} mb="xl">Finalizar Compra</Title>
      
      {/* Sección de método de pago */}
      <Stack mb="xl">
        <Text fw={500}>Método de pago</Text>
        <Radio.Group
          value={paymentMethod}
          onChange={(value: string) => setPaymentMethod(value as 'credit' | 'debit')}
        >
          <Group mt="xs">
            <Radio value="credit" label="Tarjeta de Crédito" />
            <Radio value="debit" label="Tarjeta de Débito" />
          </Group>
        </Radio.Group>
      </Stack>

      {/* Datos de la tarjeta */}
      <Stack gap="md">
        <TextInput
          label="Número de tarjeta"
          placeholder="1234 5678 9012 3456"
          leftSection={<CiCreditCard1 size={18} />}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={16}
        />

        <TextInput
          label="Nombre en la tarjeta"
          placeholder="JUAN PEREZ"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />

        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Vencimiento (MM/AA)"
              placeholder="MM/AA"
              leftSection={<CiCalendar size={18} />}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              maxLength={5}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="CVV"
              placeholder="123"
              leftSection={<CiLock size={18} />}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
            />
          </Grid.Col>
        </Grid>

        {/* Selector de cuotas (solo para crédito) */}
        {paymentMethod === 'credit' && (
          <Select
            label="Cuotas"
            placeholder="Selecciona el número de cuotas"
            data={installmentOptions}
            value={String(installments)}
            onChange={(value) => setInstallments(value ? parseInt(value) : null)}
          />
        )}
      </Stack>

      <Divider my="xl" />

      {/* Resumen de pago */}
      <Stack mb="xl">
        <Group >
          <Text>Subtotal:</Text>
          <Text>${totalAmount.toFixed(2)}</Text>
        </Group>
        
        {paymentMethod === 'credit' && installments && installments > 1 && (
          <>
            <Group  >
              <Text>Cuotas ({installments}x):</Text>
              <Text>${installmentAmount}</Text>
            </Group>
            <Group >
              <Text>Total con intereses:</Text>
              <Text fw={500}>${(parseFloat(installmentAmount) * installments).toFixed(2)}</Text>
            </Group>
          </>
        )}
        
        <Group  mt="sm">
          <Text fw={700}>Total a pagar:</Text>
          <Badge size="lg" color="blue">
            ${paymentMethod === 'credit' && installments && installments > 1 ? 
              (parseFloat(installmentAmount) * installments).toFixed(2) : 
              totalAmount.toFixed(2)}
          </Badge>
        </Group>
      </Stack>

      <Button 
        fullWidth 
        size="lg"
        onClick={() => handlePayment()}
      >
        Confirmar Pago
      </Button>
    </Card>
  );
};