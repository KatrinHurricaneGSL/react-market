import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux"

import style from '../App.module.css';
import { Categories } from '../components/Categories';
import { Sort } from "../components/Sort"
import { ProductBlock } from '../components/ProductBlock';
import { Skeleton } from '../components/ProductBlock/Skeleton';
import { ContentItems } from '../components/ContentItems';
import { Pagination } from '../components/Pagination';
import { SearchContext } from "../App"
import { setCategotyId } from '../redux/slices/filterSlice';
import { categories } from '../shared/constants/categories';

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
    const { categoryId, sortType } = useSelector((state) => state.filter);

    const { searchValue } = useContext(SearchContext)

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

    const [page, setPage] = useState(1)

    const onClickCategory = (id) => {
        dispatch(setCategotyId(id))
    }

    useEffect(() => {
        setIsLoading(true)

        let queryStr = ""
        let searchQueryStr = ""
        if (categoryId > 0) {
            queryStr = "category:eq=" + categoryId
        }
        if (searchValue.trim()) {
            searchQueryStr = "&title:contains=" + encodeURIComponent(searchValue.trim())
        }
        fetch("http://localhost:3000/products?" + queryStr + "&_sort=" + sortType + searchQueryStr + `&_page=${page}&_per_page=8`)
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            });
    }, [categoryId, page, sortType, searchValue])

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
                current={page}
                total={items.pages}
                onPageChange={(pageNumber) => { setPage(pageNumber) }}
            />
        </>
    )
}
