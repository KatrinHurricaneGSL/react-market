import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface SearchContextValue {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextValue>({
    searchValue: '',
    setSearchValue: () => {},
});
