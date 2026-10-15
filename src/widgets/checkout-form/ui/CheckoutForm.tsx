import type { ChangeEvent } from 'react'
import { useState } from 'react'


import styles from './CheckoutForm.module.css'
import type { CartItemType } from '@/entities/cart/model/types'
import { formatPrice } from "@/shared/lib/format-price";

type Props = {
    items: CartItemType[]
}

type FormState = {
    fullName: string
    address: string
    cardNumber: string
}

export const CheckoutForm = ({ items }: Props) => {
    const [form, setForm] = useState<FormState>({
        fullName: '',
        address: '',
        cardNumber: '',
    })

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const totalSum = items.reduce((total, current) => total + current.price * current.count, 0)

    return (
        <div className={styles.checkout}>
            <div className={styles.products}>
                <h3 className={styles.sectionTitle}>
                    Товары
                </h3>

                <div className={styles.productList}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={styles.productItem}
                        >
                            <span className={styles.productName}>
                                {item.title}
                            </span>

                            <span className={styles.productPrice}>
                                {formatPrice(item.price * item.count)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <form className={styles.form}>
                <h3 className={styles.sectionTitle}>
                    Данные для оплаты
                </h3>

                <label className={styles.field}>
                    <span className={styles.label}>
                        ФИО
                    </span>

                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Введите ФИО..."
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>
                        Адрес доставки
                    </span>

                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Введите адрес для доставки..."
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>
                        Номер карты
                    </span>

                    <input
                        type="text"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                    />
                </label>
            </form>

            <p className={styles.total}>Итого: <span className={styles.totalPrice}>{formatPrice(totalSum)}</span></p>
        </div>
    )
}