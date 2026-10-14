import styles from "./Header.module.css";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { Link, useLocation } from "react-router";
import { Button } from "@/shared/ui/button";
import {
  resetFilters,
} from "@/features/catalog-controls";
import { Heart, ShoppingBasket, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { loadCartProducts, selectTotalCartItems, selectTotalPrice } from "@/entities/cart";
import { formatPrice } from "@/shared/lib/format-price";

type Props = {
  onResetSearch: () => void;
};

export function Header({ onResetSearch }: Props) {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const cartIds = useAppSelector(
    (state) => state.cart.items.map((item) => item.id),
    shallowEqual,
  );
  const { pathname } = useLocation();
  const totalCartItems = useAppSelector(selectTotalCartItems);

  useEffect(() => {
    const request = dispatch(loadCartProducts(cartIds));
    return () => request.abort();
  }, [cartIds, pathname, dispatch]);

  const handleLogoClick = () => {
    dispatch(resetFilters());
    onResetSearch();
  };

  const favoriteCount = useAppSelector((state) =>
    state.favorite.ids.length,
  );

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/" onClick={handleLogoClick}>
          <div className={styles.headerLogo}>
            <ShoppingBasket />
            <div>
              <h1>React Market</h1>
              <p>маркетплейс товаров</p>
            </div>
          </div>
        </Link>

        <div className={styles.headerCart}>
          <Button to="/favorite" variant="outline" icon={<Heart />}
            className={styles.favoriteButton} aria-label={`Избранное: ${favoriteCount}`}>
            {favoriteCount > 0 && (
              <span className={styles.badge}>
                <span>{favoriteCount > 9 ? "9+" : favoriteCount}</span>
              </span>
            )}
          </Button>

          <Button to="/cart" className={styles.cartButton}
            icon={
              <>
                <ShoppingCart />
                <span className={styles.cartCount}>{totalCartItems}</span>
                {totalCartItems > 0 && (
                  <span className={`${styles.badge} ${styles.cartBadge}`}>
                    {totalCartItems > 99 ? "99+" : totalCartItems}
                  </span>
                )}
              </>
            }
            iconPosition="end" iconDivider aria-label={`Корзина: ${totalCartItems} товаров`}>
            <span className={styles.cartTotal}>
              {totalPrice === null ? "—" : formatPrice(totalPrice)}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
