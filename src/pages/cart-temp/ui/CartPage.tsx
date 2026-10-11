import { Button } from "@/shared/ui/button"
import { CartItem } from "./cart-item/CartItem"
import { ContentItems } from "@/shared/ui/content-items"
import styles from "./CartPage.module.css"

const cartItems = [
    { id: 1, title: "Смартфон iPhone 15", description: "Электроника", count: 2, price: 79990, imageUrl: "https://placehold.co/584x584?text=iPhone" },
    { id: 2, title: "Ноутбук Lenovo IdeaPad", description: "Электроника", count: 2, price: 64990, imageUrl: "https://placehold.co/584x584?text=Notebook" },
    { id: 3, title: "Беспроводные наушники", description: "Электроника", count: 2, price: 4990, imageUrl: "https://placehold.co/584x584?text=Headphones" },
    { id: 4, title: "Умные часы Xiaomi", description: "Электроника", count: 2, price: 8990, imageUrl: "https://placehold.co/584x584?text=Watch" },
]

export const CartPage = () => {
    return (
        <div className={styles.cart}>
            <div className={styles.top}>
                <h2 className={styles.title}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M6.33 16.33A1.33 1.33 0 1 0 6.33 13.67a1.33 1.33 0 0 0 0 2.66ZM14.33 16.33a1.33 1.33 0 1 0 0-2.66 1.33 1.33 0 0 0 0 2.66ZM4.78 5h11.55l-1.12 5.59a1.33 1.33 0 0 1-1.33 1.08H6.83a1.33 1.33 0 0 1-1.33-1.16L4.49 2.83a1.33 1.33 0 0 0-1.32-1.16h-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Корзина
                </h2>
                <button className={styles.clear} type="button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M2.5 5h15M6.67 5V3.33c0-.92.74-1.66 1.66-1.66h3.34c.92 0 1.66.74 1.66 1.66V5m2.5 0v11.67c0 .92-.74 1.66-1.66 1.66H5.83c-.92 0-1.66-.74-1.66-1.66V5h11.66ZM8.33 9.17v5M11.67 9.17v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Очистить корзину</span>
                </button>
            </div>

            <ContentItems variant="list">
                {cartItems.map(({ id, ...item }) => <CartItem key={id} {...item} />)}
            </ContentItems>

            <div className={styles.bottom}>
                <div className={styles.bottomDetails}>
                    <span>Всего товаров: <b>3 шт.</b></span>
                    <span>Сумма заказа: <b>900 ₽</b></span>
                </div>
                <div className={styles.bottomButtons}>
                    <Button to="/" variants={["outline", "add"]} className={styles.goBack}>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                            <path d="M7 13 1 6.93 6.86 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Вернуться назад</span>
                    </Button>
                    <Button className={styles.pay}>
                        <span>Оплатить сейчас</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
