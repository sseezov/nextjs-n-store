'use client';

import { useCart } from '../../../lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import styles from './cart.module.css';

export default function CartClient() {
  const { getCart, removeFromCart, clearCart } = useCart();
  const cart = getCart();
  console.log(cart);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
        <Link href="/catalog" className={styles.continueShopping}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const getItemPrice = (item: any) => {
    const price = item.sale_price && item.sale_price < item.base_price 
      ? item.sale_price 
      : item.base_price;
    return price * item.quantity;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>
      
      <div className={styles.cartLayout}>
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <div key={item.product_id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                {item.image && (
                  <Image
                    src={`/uploads/products/${item.image}`}
                    alt={item.product_name}
                    width={120}
                    height={150}
                    className={styles.image}
                  />
                )}
              </div>
              
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.product_name}</h3>
                
                <div className={styles.itemPrice}>
                  {item.sale_price && item.sale_price < item.base_price ? (
                    <>
                      <span className={styles.oldPrice}>{item.base_price} ₽</span>
                      <span className={styles.currentPrice}>{item.sale_price} ₽</span>
                    </>
                  ) : (
                    <span className={styles.currentPrice}>{item.base_price} ₽</span>
                  )}
                </div>
                
                <div className={styles.itemControls}>
                  <div className={styles.quantityControls}>
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product_id)}
                    className={styles.removeButton}
                  >
                    Удалить
                  </button>
                </div>
                
                <div className={styles.itemTotal}>
                  Итого: <span>{getItemPrice(item)} ₽</span>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={clearCart}
            className={styles.clearCart}
          >
            Очистить корзину
          </button>
        </div>
        
        <div className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Сумма заказа</h2>
          
          <div className={styles.summaryRow}>
            <span>Товары ({cart.itemsCount} шт.)</span>
            <span>{cart.total} ₽</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Доставка</span>
            <span>Бесплатно</span>
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Итого</span>
            <span className={styles.totalPrice}>{cart.total} ₽</span>
          </div>
          
          <button className={styles.checkoutButton}>
            Оформить заказ
          </button>
          
          <Link href="/catalog" className={styles.continueShopping}>
            Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
}