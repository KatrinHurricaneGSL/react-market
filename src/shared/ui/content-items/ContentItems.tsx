import type { ReactNode } from "react"
import styles from "./ContentItems.module.css"

interface ContentItemsProps {
    children: ReactNode
    variant?: "grid" | "list"
}

export function ContentItems({ children, variant = "grid" }: ContentItemsProps) {
    return (
        <div className={`${styles.items} ${styles[variant]}`}>
            {children}
        </div>
    )
}
