import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { Card, Title, Stack, Radio, Group, TextInput, Grid, Select, Divider, Badge, Button, Text } from "@mantine/core";
import { CiCalendar, CiCreditCard1, CiLock} from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import {  setSelectedTransaction } from "../store/slices/transactionSlice";
import type { Transaction } from "../types/transaction";
import { getAcceptanceToken } from "../shared/service.wompi";
import { createCard } from "../api/transactionApi";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

type FormValues = {
  paymentMethod: 'credit' | 'debit';
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  installments: number;
};

const checkoutFormSchema = z.object({
   paymentMethod: z.enum(['credit', 'debit']),
  cardNumber: z.string()
    .min(16, "El número de tarjeta debe tener 16 dígitos")
    .max(19, "El número de tarjeta no puede exceder 19 dígitos")
    .regex(/^[0-9\s]+$/, "Solo puede contener números y espacios")
    .transform(val => val.replace(/\s/g, ''))
    .refine(val => {
      // Algoritmo de Luhn para validar tarjetas
      const digits = val.split('').map(Number);
      let sum = 0;
      for (let i = 0; i < digits.length; i++) {
        let digit = digits[(digits.length - 1) - i];
        if (i % 2 === 1) digit *= 2;
        if (digit > 9) digit -= 9;
        sum += digit;
      }
      return sum % 10 === 0;
    }, "Número de tarjeta inválido"),
  cardName: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo puede contener letras y espacios"),
  expiry: z.string()
    .length(5, "La fecha debe tener formato MM/AA")
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Formato inválido (MM/AA)")
    .refine(val => {
      const [month, year] = val.split('/');
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      
      if (parseInt(year) < currentYear) return false;
      if (parseInt(year) === currentYear && parseInt(month) < currentMonth) return false;
      return true;
    }, "La tarjeta está vencida"),
  cvv: z.string()
    .min(3, "El CVV debe tener 3 dígitos")
    .max(4, "El CVV no puede exceder 4 dígitos")
    .regex(/^[0-9]+$/, "Solo puede contener números"),
  installments: z.number()
    .min(1, "Debes seleccionar al menos 1 cuota")
    .max(12, "Máximo 12 cuotas")
    .default(1),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'debit' && data.installments > 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Las tarjetas de débito no permiten cuotas",
      path: ["installments"]
    });
  }
});

export const CheckoutForm = () => {
   
    const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<FormValues>({
    initialValues: {
      paymentMethod: 'credit' ,
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      installments: 1,
    },
    validate: zodResolver(checkoutFormSchema),
    transformValues: (values) => ({
      ...values,
      installments: values.paymentMethod === 'debit' ? 1 : values.installments,
    }),
  });

  const { carrito } = useSelector((state: RootState) => state.product);
  const { customer } = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const installmentOptions = Array.from({ length: 12 }, (_, i) => 
    ({ value: String(i + 1), label: `${i + 1} cuota${i > 0 ? 's' : ''}` })
  );

  // Función para formatear el número de tarjeta
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  // Función para formatear la fecha de vencimiento
  const formatExpiry = (value: string) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  const calculateInstallment = (total: number, installments: number) => {
    const interestRate = installments > 3 ? 0.02 : 0;
    const totalWithInterest = total * (1 + interestRate);
    return (totalWithInterest / installments).toFixed(2);
  };

  const totalAmount = carrito.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );
  
  const installmentAmount = form.values.installments ? 
    calculateInstallment(totalAmount, form.values.installments) : 
    totalAmount.toFixed(2);

    const handlePayment: (values: {
      paymentMethod: 'credit' | 'debit';
      cardNumber: string;
      cardName: string;
      expiry: string;
      cvv: string;
      installments: number;
    }) => Promise<void> = async (values) => {
      try {
       
        
        const token = await createCard({
          number: values.cardNumber.replace(/\s/g, ''),
          cvc: values.cvv,
          exp_month: values.expiry.slice(0, 2),
          exp_year: values.expiry.slice(3),
          card_holder: values.cardName
        });
  
        if (!token) {
          notifications.show({
            title: 'Error',
            message: 'Erro al validar la tarjeta',
            color: 'red',
          });
          return;
        }
        
        const acceptanceToken = await getAcceptanceToken();
        
        const transactionData: Transaction = {
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
          installments: values.installments,
          cardToken: token.token,
          acceptanceToken: acceptanceToken,
          delivery: customer?.delivery || { address: '', city: '', postalCode: '' }
        };
  
        dispatch(setSelectedTransaction(transactionData));
        notifications.show({
              title: 'Tarjeta procesada',
              message: 'Tu tarjeta ha sido procesada exitosamente',
              color: 'green',
              }); 
        navigate('/checkout-summary');
      } catch (error) {
        setErrorMessage("Ocurrió un error al procesar la tarjeta. Por favor intenta nuevamente.");
        notifications.show({
          title: 'Error',
          message: errorMessage,
          color: 'red',
        });
      }
    };
  
  return (
    <Card withBorder radius="md" p="xl" maw={600} mx="auto">
      <Title order={2} mb="xl">Finalizar Compra</Title>
      
      <form onSubmit={form.onSubmit(handlePayment)}>
        <Stack mb="xl">
          <Text fw={500}>Método de pago</Text>
          <Radio.Group
            value={form.values.paymentMethod}
            onChange={(value) => {
              form.setFieldValue('paymentMethod', value as 'credit' | 'debit');
              if (value === 'debit') {
                form.setFieldValue('installments', 1);
              }
            }}
          >
            <Group mt="xs">
              <Radio value="credit" label="Tarjeta de Crédito" />
              <Radio value="debit" label="Tarjeta de Débito" />
            </Group>
          </Radio.Group>
        </Stack>

        <Stack gap="md">
          <TextInput
            label="Número de tarjeta"
            placeholder="1234 5678 9012 3456"
            leftSection={<CiCreditCard1 size={18} />}
            value={formatCardNumber(form.values.cardNumber)}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              form.setFieldValue('cardNumber', formatted);
            }}
            maxLength={19}
            error={form.errors.cardNumber}
          />

          <TextInput
            label="Nombre en la tarjeta"
            placeholder="JUAN PEREZ"
            value={form.values.cardName}
            onChange={(e) => form.setFieldValue('cardName', e.target.value.toUpperCase())}
            error={form.errors.cardName}
          />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Vencimiento (MM/AA)"
                placeholder="MM/AA"
                leftSection={<CiCalendar size={18} />}
                value={formatExpiry(form.values.expiry)}
                onChange={(e) => {
                  const formatted = formatExpiry(e.target.value);
                  form.setFieldValue('expiry', formatted);
                }}
                maxLength={5}
                error={form.errors.expiry}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="CVV"
                placeholder="123"
                leftSection={<CiLock size={18} />}
                value={form.values.cvv}
                onChange={(e) => form.setFieldValue('cvv', e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={4}
                error={form.errors.cvv}
              />
            </Grid.Col>
          </Grid>

          {form.values.paymentMethod === 'credit' && (
            <Select
              label="Cuotas"
              placeholder="Selecciona el número de cuotas"
              data={installmentOptions}
              value={String(form.values.installments)}
              onChange={(value) => form.setFieldValue('installments', value ? parseInt(value) : 1)}
              error={form.errors.installments}
            />
          )}
        </Stack>

        <Divider my="xl" />

        <Stack mb="xl">
          <Group>
            <Text>Subtotal:</Text>
            <Text>${totalAmount.toFixed(2)}</Text>
          </Group>
          
          {form.values.paymentMethod === 'credit' && form.values.installments > 1 && (
            <>
              <Group>
                <Text>Cuotas ({form.values.installments}x):</Text>
                <Text>${installmentAmount}</Text>
              </Group>
              <Group>
                <Text>Total con intereses:</Text>
                <Text fw={500}>${(parseFloat(installmentAmount) * form.values.installments).toFixed(2)}</Text>
              </Group>
            </>
          )}
          
          <Group mt="sm">
            <Text fw={700}>Total a pagar:</Text>
            <Badge size="lg" color="blue">
              {form.values.paymentMethod === 'credit' && form.values.installments > 1 ? 
                parseFloat(installmentAmount) * form.values.installments : 
                totalAmount.toFixed(2)}
            </Badge>
          </Group>
        </Stack>

        <Button 
          type="submit"
          fullWidth 
          size="lg"
          loading={form.values.paymentMethod === 'debit' ? false : form.values.installments === undefined}
        >
          Confirmar Pago
        </Button>
      </form>
    </Card>
  );
};