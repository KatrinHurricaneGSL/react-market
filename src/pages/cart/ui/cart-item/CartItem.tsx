import { Button } from "@/shared/ui/button";
import styles from "./CartItem.module.css";
import {
  decrementCount,
  incrementCount,
  removeProduct,
  type CartItem,
} from "@/entities/cart";
import { Minus, Plus, X } from "lucide-react";
import { useAppDispatch } from "@/shared/store";
import type { ProductType } from "@/entities/product";
import { formatPrice } from "@/shared/lib/format-price";

interface CartItemProps {
  product: CartItem;
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
            <button type="button" className={styles.previewButton} aria-haspopup="dialog">
              {product.title}
            </button>
          </h3>
        </div>
      </div>

      <div className={styles.itemActions}>
        <div className={styles.itemCount}>
          <Button
            variants={["outline", "circle"]}
            aria-label="Уменьшить количество"
            onClick={handleMinus}
          >
            <Minus />
          </Button>
          <b>{product.count}</b>
          <Button
            variants={["outline", "circle"]}
            aria-label="Увеличить количество"
            onClick={handlePlus}
          >
            <Plus />
          </Button>
        </div>
        <div className={styles.itemPrice}>
          <b>{formatPrice(product.price * product.count)}</b>
        </div>
        <div className={styles.itemRemove}>
          <Button
            onClick={handleDeleteItem}
            variants={["outline", "circle"]}
            aria-label="Удалить товар"
          >
            <X />
          </Button>
        </div>
      </div>
    </article>
  );
}
