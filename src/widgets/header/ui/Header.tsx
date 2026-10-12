import styles from "./Header.module.css";
import { Link } from "react-router";
import { Button } from "@/shared/ui/button";
import { Search } from "@/features/catalog-controls";
import { Heart, ShoppingBasket, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/shared/store";

export function Header() {
  const favoriteCount = useAppSelector((state) =>
    state.favorite.items.reduce((sum, item) => {
      if (item.isFavorite) {
        sum += 1;
      }

      return sum;
    }, 0),
  );

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.headerLogo}>
            <ShoppingBasket />
            <div>
              <h1>React Market</h1>
              <p>маркетплейс товаров</p>
            </div>
          </div>
        </Link>

        <Search />

        <div className={styles.headerCart}>
          <Link to="/favorite" className={styles.favoriteButton}>
            <Heart />

            {favoriteCount > 0 && (
              <div className={styles.badge}>
                <span>{favoriteCount > 9 ? "9+" : favoriteCount}</span>
              </div>
            )}
          </Link>

          <Button to="/cart" variants={["cart"]}>
            <span>520 ₽</span>

            <div className={styles.cartDelimiter}></div>

            <ShoppingCart />

            <span>3</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
