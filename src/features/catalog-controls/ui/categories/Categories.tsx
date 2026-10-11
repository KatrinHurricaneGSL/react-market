import { categories } from "@/entities/product"
import style from "./Categories.module.css"

interface CategoriesProps {
    value: number;
    onChangeCategory: (id: number) => void
}

export function Categories({ value, onChangeCategory }: CategoriesProps) {

    return (
        <div className={style.categories}>
            <ul className={style.list}>
                {
                    categories.map((category) => (
                        <li
                            key={category.id}
                            onClick={() => onChangeCategory(category.id)}
                            className={`${style.item} ${value === category.id ? style.active : ""}`}
                        >
                            {category.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
