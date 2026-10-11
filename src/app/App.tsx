import { Route, Routes } from 'react-router';
import { useState } from 'react';

import style from './App.module.css';
import { Header } from '@/widgets/header'
import { CatalogPage } from '@/pages/catalog'
import { CartPage } from '@/pages/cart-temp'
import { NotFoundPage } from '@/pages/not-found'

import { SearchContext } from '@/features/catalog-controls';

function App() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className={style.wrapper}>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className={style.content}>
          <div className={style.container}>
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
