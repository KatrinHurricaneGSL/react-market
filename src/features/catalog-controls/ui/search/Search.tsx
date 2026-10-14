import { Search as SearchIcon, X as DeleteIcon } from "lucide-react";
import debounce from "lodash.debounce";

import { SearchContext } from "../../model/searchContext";
import styles from "./Search.module.css";
import { useMemo, useContext, useRef, useState, useEffect } from "react";

import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router";

export function Search() {
  const { setSearchValue } = useContext(SearchContext);
  const [params] = useSearchParams();

  const [inputValue, setInputValue] = useState(params.get("search") ?? "");

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
      }, 250),
    [setSearchValue],
  );

  const handleDeleteClick = () => {
    debouncedSearch.cancel();
    setSearchValue("");
    setInputValue("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Фильтровать по названию"
        aria-label="Фильтровать товары по названию"
        value={inputValue}
        onChange={onInputChange}
      />
      {inputValue && (
        <DeleteIcon onClick={handleDeleteClick} className={styles.iconDelete} />
      )}
    </div>
  );
}
