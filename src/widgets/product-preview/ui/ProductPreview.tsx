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

const testProduct = {
  id: 1,
  title: "Наушники поро макс",
  imageUrl: "",
  price: 3034,
  rating: 3,
  category: 1,

  // Новые поля
  caption:
    "Комфортные беспроводные наушники с активным шумоподавлением, чистым звуком и длительным временем работы.",
  description:
    "Стильные и удобные беспроводные наушники с активным шумоподавлением. Подходят для работы, а также длительное время автономной работы",
  characteristics: [
    { title: "Размер", value: "24см" },
    { title: "Звук", value: "Dolby Digital" },
  ],
};

type TabId = "description" | "characteristics" | "delivery";
type TabItem = {
  id: TabId;
  title: string;
};

type TabContent = {
  tab: TabId;
  content: ReactNode;
};

const TABS: TabItem[] = [
  { id: "description", title: "Описание" },
  { id: "characteristics", title: "Характеристики" },
  { id: "delivery", title: "Доставка и оплата" },
];

export const ProductPreview = () => {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const {
    id,
    title,
    imageUrl,
    price,
    rating,
    category,
    caption,
    characteristics,
    description,
  } = testProduct;
  const dispath = useAppDispatch();

  const favoriteItem = useAppSelector((state) =>
    state.favorite.items.find((item) => item.id === id),
  );

  // Контент табов

  const tabsContent: TabContent[] = [
    {
      tab: "description",
      content: <p>{description}</p>,
    },
    {
      tab: "characteristics",
      content: <ProductCharacteristics characteristics={characteristics} />,
    },
    {
      tab: "delivery",
      content: <DeliveryAndPayment />,
    },
  ];

  return (
    <Modal open classNames={{ body: styles.previewModal }}>
      <div className={styles.preview}>
        <div className={styles.content}>
          <div className={styles.gallery}>
            <ImageGallery
              images={[
                {
                  original: "/images/electric_brush.jpg",
                  thumbnail: "/images/electric_brush.jpg",
                },
              ]}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.infoHeader}>
              <div className={styles.ratingBlock}>
                <Star />
                <span className={styles.rating}>{rating}</span>
              </div>

              <button
                className={clsx(styles.favorite, {
                  [styles.favoriteActive]: favoriteItem?.isFavorite,
                })}
                aria-label={
                  favoriteItem?.isFavorite
                    ? `Удалить ${title} из избранного`
                    : `Добавить ${title} в избранное`
                }
                onClick={() =>
                  dispath(
                    addFavorite({
                      id,
                      title,
                      imageUrl,
                      price,
                      rating,
                      category,
                    }),
                  )
                }
              >
                <Heart />
              </button>
            </div>

            <div className={styles.infoRows}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.price}>{price}</div>
              <div className={styles.caption}>{caption}</div>
              <div className={styles.checkout}>
                <AddToCartButton product={testProduct} />
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
