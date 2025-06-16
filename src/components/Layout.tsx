import { Navbar } from '../global/Navbar';
import { Footer } from '../global/Footer';
import { Container, Box } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Box style={{ flex: 1 }}>
        <Container size="xl" py="xl">
          {children}
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
}