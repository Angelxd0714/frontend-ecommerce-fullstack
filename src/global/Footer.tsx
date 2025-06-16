import { Box, Container, Grid, Text, Anchor, Group, rem } from '@mantine/core';
import { CiFacebook, CiTwitter, CiInstagram, CiLinkedin } from 'react-icons/ci';
import { MdOutlineEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export function Footer() {
  const theme = {
    primary: '#4f46e5',
    secondary: '#f9fafb',
    accent: '#10b981',
    text: '#1f2937',
    lightText: '#6b7280'
  };

  const footerLinks = [
    { title: 'Compañía', links: ['Sobre nosotros', 'Carreras', 'Blog', 'Prensa'] },
    { title: 'Recursos', links: ['Centro de ayuda', 'Guías', 'API', 'Estado'] },
    { title: 'Legal', links: ['Políticas de privacidad', 'Términos', 'Cookies'] },
  ];

  return (
    <Box 
      bg={theme.text} 
      py={rem(40)}
      style={{ 
        borderTop: `${rem(1)} solid ${theme.secondary}`,
        color: theme.secondary
      }}
    >
      <Container size="xl">
        <Grid gutter={rem(40)}>
          {/* Logo y descripción */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text fz={rem(24)} fw={700} mb="md" c={theme.secondary}>
              ShopMaster
            </Text>
            <Text fz="sm" mb="md" c={theme.lightText}>
              Tu solución completa de ecommerce para compras en línea seguras y rápidas.
            </Text>
            <Group gap="sm" mt="sm">
              <Anchor href="#" c={theme.secondary}><CiFacebook size={20} /></Anchor>
              <Anchor href="#" c={theme.secondary}><CiTwitter size={20} /></Anchor>
              <Anchor href="#" c={theme.secondary}><CiInstagram size={20} /></Anchor>
              <Anchor href="#" c={theme.secondary}><CiLinkedin size={20} /></Anchor>
            </Group>
          </Grid.Col>

          {/* Links del footer */}
          {footerLinks.map((section) => (
            <Grid.Col key={section.title} span={{ base: 6, md: 2 }}>
              <Text fw={600} mb="sm" c={theme.secondary}>{section.title}</Text>
              {section.links.map((link) => (
                <Text key={link} component="a" href="#" fz="sm" c={theme.lightText} display="block" mb={rem(8)}>
                  {link}
                </Text>
              ))}
            </Grid.Col>
          ))}

          {/* Contacto */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text fw={600} mb="sm" c={theme.secondary}>Contacto</Text>
            <Group gap="sm" mb={rem(8)}>
              <MdLocationOn size={18} />
              <Text fz="sm" c={theme.lightText}>Av. Principal 123, Ciudad</Text>
            </Group>
            <Group gap="sm" mb={rem(8)}>
              <MdPhone size={18} />
              <Text fz="sm" c={theme.lightText}>+1 (555) 123-4567</Text>
            </Group>
            <Group gap="sm">
              <MdOutlineEmail size={18} />
              <Text fz="sm" c={theme.lightText}>info@shopmaster.com</Text>
            </Group>
          </Grid.Col>
        </Grid>

        {/* Copyright */}
        <Box mt={rem(40)} pt={rem(20)} style={{ borderTop: `${rem(1)} solid ${theme.lightText}` }}>
          <Text fz="sm" ta="center" c={theme.lightText}>
            © {new Date().getFullYear()} ShopMaster. Todos los derechos reservados.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}