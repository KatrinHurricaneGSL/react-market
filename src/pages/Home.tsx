import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

import style from '../App.module.css';
import { Categories } from '../components/Categories';
import { Sort } from "../components/Sort"
import { ProductBlock } from '../components/ProductBlock';
import { Skeleton } from '../components/ProductBlock/Skeleton';
import { ContentItems } from '../components/ContentItems';
import { Pagination } from '../components/Pagination';
import { SearchContext } from "../App"
import { setCategotyId, setCurrentPage, setSort } from '../redux/slices/filterSlice';
import { categories } from '../shared/constants/categories';
import { useSearchParams } from 'react-router';

interface ProductType {
    id: string,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}

interface PaginationData {
    "first": number,
    "prev": null | number,
    "next": null | number,
    "last": null | number,
    "pages": number,
    "items": number,
    "data": ProductType[]
}

export const Home = () => {
    const dispatch = useDispatch()
    const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);

    const [searchParams, setSearchParams] = useSearchParams()

    const { searchValue, setSearchValue } = useContext(SearchContext)

    const [items, setItems] = useState<PaginationData>({
        first: 1,
        prev: null,
        next: null,
        last: null,
        pages: 0,
        items: 0,
        data: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isFiltersInitialized, setIsFiltersInitialized] = useState(false)

    const onClickCategory = id => {
        dispatch(setCategotyId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }

    useEffect(() => {
        const categoryIdFromUrl = Number(searchParams.get("category") ?? searchParams.get("category:eq"))
        const currentPageFromUrl = Number(searchParams.get("page") ?? searchParams.get("_page"))
        const sortTypeFromUrl = searchParams.get("sort") ?? searchParams.get("_sort")
        const searchValueFromUrl = searchParams.get("search") ?? searchParams.get("title:contains")

        if (Number.isInteger(categoryIdFromUrl) && categoryIdFromUrl >= 0) {
            dispatch(setCategotyId(categoryIdFromUrl))
        }

        if (Number.isInteger(currentPageFromUrl) && currentPageFromUrl > 0) {
            dispatch(setCurrentPage(currentPageFromUrl))
        }

        if (sortTypeFromUrl) {
            dispatch(setSort(sortTypeFromUrl))
        }

        if (searchValueFromUrl) {
            setSearchValue(searchValueFromUrl)
        }

        setIsFiltersInitialized(true)
    }, [])

    useEffect(() => {
        if (!isFiltersInitialized) {
            return
        }

        const queryParams = new URLSearchParams({
            category: String(categoryId),
            page: String(currentPage),
            sort: sortType,
            search: searchValue.trim()
        })

        setSearchParams(queryParams, { replace: true })
        getProducts(queryParams)
    }, [categoryId, currentPage, sortType, searchValue, isFiltersInitialized])

    async function getProducts(queryParams: URLSearchParams) {
        try {
            setIsLoading(true)
            const apiParams = new URLSearchParams({
                _sort: queryParams.get("sort") ?? "-rating",
                _page: queryParams.get("page") ?? "1",
                _per_page: "8"
            })
            const categoryIdFromUrl = Number(queryParams.get("category"))
            const searchValueFromUrl = queryParams.get("search")?.trim()

            if (categoryIdFromUrl > 0) {
                apiParams.set("category:eq", String(categoryIdFromUrl))
            }

            if (searchValueFromUrl) {
                apiParams.set("title:contains", searchValueFromUrl)
            }

            const response = await axios.get(
                `http://localhost:3000/products?${apiParams.toString()}`
            )
            setItems(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const activeCategory = categories.find((category) => category.id === categoryId)

    return (
        <>
            <div className={style.contentTop}>
                <Categories value={categoryId} onChangeCategory={(id) => onClickCategory(id)} />
                <Sort />
            </div>
            <h2 className={style.contentTitle}>
                {
                    activeCategory?.title || "Все товары"
                }
            </h2>
            <ContentItems>
                {isLoading
                    ? [... new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.data.map((product) => <ProductBlock key={product.id} {...product} />)
                }
            </ContentItems>
            <Pagination
                current={currentPage}
                total={items.pages}
                onPageChange={onChangePage}
            />
        </>
    )
}
