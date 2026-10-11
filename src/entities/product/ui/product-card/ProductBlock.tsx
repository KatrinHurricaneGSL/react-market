import styles from "./ProductBlock.module.css"

export function ProductBlock({ title, price, imageUrl, actions }) {
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
