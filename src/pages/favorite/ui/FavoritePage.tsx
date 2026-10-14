import { useEffect, useState } from "react";
import { Title } from "@/shared/ui/typography";
import { ContentItems } from "@/shared/ui/content-items";
import { getProductsByIds, ProductBlock, type ProductType } from "@/entities/product";
import { AddToCartButton } from "@/features/add-to-cart";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { openProductPreview } from "@/features/product-preview";
import { removeFavorite } from "@/entities/favorites";
import { NotFoundBlock } from "@/shared/ui/not-found-block";
import { Alert } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";

export const FavoritePage = () => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((state) => state.favorite.ids);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setIsLoading(true);
      setError(false);
      try {
        const data = await getProductsByIds(ids, controller.signal);
        if (!controller.signal.aborted) setProducts(data);
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [ids, retryKey]);

  if (ids.length === 0) {
    return (
      <NotFoundBlock
        description="Вы ещё ничего не добавили в избранное"
        actions={<Button to="/">В каталог товаров</Button>}
      />
    );
  }

  if (error) {
    return (
      <Alert
        message="Не удалось загрузить избранное. Попробуйте ещё раз."
        onAction={() => setRetryKey((key) => key + 1)}
      />
    );
  }

  if (isLoading) return <p role="status">Загружаем избранное…</p>;

  const unavailableIds = ids.filter((id) => !products.some((product) => product.id === id));

  return (
    <>
      <Title tag="h2">Избранное</Title>
      <ContentItems>
        {products.map((product) => (
          <ProductBlock
            key={product.id}
            product={product}
            onPreview={(product) => dispatch(openProductPreview(product))}
            actions={<AddToCartButton product={product} />}
          />
        ))}
      </ContentItems>
      {unavailableIds.map((id) => (
        <Alert
          key={id}
          message={`Товар №${id} больше недоступен.`}
          actionLabel="Убрать из избранного"
          onAction={() => dispatch(removeFavorite(id))}
        />
      ))}
    </>
  );
};
