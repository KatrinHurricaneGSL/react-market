import styles from "./Header.module.css";
import { useEffect } from "react";
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
  const cartItems = useAppSelector((state) => state.cart.items);
  const { pathname } = useLocation();
  const totalCartItems = useAppSelector(selectTotalCartItems);

  useEffect(() => {
    const request = dispatch(loadCartProducts(cartItems.map((item) => item.id)));
    return () => request.abort();
  }, [cartItems, pathname, dispatch]);

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

          <Button to="/cart" icon={<><ShoppingCart /><span>{totalCartItems}</span></>}
            iconPosition="end" iconDivider aria-label={`Корзина: ${totalCartItems} товаров`}>
            {totalPrice === null ? "—" : formatPrice(totalPrice)}
          </Button>
        </div>
      </div>
    </div>
  );
}
