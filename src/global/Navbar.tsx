import { useDisclosure } from '@mantine/hooks';
import { useLocation, Link } from 'react-router-dom';
import { CiHome, CiShoppingCart, CiUser, CiDiscount1, CiSettings } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import { Burger, Container, Group, Button, Text, Flex, Box, Drawer, ScrollArea, Divider, rem, ActionIcon, Avatar, Badge } from '@mantine/core';
import { CarritoModal } from '../components/Moda';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const [openedModal, setOpenedModal] = useState(false);    
  const {carrito} = useSelector((state: RootState) => state.product);  

  const theme = {
    primary: '#4f46e5',  // Indigo-600
    secondary: '#f9fafb', // Gray-50
    accent: '#10b981',    // Emerald-500
    text: '#1f2937',      // Gray-800
    lightText: '#6b7280'  // Gray-500
  };

  const links = [
    { label: 'Inicio', path: '/', icon: <CiHome size={20} /> },
    { label: 'Productos', path: '/products', icon: <CiShoppingCart size={20} /> },
    { label: 'Clientes', path: '/customers', icon: <CiUser size={20} /> },
    { label: 'Promociones', path: '/promotions', icon: <CiDiscount1 size={20} /> },
  ];

  const userMenu = [
    { label: 'Configuración', icon: <CiSettings size={18} /> },
    { label: 'Cerrar sesión', icon: <FiLogOut size={18} />, color: 'red' }
  ];

  return (
    <Box 
      bg="white" 
      py="sm" 
      style={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid #e5e7eb`
      }}
    >
      <Container size="xl">
        <Flex justify="space-between" align="center">
          {/* Logo/Brand */}
          <Flex align="center" gap="md">
            <Avatar 
              src="/logo-ecommerce.png" 
              alt="Logo" 
              size={36}
              radius="sm"
            />
            <Text size="xl" fw={700} c={theme.primary}>
              ShopMaster
            </Text>
          </Flex>
          
          {/* Desktop Navigation */}
          <Group gap={4} visibleFrom="md">
            {links.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                variant={location.pathname === link.path ? 'filled' : 'subtle'}
                color={location.pathname === link.path ? theme.primary : 'gray'}
                leftSection={link.icon}
                size="sm"
                radius="xl"
                styles={{
                  root: {
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Group>

          {/* User Menu & Cart */}
          <Group gap="md">
            {/* Carrito de compras mejorado */}
            <Button
              onClick={() => setOpenedModal(true)}
              variant="light"
              color={theme.primary}
              leftSection={<CiShoppingCart size={22} />}
              rightSection={
                <Badge 
                  color={theme.primary}
                  variant="filled"
                  size="sm"
                  c="white"
                  style={{
                    fontWeight: 700,
                    transform: 'scale(1.1)'
                  }}
                >
                  {carrito.length}
                </Badge>
              }
              radius="xl"
              size="md"
              styles={{
                root: {
                  paddingRight: rem(12),
                  paddingLeft: rem(20),
                  fontWeight: 600,
                  border: `1px solid ${theme.primary}`,
                  '&:hover': {
                    backgroundColor: theme.primary,
                    color: 'white',
                    '& .mantine-Badge-root': {
                      backgroundColor: 'white',
                      color: theme.primary
                    }
                  }
                }
              }}
            >
              Carrito
            </Button>

            {/* Avatar usuario (Desktop) */}
            <Avatar 
              src="/user-avatar.jpg" 
              alt="User" 
              size={36}
              radius="xl"
              visibleFrom="md"
            />

            {/* Mobile Burger */}
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="md"
              color={theme.text}
            />
          </Group>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="85%"
        title={
          <Flex align="center" gap="sm">
            <Avatar src="/logo-ecommerce.png" size={32} />
            <Text fw={600}>Menú</Text>
          </Flex>
        }
        hiddenFrom="md"
        zIndex={1000}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <ScrollArea h={`calc(100vh - ${rem(100)})`} mx="-md">
          {links.map((link) => (
            <Box key={link.path}>
              <Button
                fullWidth
                component={Link}
                to={link.path}
                variant={location.pathname === link.path ? 'light' : 'subtle'}
                color={theme.primary}
                justify="start"
                leftSection={link.icon}
                onClick={close}
                styles={{ 
                  inner: { 
                    justifyContent: 'flex-start',
                    fontSize: rem(15)
                  } 
                }}
                my={4}
                size="lg"
              >
                {link.label}
              </Button>
              <Divider />
            </Box>
          ))}

          <Box mt="xl">
            <Text fz="sm" fw={600} mb="sm" c={theme.lightText} pl="sm">
              Cuenta
            </Text>
            {userMenu.map((item) => (
              <Button
                key={item.label}
                fullWidth
                variant="subtle"
                color={item.color || 'gray'}
                justify="start"
                leftSection={item.icon}
                onClick={close}
                styles={{ 
                  inner: { 
                    justifyContent: 'flex-start',
                    fontSize: rem(15)
                  } 
                }}
                my={4}
                size="lg"
              >
                {item.label}
              </Button>
            ))}
            
           
          </Box>
        </ScrollArea>
      </Drawer>
      <CarritoModal
        opened={openedModal}
        setOpened={setOpenedModal}   />
    </Box>
  );
}