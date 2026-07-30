import style from "./Categories.module.css"

const categories = [
    'Все',
    'Электроника',
    'Одежда',
    'Красота',
    'Дом и сад',
    'Товары для детей'
]

export function Categories({ value, onChangeCategory }) {

    return (
        <div className={style.categories}>
            <ul className={style.list}>
                {
                    categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => onChangeCategory(index)}
                            className={`${style.item} ${value === index ? style.active : ""}`}
                        >
                            {category}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}