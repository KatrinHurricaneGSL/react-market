import styles from "./ProductBlock.module.css"
import { Button } from "../Button"

export function ProductBlock({ title, price, imageUrl, }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <img
                    className={styles.image}
                    src={imageUrl}
                    alt="Product"
                />

                <h4 className={styles.title}>
                    {title}
                </h4>

                <div className={styles.footer}>
                    <div className={styles.price}>
                        от {price} ₽
                    </div>

                    <Button variants={["outline", "add"]}>
                        <span>
                            Добавить
                        </span>

                        <i>
                            0
                        </i>
                    </Button>
                </div>
            </div>
        </div>
    )
}
