import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode, Keyboard, Mousewheel, Thumbs } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { ImageSlide } from "@/shared/types";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import styles from "./ImageGallery.module.css";

type Props = {
  images: ImageSlide[];
};

export const ImageGallery = ({ images }: Props) => {
  const galleryRef = useRef<SwiperInstance | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  return (
    <div className={clsx(styles.layout, { [styles.singleImage]: !hasMultipleImages })}>
      {hasMultipleImages && <Swiper
        className={styles.thumbnails}
        modules={[A11y, FreeMode, Mousewheel]}
        onSwiper={setThumbsSwiper}
        direction="horizontal"
        breakpoints={{
          601: { direction: "vertical", mousewheel: { forceToAxis: true } },
        }}
        slidesPerView="auto"
        spaceBetween={8}
        freeMode
        mousewheel={{ forceToAxis: false }}
        watchSlidesProgress
        a11y={{ containerMessage: "Миниатюры изображений" }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={`${image.original}-${index}`}
            className={styles.thumbnailSlide}
          >
            <button
              type="button"
              className={styles.thumbnail}
              aria-label={`Показать изображение ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => galleryRef.current?.slideTo(index)}
            >
              <img src={image.thumbnail} alt="" loading="lazy" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>}

      <div className={styles.stage}>
        <button
          type="button"
          className={styles.nav}
          aria-label="Предыдущее изображение"
          disabled={!hasMultipleImages}
          onClick={() => galleryRef.current?.slidePrev()}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <Swiper
          className={styles.gallery}
          modules={[A11y, Keyboard, Thumbs]}
          onSwiper={(swiper) => {
            galleryRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          thumbs={{
            swiper:
              hasMultipleImages && thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          keyboard={{ enabled: true, pageUpDown: false }}
          a11y={{ containerMessage: "Изображения товара" }}
          spaceBetween={16}
          rewind
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image.original}-${index}`}>
              <img
                className={styles.image}
                src={image.original}
                alt={`Изображение товара ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={styles.nav}
          aria-label="Следующее изображение"
          disabled={!hasMultipleImages}
          onClick={() => galleryRef.current?.slideNext()}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
