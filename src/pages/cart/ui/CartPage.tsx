import { Button } from "@/shared/ui/button";
import { CartItem } from "./cart-item/CartItem";
import { ContentItems } from "@/shared/ui/content-items";
import styles from "./CartPage.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import {
  clearProducts,
  selectTotalCartItems,
  selectCartItems,
  selectTotalPrice,
  loadCartProducts,
  removeProduct,
} from "@/entities/cart";
import { Trash } from "lucide-react";
import { NotFoundBlock } from "@/shared/ui/not-found-block";
import { Link } from "react-router";
import { openProductPreview } from "@/features/product-preview";
import { Alert } from "@/shared/ui/alert";

export const CartPage = () => {
  const { items: entries, products, isLoading, error } = useAppSelector((state) => state.cart);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const unavailableItems = isLoading || error ? []
    : entries.filter((item) => !products.some((product) => product.id === item.id));
  const totalItems = useAppSelector(selectTotalCartItems);

  const dispatch = useAppDispatch();

  const clearCart = () => {
    if (confirm("Вы уверены, что хотите очистить корзину?"))
      dispatch(clearProducts());
  };

  if (totalItems === 0) {
    return (
      <NotFoundBlock
        icon="🛒"
        title="Корзина пуста"
        description={
          <Link style={{ textDecoration: "underline" }} to="/">
            За покупками
          </Link>
        }
      />
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.top}>
        <h2 className={styles.title}>Корзина</h2>
        <button onClick={clearCart} className={styles.clear} type="button">
          <Trash />
          <span>Очистить корзину</span>
        </button>
      </div>

      {error ? (
        <Alert
          message="Не удалось загрузить актуальные цены и товары корзины."
          onAction={() => dispatch(loadCartProducts(entries.map((item) => item.id)))}
        />
      ) : isLoading ? (
        <p role="status">Загружаем корзину…</p>
      ) : null}

      <ContentItems variant="list">
        {items.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            onPreview={(product) => dispatch(openProductPreview(product))}
          />
        ))}
      </ContentItems>

      {unavailableItems.map((item) => (
        <Alert
          key={item.id}
          message={`Товар №${item.id} больше недоступен. Количество: ${item.count}.`}
          actionLabel="Удалить из корзины"
          onAction={() => dispatch(removeProduct(item.id))}
        />
      ))}

      <div className={styles.bottom}>
        <div className={styles.bottomDetails}>
          <span>
            Всего товаров: <b>{totalItems} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice === null ? "Недоступна" : `${totalPrice} ₽`}</b>
          </span>
        </div>
        <div className={styles.bottomButtons}>
          <Button
            to="/"
            variants={["outline", "add"]}
            className={styles.goBack}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 13 1 6.93 6.86 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Вернуться назад</span>
          </Button>
          <Button className={styles.pay} disabled={totalPrice === null}>
            <span>Оплатить</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
