import { Search as SearchIcon, X as DeleteIcon } from 'lucide-react'
import debounce from 'lodash.debounce'

import { SearchContext } from "../../model/searchContext"
import styles from "./Search.module.css"
import { useCallback, useContext, useRef, useState } from 'react'

export function Search() {
    const { setSearchValue } = useContext(SearchContext)

    const [inputValue, setInputValue] = useState("")

    const inputRef = useRef(null)

    const handleDeleteClick = () => {
        setSearchValue("")
        setInputValue("")
        inputRef.current?.focus()
    }

    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchValue(value)

        }, 250),
        []
    )

    const onInputChange = (event) => {
        setInputValue(event.target.value)
        debouncedSearch(event.target.value)
    }

    return (
        <div className={styles.root}>
            <SearchIcon className={styles.icon} />
            <input
                ref={inputRef}
                className={styles.input}
                placeholder="Поиск по названию..."
                value={inputValue}
                onChange={onInputChange}
            />
            {
                inputValue && (
                    <DeleteIcon
                        onClick={handleDeleteClick}
                        className={styles.iconDelete}
                    />
                )
            }
        </div>
    )
}
