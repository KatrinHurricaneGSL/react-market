import styles from "./NotFoundBlock.module.css"

export function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1 >
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>

            <p className={styles.description}>Данная страница отсутсвует на маркетплейсе</p>
        </div>
    )
}