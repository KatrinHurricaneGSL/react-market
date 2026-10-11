import { Button } from "@/shared/ui/button"
import { MinusIcon, PlusIcon } from "@/shared/ui/icons"
import styles from "./CartItem.module.css"

interface CartItemProps {
    title: string
    description: string
    count: number
    price: number
    imageUrl: string
}

export function CartItem({ title, description, count, price, imageUrl }: CartItemProps) {
    return (
        <article className={styles.item}>
            <div className={styles.itemProduct}>
                <div className={styles.itemImage}>
                    <img src={imageUrl} alt={title} />
                </div>
                <div className={styles.itemInfo}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>

            <div className={styles.itemActions}>
                <div className={styles.itemCount}>
                    <Button variants={["outline", "circle"]} aria-label="Уменьшить количество">
                        <MinusIcon />
                    </Button>
                    <b>{count}</b>
                    <Button variants={["outline", "circle"]} aria-label="Увеличить количество">
                        <PlusIcon />
                    </Button>
                </div>
                <div className={styles.itemPrice}>
                    <b>{price} ₽</b>
                </div>
                <div className={styles.itemRemove}>
                    <Button variants={["outline", "circle"]} aria-label="Удалить товар">
                        <PlusIcon />
                    </Button>
                </div>
            </div>
        </article>
    )
}
