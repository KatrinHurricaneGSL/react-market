import type { ReactNode } from "react";
import styles from "./ProductBlock.module.css";
import type { ProductType } from "../../model/types";
import { Heart, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import clsx from "clsx";
import { addFavorite } from "@/entities/favorites";

interface Props {
  product: ProductType;
  actions?: ReactNode;
}

export function ProductBlock({ product, actions }: Props) {
  const { id, rating, imageUrl, title, price } = product;

  const dispath = useAppDispatch();

  const favoriteItem = useAppSelector((state) =>
    state.favorite.items.find((item) => item.id === id),
  );

  const handleFavoriteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispath(addFavorite(product));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.ratingBlock}>
          <Star />
          <span className={styles.rating}>{rating}</span>
        </div>

        <img className={styles.image} src={imageUrl} alt="Product" />

        <button
          className={clsx(styles.favorite, {
            [styles.favoriteActive]: favoriteItem?.isFavorite,
          })}
          aria-label={
            favoriteItem?.isFavorite
              ? `Удалить ${title} из избранного`
              : `Добавить ${title} в избранное`
          }
          onClick={handleFavoriteButtonClick}
        >
          <Heart />
        </button>

        <h4 className={styles.title}>{title}</h4>

        <div className={styles.footer}>
          <div className={styles.price}>{price} ₽</div>

          {actions && (
            <div onClick={(event) => event.stopPropagation()}>{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
