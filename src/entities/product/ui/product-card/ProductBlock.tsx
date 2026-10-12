import type { ReactNode } from "react";
import styles from "./ProductBlock.module.css";
import type { ProductType } from "../../model/types";
import { Heart, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import clsx from "clsx";
import { addFavorite } from "@/entities/favorites";

interface Props extends ProductType {
  actions?: ReactNode;
}

export function ProductBlock({
  id,
  title,
  price,
  imageUrl,
  actions,
  rating,
  category,
}: Props) {
  const dispath = useAppDispatch();

  const favoriteItem = useAppSelector((state) =>
    state.favorite.items.find((item) => item.id === id),
  );

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
          onClick={() =>
            dispath(
              addFavorite({
                id,
                title,
                imageUrl,
                price,
                rating,
                category,
              }),
            )
          }
        >
          <Heart />
        </button>

        <h4 className={styles.title}>{title}</h4>

        <div className={styles.footer}>
          <div className={styles.price}>{price} ₽</div>

          {actions}
        </div>
      </div>
    </div>
  );
}
