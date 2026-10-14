import { CircleAlert } from "lucide-react";
import { Button } from "@/shared/ui/button";
import styles from "./Alert.module.css";

type Props = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function Alert({ message, actionLabel, onAction }: Props) {
  return (
    <div className={styles.alert} role="alert">
      <CircleAlert className={styles.icon} size={24} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
      {onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel ?? "Повторить"}
        </Button>
      )}
    </div>
  );
}
