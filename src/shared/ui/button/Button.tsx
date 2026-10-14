import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import clsx from "clsx";
import styles from "./Button.module.css";

type CommonProps = {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  shape?: "rounded" | "circle";
  size?: "sm" | "md";
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  iconDivider?: boolean;
};

type ButtonProps = CommonProps & (
  | (Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { to?: never })
  | (Omit<LinkProps, keyof CommonProps> & { to: LinkProps["to"] })
);

export function Button({
  children,
  className,
  variant = "primary",
  shape = "rounded",
  size = "md",
  icon,
  iconPosition = "start",
  iconDivider = false,
  ...props
}: ButtonProps) {
  const hasChildren = children !== undefined && children !== null && children !== false;
  const classes = clsx(styles.button, styles[variant], styles[shape], styles[size], {
    [styles.iconOnly]: icon && !hasChildren,
    [styles.iconEnd]: iconPosition === "end",
  }, className);

  const content = (
    <>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {icon && hasChildren && iconDivider && (
        <span className={styles.divider} aria-hidden="true" />
      )}
      {hasChildren && <span className={styles.label}>{children}</span>}
    </>
  );

  if (props.to !== undefined) {
    return <Link {...props} className={classes}>{content}</Link>;
  }

  return <button type="button" {...props} className={classes}>{content}</button>;
}
