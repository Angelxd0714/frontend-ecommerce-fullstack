import { Box, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { GoAlertFill } from 'react-icons/go';
import { useMantineTheme } from '@mantine/core';

export const NotFound = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  return (
    <Box 
      maw={600} 
      mx="auto" 
      mt={50} 
      p="xl" 
      style={{
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.md,
        textAlign: 'center',
      }}
    >
      <GoAlertFill 
        size={60} 
        color="#fa5252" 
        style={{ marginBottom: 20 }} 
      />
      
      <Title order={2} mb="sm" style={{ color: '#fa5252' }}>
        404 - Página no encontrada
      </Title>
      
      <Text size="lg" mb="xl" style={{ color: '#fa5252' }}>
        ¡Ups! La página que estás buscando no existe o ha sido movida.
      </Text>
      
      <Group justify="center">
        <Button 
          size="md"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Button>
        
        <Button 
          size="md"
          variant="outline"
          color="gray"
          onClick={() => window.history.back()}
        >
          Regresar atrás
        </Button>
      </Group>
    </Box>
  );
};