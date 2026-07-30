import { categories } from "../../shared/constants/categories"
import style from "./Categories.module.css"

export function Categories({ value, onChangeCategory }) {

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