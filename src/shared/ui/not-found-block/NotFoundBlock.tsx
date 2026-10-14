import type { ReactNode } from "react";
import styles from "./NotFoundBlock.module.css";
import clsx from "clsx";

type Props = {
  description?: ReactNode;
  title?: ReactNode;
  icon?: ReactNode | false;
  fullWidth?: boolean;
  actions?: ReactNode;
};

export function NotFoundBlock({
  icon = "😕",
  title = "Ничего не найдено",
  description,
  fullWidth,
  actions,
}: Props) {
  return (
    <div
      className={clsx(styles.root, {
        [styles.fullWidth]: fullWidth,
      })}
    >
      <h1 className={styles.title}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.subTitle}>{title}</span>
      </h1>

      {description && <p className={styles.description}>{description}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
