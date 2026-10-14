import styles from "./Sort.module.css";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, SlidersHorizontal, ArrowUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { setSort } from "../../model/filterSlice";
import type { SortOption } from "../../model/types";

const options: SortOption[] = [
  { id: "-rating", title: "По популярности" },
  { id: "rating", title: "По популярности" },
  { id: "-price", title: "По цене" },
  { id: "price", title: "По цене" },
  { id: "-title", title: "По алфавиту" },
  { id: "title", title: "По алфавиту" },
];

export function Sort() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.filter.sortType);
  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const label = options.find((item) => item.id === sort)?.title ?? options[0].title;
  const DirectionIcon = sort.startsWith("-") ? ArrowDown : ArrowUp;

  const selectOption = (item: SortOption) => {
    dispatch(setSort(item.id));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}
      onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
      <button type="button" className={styles.sortLabel}
        aria-expanded={open} aria-label={`Сортировка: ${label}, ${sort.startsWith("-") ? "по убыванию" : "по возрастанию"}`}
        onClick={() => setOpen(!open)}>
        <SlidersHorizontal size={18} aria-hidden="true" />
        {label}
        <DirectionIcon size={16} aria-hidden="true" />
      </button>
      {open && (
        <div className={styles.popup}>
          <ul className={styles.list}>
            {options.map((item) => (
              <li key={item.id}>
                <button type="button"
                  className={`${styles.item} ${sort === item.id ? styles.active : ""}`}
                  aria-pressed={sort === item.id}
                  aria-label={`${item.title}, ${item.id.startsWith("-") ? "по убыванию" : "по возрастанию"}`}
                  onClick={() => selectOption(item)}>
                  {item.title}
                  {item.id.startsWith("-") ? <ArrowDown size={16} aria-hidden="true" /> : <ArrowUp size={16} aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
