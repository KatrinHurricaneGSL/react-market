import { Route, Routes } from 'react-router';
import { createContext, useState } from 'react';

import style from './App.module.css';
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Cart } from './pages/Cart/Cart'

export const SearchContext = createContext({})

function App() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className={style.wrapper}>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className={style.content}>
          <div className={style.container}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;