import { Search as SearchIcon, X as DeleteIcon } from 'lucide-react'

import { SearchContext } from "../../App"
import styles from "./Search.module.css"
import { useContext } from 'react'

export function Search() {
    const { searchValue, setSearchValue } = useContext(SearchContext)

    return (
        <div className={styles.root}>
            <SearchIcon className={styles.icon} />
            <input
                className={styles.input}
                placeholder="Поиск по названию..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
            />
            {
                searchValue && (
                    <DeleteIcon
                        onClick={() => setSearchValue("")}
                        className={styles.iconDelete}
                    />
                )
            }
        </div>
    )
}