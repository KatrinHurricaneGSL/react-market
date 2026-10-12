import type { ReactNode } from "react"
import styles from "./Title.module.css"
import clsx from "clsx"

type Props = {
    children: ReactNode,
    tag: "h1" | "h2" | "h3",
    className?: string
}

export const Title = ({children, tag, className}: Props) => { 
    switch(tag) {
        case "h1": {
            return (
                <h1 className={clsx(styles.title, className)}>{children}</h1>
            )
        };
        case "h2": {
            return (
                <h2 className={clsx(styles.title, className)}>{children}</h2>
            )
        };
        case "h3": {
            return (
                <h3 className={clsx(styles.title, className)}>{children}</h3>
            )
        }
    }
}