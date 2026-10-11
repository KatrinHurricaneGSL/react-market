import type { ReactNode } from "react"
import styles from "./ProductBlock.module.css"
import type { BaseProduct } from "../../model/types"

interface Props extends BaseProduct {
    actions?: ReactNode,
}

export function ProductBlock({ title, price, imageUrl, actions }: Props) {
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
                        {price} ₽
                    </div>

                    {actions}
                </div>
            </div>
        </div>
    )
}
