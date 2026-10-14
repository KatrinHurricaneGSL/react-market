import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Button } from "@/shared/ui/button";
import { Minus, Plus } from "lucide-react";

import styles from "./AddToCartButton.module.css";
import clsx from "clsx";
import {
  addProduct,
  decrementCount,
  incrementCount,
  removeProduct,
} from "@/entities/cart";
import type { ProductType } from "@/entities/product";

type Props = {
  product: ProductType;
};

export const AddToCartButton = ({ product }: Props) => {
  const items = useAppSelector((state) => state.cart.items);
  const quantity = items.find((item) => item.id === product.id)?.count ?? 0;

  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    if (quantity === 0) {
      dispatch(addProduct({ id: product.id, count: 1 }));
    } else {
      dispatch(incrementCount(product.id));
    }
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      if (
        confirm(
          `Вы уверены, что хотите удалить товар "${product.title}" из корзины?`,
        )
      ) {
        dispatch(removeProduct(product.id));
        return;
      }
    }

    dispatch(decrementCount(product.id));
  };

  if (quantity === 0) {
    return (
      <Button
        variant="outline"
        onClick={handleIncrement}
      >
        <span>Добавить</span>
      </Button>
    );
  } else {
    return (
      <div className={styles.counter}>
        <button
          className={clsx(styles.button, styles.minusButton)}
          onClick={handleDecrement}
        >
          <Minus />
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          className={clsx(styles.button, styles.plusButton)}
          onClick={handleIncrement}
        >
          <Plus />
        </button>
      </div>
    );
  }
};
