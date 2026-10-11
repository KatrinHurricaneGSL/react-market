import style from "./Header.module.css"
import logo from "@/shared/assets/images/logo.png"
import { Link } from "react-router"
import { Button } from "@/shared/ui/button"
import { Search } from "@/features/catalog-controls"
import { ShoppingCart } from 'lucide-react'

export function Header() {

  return (
    <div className={style.header}>
      <div className={style.container}>
        <Link to="/">
          <div className={style.headerLogo}>
            <img width="38" src={logo} alt="Product logo" />
            <div>
              <h1>React Market</h1>
              <p>маркетплейс товаров</p>
            </div>
          </div>
        </Link>

        <Search />

        <div className={style.headerCart}>
          <Button
            to="/cart"
            variants={["cart"]}
          >
            <span>520 ₽</span>

            <div className={style.cartDelimiter}></div>

            <ShoppingCart />

            <span>3</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
