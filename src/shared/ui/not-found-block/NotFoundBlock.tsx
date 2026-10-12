import type { ReactNode } from "react";
import styles from "./NotFoundBlock.module.css";

type Props = {
  description?: ReactNode;
  title?: ReactNode;
  icon?: ReactNode | false;
};

export function NotFoundBlock({
  icon = "😕",
  title = "Ничего не найдено",
  description,
}: Props) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.subTitle}>{title}</span>
      </h1>

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
