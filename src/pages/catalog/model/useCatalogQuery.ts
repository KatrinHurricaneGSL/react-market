import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SearchContext, setCategotyId, setCurrentPage, setSort, type SortType } from "@/features/catalog-controls"
import { useAppDispatch, useAppSelector } from '@/shared/store';

export const useCatalogQuery = () => {
    const dispatch = useAppDispatch()

    const { categoryId, sortType, currentPage } = useAppSelector((state) => state.filter);

    const [searchParams, setSearchParams] = useSearchParams();

    const { searchValue, setSearchValue } = useContext(SearchContext);

    const initializationStarted = useRef(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (initializationStarted.current) {
            return;
        }

        initializationStarted.current = true;

        const category = Number(
            searchParams.get('category') ??
            searchParams.get('category:eq'),
        );

        const page = Number(
            searchParams.get('page') ??
            searchParams.get('_page'),
        );

        const sort =
            searchParams.get('sort') ??
            searchParams.get('_sort');

        const search =
            searchParams.get('search') ??
            searchParams.get('title:contains');

        if (Number.isInteger(category) && category >= 0) {
            dispatch(setCategotyId(category));
        }

        if (Number.isInteger(page) && page > 0) {
            dispatch(setCurrentPage(page));
        }

        if (sort) {
            dispatch(setSort(sort as SortType));
        }

        if (search) {
            setSearchValue(search);
        }

        setIsInitialized(true);
    }, [dispatch, searchParams, setSearchValue]);

    const queryParams = useMemo(() => {
        if (!isInitialized) {
            return null;
        }

        return new URLSearchParams({
            category: String(categoryId),
            page: String(currentPage),
            sort: sortType,
            search: searchValue.trim(),
        });
    }, [
        categoryId,
        currentPage,
        sortType,
        searchValue,
        isInitialized,
    ]);

    useEffect(() => {
        if (!queryParams) {
            return;
        }

        if (searchParams.toString() !== queryParams.toString()) {
            setSearchParams(queryParams, { replace: true });
        }
    }, [queryParams, searchParams, setSearchParams]);

    const onClickCategory = (id: number) => {
        dispatch(setCategotyId(id));
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    return {
        categoryId,
        currentPage,
        queryParams,
        onClickCategory,
        onChangePage,
    }
}