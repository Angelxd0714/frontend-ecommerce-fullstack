import { useForm } from '@mantine/form';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack, 
  Title, 
  Divider, 
  Box,
  NumberInput,
  Textarea
} from '@mantine/core';
import { CiUser, CiMail, CiLock, CiHome, CiPhone } from 'react-icons/ci';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { addCustomer } from '../api/customerApi';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../store/slices/customerSlice';
import { useNavigate } from 'react-router-dom';
// Esquema de validación
const customerSchema = z.object({
  identity: z.number().min(1000000, 'La identificación debe tener al menos 7 dígitos'),
  name: z.string().min(3, 'Nombre muy corto').max(50, 'Nombre muy largo'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  address: z.string().min(10, 'Dirección muy corta'),
  phone: z.string().min(10, 'Teléfono inválido')
});

export type Customer = z.infer<typeof customerSchema>;

export const CheckoutCustomerForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (values: Customer) => {
        try {
            dispatch(setCustomer(values));
            navigate('/checkout');
        } catch (error) {
            console.log(error);
        }
    };
  const form = useForm<Customer>({
    initialValues: {
      identity: 0,
      name: '',
      email: '',
      password: '',
      address: '',
      phone: ''
    },
    validate: zodResolver(customerSchema),
    transformValues: (values) => ({
      ...values,
      identity: Number(values.identity) || 0
    }),
  });

  return (
    <Box maw={600} mx="auto">
      <Title order={2} mb="lg">Información del Cliente</Title>
      
      <form >
        <Stack gap="md">
          {/* Número de identificación */}
          <NumberInput
            label="Identificación"
            placeholder="Ej: 1234567890"
            leftSection={<CiUser size={18} />}
            withAsterisk
            {...form.getInputProps('identity')}
            min={0}
          />

          {/* Nombre completo */}
          <TextInput
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            leftSection={<CiUser size={18} />}
            withAsterisk
            {...form.getInputProps('name')}
          />

          {/* Email */}
          <TextInput
            label="Correo electrónico"
            placeholder="Ej: juan@example.com"
            leftSection={<CiMail size={18} />}
            withAsterisk
            {...form.getInputProps('email')}
          />

          {/* Contraseña */}
          {/*<PasswordInput
            label="Contraseña"
            placeholder="Crea una contraseña segura"
            leftSection={<CiLock size={18} />}
            withAsterisk
            {...form.getInputProps('password')}
          />*/}

          {/* Dirección */}
          <Textarea
            label="Dirección completa"
            placeholder="Ej: Calle 123 #45-67, Ciudad"
            leftSection={<CiHome size={18} />}
            withAsterisk
            minRows={2}
            {...form.getInputProps('address')}
          />

          {/* Teléfono */}
          <TextInput
            label="Teléfono"
            placeholder="Ej: 3001234567"
            leftSection={<CiPhone size={18} />}
            withAsterisk
            {...form.getInputProps('phone')}
          />

          <Divider my="sm" />

          <Button 
            type="button" 
            onClick={() => handleSubmit(form.values)} 
            fullWidth 
            size="md"
            mt="sm"
          >
            Continuar al Pago
          </Button>
        </Stack>
      </form>
    </Box>
  );
};