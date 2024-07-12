import React from 'react';
import ProductDetail from '@/components/product/ProductDetail';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = params;

  // Assuming fetchProductBySlug is a function that fetches the product data based on the slug
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product does not exist.',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      type: 'article',
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0]?.url,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0]?.url],
    },
  };
}

async function fetchProductBySlug(slug: string) {
  // Replace this with your actual data fetching logic
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DEALKH_API_URL}products/${slug}`
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  console.log('data in product detail', data);
  return data.payload;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = params;

  return <ProductDetail slug={slug} />;
};

export default ProductPage;
