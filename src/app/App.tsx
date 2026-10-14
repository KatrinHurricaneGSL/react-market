import { Route, Routes } from "react-router";
import { useState } from "react";

import styles from "./styles/App.module.css";
import "./styles/variables.css";
import { Header } from "@/widgets/header";
import { CatalogPage } from "@/pages/catalog";
import { CartPage } from "@/pages/cart";
import { NotFoundPage } from "@/pages/not-found";

import { SearchContext } from "@/features/catalog-controls";
import { FavoritePage } from "@/pages/favorite";
import { ProductPreview } from "@/widgets/product-preview";
import { closeProductPreview, selectPreviewProduct } from "@/features/product-preview";
import { useAppDispatch, useAppSelector } from "@/shared/store";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [catalogResetKey, setCatalogResetKey] = useState(0);
  const product = useAppSelector(selectPreviewProduct);
  const dispatch = useAppDispatch();
  const handleClosePreview = () => dispatch(closeProductPreview());
  const handleResetSearch = () => {
    setSearchValue("");
    setCatalogResetKey((key) => key + 1);
  };

  return (
    <div className={styles.wrapper}>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header onResetSearch={handleResetSearch} />
        <div className={styles.content}>
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<CatalogPage key={catalogResetKey} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>

      {product && (
        <ProductPreview
          key={product.id}
          product={product}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}

export default App;
