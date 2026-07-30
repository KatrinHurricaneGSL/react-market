import style from "./Sort.module.css"
import { useState } from 'react'
import {useSelector, useDispatch } from "react-redux"

import { setSort } from "../../redux/slices/filterSlice"

const list = [
    {
        id: "-rating",
        title: "популярности ↓"
    },
    {
        id: "rating",
        title: "популярности ↑"
    },
    {
        id: "-price",
        title: "цене ↓"
    },
    {
        id: "price",
        title: "цене ↑"
    },
    {
        id: "-title",
        title: "алфавиту ↓"
    },
    {
        id: "title",
        title: "алфавиту ↑"
    }
]

export function Sort() {
    const dispatch = useDispatch()
    const sort = useSelector(state => state.filter.sortType)

    const [open, setOpen] = useState(false)
    const [label, setLabel] = useState(list[0].title)

    const onClickListItem = (item) => {
        setLabel(item.title)
        dispatch(setSort(item.id))
        setOpen(false)
    }

    return (
        <div className={style.sort}>
            <div className={style.sortLabel}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                >
                    <path
                        d="M10 5C10 5.16927..."
                        fill="#2C2C2C"
                    />
                </svg>

                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{label}</span>
            </div>

            {open && (
                <div className={style.popup}>
                    <ul className={style.list}>
                        {
                            list.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => onClickListItem(item)}
                                    className={`${style.item} ${sort === item.id ? style.active : ""}`}>
                                    {item.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}