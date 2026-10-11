import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router"
import styles from "./Button.module.css"

type ButtonVariant = "outline" | "circle" | "add" | "cart" | "black"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    to?: string
    variants?: ButtonVariant[]
}

export function Button({
    children,
    className = "",
    to,
    type = "button",
    variants = [],
    ...props
}: ButtonProps) {
    const classes = [
        styles.button,
        ...variants.map((variant) => styles[variant]),
        className,
    ].filter(Boolean).join(" ")

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    )
}
