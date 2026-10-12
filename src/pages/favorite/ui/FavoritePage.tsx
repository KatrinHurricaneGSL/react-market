import { Title } from "@/shared/ui/typography";
import { ContentItems } from "@/shared/ui/content-items";
import { ProductBlock } from "@/entities/product";
import { AddToCartButton } from "@/features/add-to-cart";
import { useAppSelector } from "@/shared/store";
import { useMemo } from "react";
import { NotFoundBlock } from "@/shared/ui/not-found-block";

export const FavoritePage = () => {
  const items = useAppSelector((state) => state.favorite.items);
  const favoriteItems = useMemo(() => {
    return items.filter((item) => item.isFavorite);
  }, [items]);
  return (
    <>
      {favoriteItems.length > 0 ? (
        <>
          <Title tag="h2">Избранное</Title>

          <ContentItems>
            {favoriteItems.map((product) => (
              <ProductBlock
                key={product.id}
                {...product}
                actions={<AddToCartButton product={product} />}
              />
            ))}
          </ContentItems>
        </>
      ) : (
        <NotFoundBlock description="Вы ещё ничего не добавили в избранное" />
      )}
    </>
  );
};
