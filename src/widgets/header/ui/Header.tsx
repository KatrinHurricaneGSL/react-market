import styles from "./Header.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/shared/ui/button";
import {
  Search,
  SearchContext,
  resetFilters,
} from "@/features/catalog-controls";
import { Heart, ShoppingBasket, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { loadCartProducts, selectTotalCartItems, selectTotalPrice } from "@/entities/cart";

export function Header() {
  const dispatch = useAppDispatch();
  const { setSearchValue } = useContext(SearchContext);
  const [searchResetKey, setSearchResetKey] = useState(0);
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
    setSearchValue("");
    setSearchResetKey((key) => key + 1);
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

        <Search key={searchResetKey} />

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
            <span>{totalPrice === null ? "—" : totalPrice} ₽</span>

            <div className={styles.cartDelimiter}></div>

            <ShoppingCart />

            <span>{totalCartItems}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
