import { Grid, Card, Image, Group, Text, Badge, Button } from "@mantine/core"
import { CiShoppingCart } from "react-icons/ci"
import { type Product } from "../types/product" 
import { useDispatch } from "react-redux"
import { addCarrito } from "../store/slices/productSlice"
 
export const ProductCard = ({ product }: { product: Product }   ) => {
    const dispatch = useDispatch();
    return (
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
                        

                        </Group>
          
                        <Group mt="md">
                          <Text fw={700} size="lg">
                            ${
                               product.price
                            }
                          </Text>
                         
                        </Group>
          
                        <Button 
                          fullWidth 
                          onClick={() => dispatch(addCarrito(product))}
                          mt="md" 
                          radius="md"
                          rightSection={<CiShoppingCart size={18} />}
                        >
                          Añadir al carrito
                        </Button>
                      </Card>
                    </Grid.Col>
    )
}