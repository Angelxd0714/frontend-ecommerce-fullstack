import { 
    Box, 
    Container, 
    Grid, 
    Card, 
    Image, 
    Text, 
    Title, 
    Button, 
    Badge, 
    Group, 
    Stack, 
    rem,
    useMantineTheme
  } from '@mantine/core';
  import { 
    CiShoppingCart, 
    CiStar, 
    CiClock2,
    CiDiscount1,
    CiDeliveryTruck 
  } from 'react-icons/ci';
  import { useMediaQuery } from '@mantine/hooks';
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Zapatillas Deportivas Pro',
      price: 89.99,
      discount: 119.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      rating: 4.5,
      category: 'Deportes'
    },
    {
      id: 2,
      name: 'Smartphone Ultra X',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      rating: 4.8,
      category: 'Tecnología'
    },
    {
      id: 3,
      name: 'Reloj Inteligente Pro',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      rating: 4.3,
      category: 'Tecnología'
    },
    {
      id: 4,
      name: 'Auriculares Inalámbricos',
      price: 129.99,
      discount: 159.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      rating: 4.7,
      category: 'Audio'
    }
  ];
  
  const categories = [
    { name: 'Electrónica', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
    { name: 'Moda', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f' },
    { name: 'Hogar', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba' },
    { name: 'Deportes', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b' }
  ];
  
  export const Home = () => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  
    return (
      <Container size="xl" py="xl">
        {/* Hero Banner */}
        <Box 
          mb="xl"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1441986300917-64674bd600d8)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: theme.radius.md,
            padding: rem(60),
            color: 'white'
          }}
        >
          <Title order={1} size={isMobile ? rem(28) : rem(42)} mb="md">
            Bienvenido a nuestra tienda
          </Title>
          <Text size={isMobile ? 'md' : 'lg'} mb="xl">
            Descubre las mejores ofertas en productos de calidad
          </Text>
          <Group>
            <Button 
              size={isMobile ? 'sm' : 'md'} 
              rightSection={<CiShoppingCart size={20} />}
            >
              Comprar ahora
            </Button>
            <Button 
              variant="outline" 
              color="gray" 
              size={isMobile ? 'sm' : 'md'}
            >
              Ver colección
            </Button>
          </Group>
        </Box>
  
        {/* Features */}
        <Grid gutter="xl" mb="xl">
          {[
            { icon: <CiDeliveryTruck size={24} />, title: 'Envío Gratis', text: 'En pedidos mayores a $50' },
            { icon: <CiClock2 size={24} />, title: 'Soporte 24/7', text: 'Asistencia en todo momento' },
            { icon: <CiDiscount1 size={24} />, title: 'Ofertas', text: 'Descuentos especiales' },
            { icon: <CiStar size={24} />, title: 'Calidad', text: 'Productos certificados' }
          ].map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, xs: 6, md: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" h="100%">
                <Group mb="sm">
                  <Box c={theme.colors.blue[6]}>
                    {feature.icon}
                  </Box>
                  <Text fw={500}>{feature.title}</Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {feature.text}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
  
        {/* Productos destacados */}
        <Title order={2} mb="xl" mt="xl">
          Productos Destacados
        </Title>
        <Grid gutter="xl">
          {featuredProducts.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={product.image}
                    height={160}
                    alt={product.name}
                  />
                </Card.Section>
  
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{product.name}</Text>
                  <Badge color="blue" variant="light">
                    {product.category}
                  </Badge>
                </Group>
  
                <Group gap="xs" mb="xs">
                  {[...Array(5)].map((_, i) => (
                    <CiStar 
                      key={i} 
                      size={16} 
                      color={i < Math.floor(product.rating) ? theme.colors.yellow[6] : theme.colors.gray[4]} 
                      fill={i < Math.floor(product.rating) ? theme.colors.yellow[6] : 'transparent'} 
                    />
                  ))}
                  <Text size="sm">({product.rating})</Text>
                </Group>
  
                <Group mt="md">
                  <Text fw={700} size="lg">
                    ${product.price.toFixed(2)}
                  </Text>
                  {product.discount && (
                    <Text size="sm" c="dimmed" td="line-through">
                      ${product.discount.toFixed(2)}
                    </Text>
                  )}
                </Group>
  
                <Button 
                  fullWidth 
                  mt="md" 
                  radius="md"
                  rightSection={<CiShoppingCart size={18} />}
                >
                  Añadir al carrito
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
  
        {/* Categorías */}
        <Title order={2} mb="xl" mt="xl">
          Categorías
        </Title>
        <Grid gutter="xl">
          {categories.map((category, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                padding="lg"
                radius="md"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: rem(120),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  }
                }}
              >
                <Title order={3} c="white">
                  {category.name}
                </Title>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
  
        {/* Oferta especial */}
        <Box
          mt="xl"
          p="xl"
          style={{
            backgroundColor: theme.colors.blue[1],
            borderRadius: theme.radius.md
          }}
        >
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} mb="md">
                Oferta Especial
              </Title>
              <Text mb="xl">
                Obtén un 20% de descuento en tu primera compra usando el código: 
                <Badge color="blue" ml="sm" size="lg">
                  BIENVENIDO20
                </Badge>
              </Text>
              <Button size="lg">
                Aprovechar oferta
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
                radius="md"
              />
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    );
  };