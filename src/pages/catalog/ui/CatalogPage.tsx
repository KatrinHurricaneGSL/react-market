import { useEffect, useState } from 'react';

import styles from './CatalogPage.module.css';
import { getProducts, ProductBlock, Skeleton, categories } from "@/entities/product"
import type { PaginationData } from "@/entities/product"
import { Categories, Sort } from '@/features/catalog-controls';
import { AddToCartButton } from "@/features/add-to-cart"
import { ContentItems } from '@/shared/ui/content-items';
import { Pagination } from '@/shared/ui/pagination';

import { useCatalogQuery } from "../model/useCatalogQuery"

export const CatalogPage = () => {
    const {
        categoryId,
        currentPage,
        queryParams,
        onClickCategory,
        onChangePage,
    } = useCatalogQuery()

    const [items, setItems] = useState<PaginationData>({
        first: 1,
        prev: null,
        next: null,
        last: null,
        pages: 0,
        items: 0,
        data: []
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!queryParams) {
            return
        }

        let isActive = true;

        async function loadProducts(queryParams: URLSearchParams) {
            setIsLoading(true);

            try {
                const data = await getProducts(queryParams);

                if (isActive) {
                    setItems(data);
                }
            } catch (error) {
                if (isActive) {
                    console.log(error);
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }

        loadProducts(queryParams)

        return () => {
            isActive = false;
        }
    }, [queryParams])

    const activeCategory = categories.find((category) => category.id === categoryId)

    return (
        <>
            <div className={styles.contentTop}>
                <Categories value={categoryId} onChangeCategory={(id) => onClickCategory(id)} />
                <Sort />
            </div>

            <h2 className={styles.contentTitle}>
                {
                    activeCategory?.title || "Все товары"
                }
            </h2>

            <ContentItems>
                {isLoading
                    ? [... new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.data.map((product) => (
                        <ProductBlock
                            key={product.id}
                            {...product}
                            actions={<AddToCartButton />}
                        />
                    ))
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
