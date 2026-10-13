import { CreditCard, Truck } from "lucide-react";
import styles from "./DeliveryAndPayment.module.css";

export const DeliveryAndPayment = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Truck className={styles.icon} size={24} />

        <div className={styles.content}>
          <h3>Доставка</h3>
          <p>
            Курьерская доставка и получение в пункте выдачи. Стоимость и сроки
            рассчитываются при оформлении заказа.
          </p>
        </div>
      </div>

      <div className={styles.item}>
        <CreditCard className={styles.icon} size={24} />

        <div className={styles.content}>
          <h3>Оплата</h3>
          <p>
            Оплата банковской картой онлайн. Доступные способы оплаты
            отображаются при оформлении заказа.
          </p>
        </div>
      </div>
    </div>
  );
};
