import { Grid, Select } from "@mantine/core";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect } from "react";
import { getProducts } from "../api/productApi";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/slices/productSlice";
import type { Product } from "../types/product";

export const ProductComponent = () => {
    const {products} = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch();
    
    const getProductsAll = () => {
        getProducts().then((products) => {
            dispatch(setProducts(products));
        }); 
    };
    
    useEffect(() => {
        getProductsAll();
    }, []);
       
    // State for selected category (would need useState in a real implementation)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const categoriesSelect = new Set(products?.map((product: Product) => product.category));
    const filteredProducts = selectedCategory 
        ? products.filter(product => categoriesSelect.has(product.category))
        : products;
    
    return (
        <div>
            <h1 style={{ fontSize: "2rem" , fontWeight: "bold" , color: "#333" }}>Productos</h1>
            
            {/* Category filter */}
            <Select
                placeholder="Filter by category"
                data={Array.from(categoriesSelect)}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                clearable
                mb="md"
                style={{ maxWidth: 300 }}
            />
            
            {/* Product grid */}
            <Grid>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Grid>
        </div>
    );
};