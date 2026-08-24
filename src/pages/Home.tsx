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
import { setCategotyId, setCurrentPage } from '../redux/slices/filterSlice';
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
    const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);

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

    const onClickCategory = id => {
        dispatch(setCategotyId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }

    useEffect(() => {
        getProducts()
    }, [categoryId, currentPage, sortType, searchValue])

    async function getProducts() {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3000/products", {
                params: {
                    "category:eq": categoryId > 0 ? categoryId : undefined,
                    _sort: sortType,
                    "title:contains": searchValue.trim(),
                    _page: currentPage,
                    _per_page: 8
                }
            })
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
