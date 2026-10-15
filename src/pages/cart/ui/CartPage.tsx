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
  type CartItemType,
} from "@/entities/cart";
import { ChevronLeft, Trash } from "lucide-react";
import { NotFoundBlock } from "@/shared/ui/not-found-block";
import { openProductPreview } from "@/features/product-preview";
import { Alert } from "@/shared/ui/alert";
import { formatPrice } from "@/shared/lib/format-price";
import { Modal } from "@/shared/ui/modal";
import { CheckoutForm } from "@/widgets/checkout-form";
import { useState } from "react";

export const CartPage = () => {
  const {
    items: entries,
    products,
    isLoading,
    error,
  } = useAppSelector((state) => state.cart);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const unavailableItems =
    isLoading || error
      ? []
      : entries.filter(
          (item) => !products.some((product) => product.id === item.id),
        );
  const totalItems = useAppSelector(selectTotalCartItems);

  const [itemToRemove, setItemToRemove] = useState<CartItemType | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleConfirmDelete = () => {
    if (!itemToRemove) return;
    dispatch(removeProduct(itemToRemove.id));
    setItemToRemove(null);
  };

  const handleCheckoutClick = () => {
    setCheckoutOpen(true);
  };

  const handleConfirmCheckout = () => {
    alert("Заказ успешно оформлен!");

    setCheckoutOpen(false);
  };

  const clearCart = () => {
    if (confirm("Вы уверены, что хотите очистить корзину?"))
      dispatch(clearProducts());
  };

  if (totalItems === 0) {
    return (
      <NotFoundBlock
        icon="🛒"
        title="Корзина пуста"
        actions={<Button to="/">В каталог товаров</Button>}
      />
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.top}>
        <h2 className={styles.title}>Корзина</h2>
        <Button onClick={clearCart} variant="ghost" icon={<Trash />}>
          Очистить корзину
        </Button>
      </div>

      {error ? (
        <Alert
          message="Не удалось загрузить актуальные цены и товары корзины."
          onAction={() =>
            dispatch(loadCartProducts(entries.map((item) => item.id)))
          }
        />
      ) : isLoading && items.length === 0 ? (
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
            Сумма заказа:{" "}
            <b>
              {totalPrice === null ? "Недоступна" : formatPrice(totalPrice)}
            </b>
          </span>
        </div>
        <div className={styles.bottomButtons}>
          <Button
            to="/"
            variant="outline"
            className={styles.goBack}
            icon={<ChevronLeft />}
          >
            <span>Вернуться назад</span>
          </Button>
          <Button
            className={styles.pay}
            disabled={totalPrice === null}
            onClick={handleCheckoutClick}
          >
            <span>Оплатить</span>
          </Button>
        </div>
      </div>

      <Modal
        open={itemToRemove !== null}
        title="Удаление товара из корзины"
        onClose={() => setItemToRemove(null)}
        footer={[
          <Button onClick={() => setItemToRemove(null)} variant="outline">
            Отмена
          </Button>,
          <Button onClick={handleConfirmDelete}>Удалить</Button>,
        ]}
      >
        <p>Товар будет удален из корзины. Вы уверены, что хотите продолжить?</p>
      </Modal>

      <Modal
        title="Оформление заказа"
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        footer={[
          <Button variant="outline" onClick={() => setCheckoutOpen(false)}>
            Отмена
          </Button>,
          <Button onClick={handleConfirmCheckout}>Оплатить</Button>,
        ]}
      >
        <CheckoutForm items={items} />
      </Modal>
    </div>
  );
};
