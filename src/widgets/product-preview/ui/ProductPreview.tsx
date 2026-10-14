import { ImageGallery } from "@/shared/ui/image-gallery";
import styles from "./ProductPreview.module.css";
import { Modal } from "@/shared/ui/modal";
import { Heart, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import clsx from "clsx";
import { addFavorite } from "@/entities/favorites";
import { AddToCartButton } from "@/features/add-to-cart";
import { useState, type ReactNode } from "react";
import { ProductCharacteristics } from "./ProductCharacteristics";
import { DeliveryAndPayment } from "./DeliveryAndPayment";
import type { ProductType } from "@/entities/product";

type TabId = "description" | "characteristics" | "delivery";
type TabItem = {
  id: TabId;
  title: string;
};

type TabContent = {
  tab: TabId;
  content: ReactNode;
};

type Props = {
  product?: ProductType;
  onClose?: () => void;
};

const TABS: TabItem[] = [
  { id: "description", title: "Описание" },
  { id: "characteristics", title: "Характеристики" },
  { id: "delivery", title: "Доставка и оплата" },
];

export const ProductPreview = ({ product, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const dispath = useAppDispatch();

  const favoriteItem = useAppSelector((state) =>
    state.favorite.items.find((item) => item.id === product?.id),
  );

  if (!product) return null;

  const tabsContent: TabContent[] = [
    {
      tab: "description",
      content: <p>{product.description}</p>,
    },
    {
      tab: "characteristics",
      content: (
        <ProductCharacteristics
          characteristics={product.characteristics || []}
        />
      ),
    },
    {
      tab: "delivery",
      content: <DeliveryAndPayment />,
    },
  ];

  const handleAddToFavorite = () => {
    dispath(addFavorite(product));
  };

  const handleClose = () => {
    setActiveTab("description");
    onClose?.();
  };

  return (
    <Modal
      open
      classNames={{ body: styles.previewModal }}
      onClose={handleClose}
    >
      <div className={styles.preview}>
        <div className={styles.content}>
          <div className={styles.gallery}>
            <ImageGallery
              images={
                product.images?.length
                  ? product.images
                  : [{ original: product.imageUrl, thumbnail: product.imageUrl }]
              }
            />
          </div>

          <div className={styles.info}>
            <div className={styles.infoHeader}>
              <div className={styles.ratingBlock}>
                <Star />
                <span className={styles.rating}>{product.rating ?? 0}</span>
              </div>

              <button
                className={clsx(styles.favorite, {
                  [styles.favoriteActive]: favoriteItem?.isFavorite,
                })}
                aria-label={
                  favoriteItem?.isFavorite
                    ? `Удалить ${product.title} из избранного`
                    : `Добавить ${product.title} в избранное`
                }
                onClick={handleAddToFavorite}
              >
                <Heart />
              </button>
            </div>

            <div className={styles.infoRows}>
              <h2 className={styles.title}>{product.title}</h2>
              <div className={styles.price}>{product.price}</div>
              <div className={styles.caption}>{product.caption}</div>
              <div className={styles.checkout}>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.tabs}>
            <div className={styles.tabItems} role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`product-tab-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`product-panel-${tab.id}`}
                  className={clsx(styles.tabLink, {
                    [styles.tabActive]: tab.id === activeTab,
                  })}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <div className={styles.tabsContent}>
              {tabsContent.map((tab) => (
                <div
                  className={clsx(styles.tab, {
                    [styles.contentActive]: tab.tab === activeTab,
                  })}
                  key={`tab-${tab.tab}`}
                >
                  {tab.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
