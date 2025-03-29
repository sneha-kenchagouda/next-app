'use client';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Button
} from '@carbon/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const resolvedParams = await params; 
        const response = await fetch(`https://dummyjson.com/products/${resolvedParams.id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/products'); 
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params, router]);

  if (loading) return <div>Loading product details...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <StructuredListWrapper>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>Image</StructuredListCell>
          <StructuredListCell head>Product Info</StructuredListCell>
          <StructuredListCell head>Details</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell>
            <img
              src={product.thumbnail}
              alt={product.title}
              height="50%"
              width="50%"
            />
          </StructuredListCell>
          
          <StructuredListCell>
            <h3>{product.title}</h3>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> {product.rating}/5</p>
          </StructuredListCell>
          
          <StructuredListCell>
            <p>{product.description}</p>
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  );
}