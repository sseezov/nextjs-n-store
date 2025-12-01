'use client';

import { Product } from '../../../lib/definitions';
import Image from 'next/image';
import { useCart } from '../../../lib/hooks';
import styles from './catalog.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const getDisplayPrice = (product: Product) => {
    const salePrice = parseFloat(product.sale_price);
    const basePrice = parseFloat(product.base_price);

    if (salePrice && salePrice < basePrice) {
      return (
        <div className={styles.priceContainer}>
          <span className={styles.oldPrice}>{basePrice} ₽</span>
          <span className={styles.salePrice}>{salePrice} ₽</span>
        </div>
      );
    }

    return (
      <div className={styles.priceContainer}>
        <span className={styles.price}>{basePrice} ₽</span>
      </div>
    );
  };

  const handleAddToCart = () => {
    addToCart({
      product_id: product.product_id,
      product_name: product.product_name,
      base_price: parseFloat(product.base_price),
      sale_price: product.sale_price ? parseFloat(product.sale_price) : undefined,
      image: product.images?.[0]
    });
  };

  return (
    <div className={styles.productCard}>
      {product.images && product.images.length > 0 && (
        <div className={styles.imageContainer}>
          <Image
            src={`/uploads/products/${product.images[0]}`}
            alt={product.product_name}
            fill
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.product_name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        {getDisplayPrice(product)}
        <button 
          onClick={handleAddToCart} 
          className={styles.addToCartButton}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}