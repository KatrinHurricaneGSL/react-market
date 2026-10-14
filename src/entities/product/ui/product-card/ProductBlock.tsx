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
  onPreview?: (product: ProductType) => void;
}

export function ProductBlock({ product, actions, onPreview }: Props) {
  const { id, rating, imageUrl, title, price } = product;

  const dispath = useAppDispatch();

  const isFavorite = useAppSelector((state) =>
    state.favorite.ids.includes(id),
  );

  const handleFavoriteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispath(addFavorite(product.id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} onClick={() => onPreview?.(product)}>
        <div className={styles.ratingBlock}>
          <Star />
          <span className={styles.rating}>{rating}</span>
        </div>

        <img className={styles.image} src={imageUrl} alt="Product" />

        <button
          className={clsx(styles.favorite, {
            [styles.favoriteActive]: isFavorite,
          })}
          aria-label={
            isFavorite
              ? `Удалить ${title} из избранного`
              : `Добавить ${title} в избранное`
          }
          onClick={handleFavoriteButtonClick}
        >
          <Heart />
        </button>

        <h4 className={styles.title}>
          {onPreview ? (
            <button type="button" className={styles.previewButton} aria-haspopup="dialog">
              {title}
            </button>
          ) : title}
        </h4>

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
