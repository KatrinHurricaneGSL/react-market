import { Button } from "@/shared/ui/button";
import styles from "./CartItem.module.css";
import {
  decrementCount,
  incrementCount,
  removeProduct,
  type CartItemType,
} from "@/entities/cart";
import { Minus, Plus, X } from "lucide-react";
import { useAppDispatch } from "@/shared/store";
import type { ProductType } from "@/entities/product";
import { formatPrice } from "@/shared/lib/format-price";

interface CartItemProps {
  product: CartItemType;
  onPreview: (product: ProductType) => void;
}

export function CartItem({ product, onPreview }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    if (
      confirm(
        `Вы уверены, что хотите удалить товар "${product.title}" из корзины?`,
      )
    ) {
      dispatch(removeProduct(product.id));
    }
  };

  const handleMinus = () => {
    if (product.count === 1) {
      handleDeleteItem();
      return;
    }

    dispatch(decrementCount(product.id));
  };

  const handlePlus = () => {
    dispatch(incrementCount(product.id));
  };

  return (
    <article className={styles.item}>
      <div className={styles.itemProduct} onClick={() => onPreview(product)}>
        <div className={styles.itemImage}>
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <div className={styles.itemInfo}>
          <h3>
            <button
              type="button"
              className={styles.previewButton}
              aria-haspopup="dialog"
            >
              {product.title}
            </button>
          </h3>
          <p>{formatPrice(product.price)} / шт.</p>
        </div>
      </div>

      <div className={styles.itemCount}>
        <Button
          variant="outline"
          shape="circle"
          icon={<Minus />}
          size="sm"
          aria-label="Уменьшить количество"
          onClick={handleMinus}
        />
        <b>{product.count}</b>
        <Button
          variant="outline"
          shape="circle"
          icon={<Plus />}
          size="sm"
          aria-label="Увеличить количество"
          onClick={handlePlus}
        />
      </div>
      <div className={styles.itemPrice}>
        <b>{formatPrice(product.price * product.count)}</b>
      </div>
      <div className={styles.itemRemove}>
        <Button
          onClick={handleDeleteItem}
          variant="outline"
          shape="circle"
          icon={<X />}
          size="sm"
          aria-label="Удалить товар"
        />
      </div>
    </article>
  );
}
