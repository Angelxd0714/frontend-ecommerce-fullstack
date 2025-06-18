import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Stack,
  Title,
  Divider,
  Box,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { CiUser, CiMail, CiHome, CiPhone } from "react-icons/ci";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useDispatch } from "react-redux";
import { setCustomer } from "../store/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import { FaCity } from "react-icons/fa";
const customerSchema = z.object({
  identity: z
    .number()
    .min(1000000, "La identificación debe tener al menos 7 dígitos"),
  name: z.string().min(3, "Nombre muy corto").max(50, "Nombre muy largo"),
  email: z
    .string()
    .email("Email inválido")
    .max(100, "Email muy largo")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  phone: z.string().min(10, "Teléfono inválido").max(15, "Teléfono inválido"),
  delivery: z.object({
    address: z.string().min(10, "Dirección muy corta"),
    city: z.string().min(3, "Ciudad muy corta"),
    postalCode: z.string().min(3, "Código postal muy corto"),
  }),
});

export type Customer = z.infer<typeof customerSchema>;

export const CheckoutCustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   

  const handleSubmit = async (values: Customer) => {
    try {
      const updatedValues = {
        ...values,
        delivery: {
          ...values.delivery,
        },
      };
      dispatch(setCustomer(updatedValues));
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };
  const form = useForm<Customer>({
    initialValues: {
      identity: 0,
      name: "",
      email: "",
      phone: "",
      delivery: {
        address: "",
        city: "",
        postalCode: "",
      },
    },
    validate: zodResolver(customerSchema),
    transformValues: (values) => ({
      ...values,
      identity: Number(values.identity) || 0,
    }),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const getNestedInputProps = (path: string) => {
    return {
      value: form.getInputProps(path).value,
      onChange: form.getInputProps(path).onChange,
      onBlur: form.getInputProps(path).onBlur,
      error: form.getInputProps(path).error,
    };
  };
 
  return (
    <Box maw={600} mx="auto">
      <Title order={2} mb="lg">
        Información del Cliente
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)} >
        <Stack gap="md">
          {/* Número de identificación */}
          <NumberInput
            label="Identificación"
            placeholder="Ej: 1234567890"
            leftSection={<CiUser size={18} />}
            withAsterisk
            {...form.getInputProps("identity")}
            min={0}
            error={form.errors.identity}
          />

          {/* Nombre completo */}
          <TextInput
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            leftSection={<CiUser size={18} />}
            withAsterisk
            {...form.getInputProps("name")}
            error={form.errors.name}
          />

          {/* Email */}
          <TextInput
            type="email"
            label="Correo electrónico"
            placeholder="Ej: juan@example.com"
            leftSection={<CiMail size={18} />}
            withAsterisk
            {...form.getInputProps("email")}
            error={form.errors.email}
          />

          {/* Contraseña */}
          {/*<PasswordInput
            label="Contraseña"
            placeholder="Crea una contraseña segura"
            leftSection={<CiLock size={18} />}
            withAsterisk
            {...form.getInputProps('password')}
            error={form.errors.password}
          />*/}

          {/* Dirección */}
          <Textarea
            label="Dirección completa"
            placeholder="Ej: Calle 123 #45-67, Ciudad"
            leftSection={<CiHome size={18} />}
            withAsterisk
            minRows={2}
            {...getNestedInputProps("delivery.address")}
          />

          {/* Teléfono */}
          <TextInput
            label="Teléfono"
            placeholder="Ej: 3001234567"
            leftSection={<CiPhone size={18} />}
            withAsterisk
            {...getNestedInputProps("phone")}
            error={form.errors.phone}
          />
          {/* Ciudad */}
          <TextInput
            label="Ciudad"
            placeholder="Ej: Bogotá"
            leftSection={<FaCity size={18} />}
            withAsterisk
            {...getNestedInputProps("delivery.city")}
          />

          {/* Código postal */}
          <TextInput
            label="Código postal"
            placeholder="Ej: 12345"
            leftSection={<FaCity size={18} />}
            withAsterisk
            {...getNestedInputProps("delivery.postalCode")}
          />

          <Divider my="sm" />

          <Button
            type="submit"
            fullWidth
            size="md"
            mt="sm"
            disabled={
              !form.isValid()
            }
          >
            Continuar al Pago
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
