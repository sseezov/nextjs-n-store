'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './cart.module.css';
import { useCart } from '../../../context/cart-context';

export default function CartClient() {
  const { cart, removeFromCart, resetCart, updateQuantity } = useCart();
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
    const sale_price = Number(item.sale_price);
    const base_price = Number(item.base_price);
    const price = sale_price && sale_price < base_price
      ? sale_price
      : base_price;
      console.log(2, price, item.quantity);
    return price * Number(item.quantity);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>

      <div className={styles.cartLayout}>
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <div key={item.product_id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                {item.images.map(image => (
                  <Image
                    src={`/uploads/products/${image}`}
                    key={image}
                    alt={item.product_name}
                    width={120}
                    height={150}
                    className={styles.image}
                  />
                ))}
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
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item)}
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
            onClick={resetCart}
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