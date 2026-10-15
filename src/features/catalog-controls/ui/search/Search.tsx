import { Search as SearchIcon, X as DeleteIcon } from "lucide-react";
import debounce from "lodash.debounce";

import { SearchContext } from "../../model/searchContext";
import styles from "./Search.module.css";
import { useMemo, useContext, useRef, useState, useEffect } from "react";

import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router";
import { useAppDispatch } from "@/shared/store";
import { setCurrentPage } from "../../model/filterSlice";

export function Search() {
  const dispatch = useAppDispatch();
  const { setSearchValue } = useContext(SearchContext);
  const [params] = useSearchParams();

  const [inputValue, setInputValue] = useState(params.get("search") ?? "");

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setCurrentPage(1));
        setSearchValue(value);
      }, 250),
    [dispatch, setSearchValue],
  );

  const handleDeleteClick = () => {
    debouncedSearch.cancel();
    dispatch(setCurrentPage(1));
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
        placeholder="Поиск по названию"
        aria-label="Поиск товары по названию"
        value={inputValue}
        onChange={onInputChange}
      />
      {inputValue && (
        <DeleteIcon onClick={handleDeleteClick} className={styles.iconDelete} />
      )}
    </div>
  );
}
