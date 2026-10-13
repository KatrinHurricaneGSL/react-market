import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Modal.module.css";
import { X } from "lucide-react";
import clsx from "clsx";

type ModalClass = {
  wrapper?: string;
  body?: string;
};

type Props = {
  open?: boolean;
  onClose?: () => void;
  classNames?: ModalClass;
  children?: ReactNode;
  title?: string;
  footer?: ReactNode[];
};

export const Modal = ({
  open,
  onClose,
  classNames,
  children,
  title,
  footer,
}: Props) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [open]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as Node;

    if (bodyRef.current && !bodyRef.current.contains(target)) {
      onClose?.();
    }
  };

  if (!open) return null;

  return (
    <div
      className={clsx(styles.modal, classNames?.wrapper)}
      onClick={handleClick}
    >
      <div className={styles.overlay}></div>

      <div className={clsx(styles.body, classNames?.body)} ref={bodyRef}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div>
            <button
              type="button"
              className={styles.closeBtn}
              aria-label="Закрыть модальное окно"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
        </div>

        <div className={styles.content}>{children}</div>

        <div className={styles.footer}>{footer}</div>
      </div>
    </div>
  );
};
