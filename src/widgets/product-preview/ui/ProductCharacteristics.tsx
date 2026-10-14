import type { ProductCharacteristic } from "@/entities/product";
import styles from "./ProductCharacteristics.module.css";

interface ProductCharacteristicsProps {
  characteristics: ProductCharacteristic[];
}

export const ProductCharacteristics = ({
  characteristics,
}: ProductCharacteristicsProps) => {
  if (characteristics.length === 0) {
    return <p>Характеристики отсутствуют</p>;
  }

  return (
    <table className={styles.table}>
      <tbody>
        {characteristics.map(({ title, value }, index) => (
          <tr key={`${title}-${index}`}>
            <th scope="row">{title}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
