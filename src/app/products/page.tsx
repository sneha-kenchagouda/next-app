'use client';
import { ClickableTile, Grid, Column } from '@carbon/react';
import { Launch } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      <Grid>
        {products.map((product) => (
          <Column key={product.id} sm={4} md={4} lg={4}>
            <ClickableTile
              onClick={() => router.push(`/products/${product.id}`)}
              renderIcon={Launch}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
            </ClickableTile>
          </Column>
        ))}
      </Grid>
    </div>
  );
}