'use client';

import { Product } from '../../../lib/definitions';
import Image from 'next/image';
import styles from './catalog.module.css';
import { useCart } from '../../../context/cart-context';

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
          onClick={() => addToCart(product)}
          className={styles.addToCartButton}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}