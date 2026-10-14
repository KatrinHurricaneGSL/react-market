import Gallery from "react-image-gallery";
import type { ImageSlide } from "@/shared/types";
import "react-image-gallery/styles/image-gallery.css";

import styles from "./ImageGallery.module.css";

type Props = {
  images: ImageSlide[];
};

export const ImageGallery = ({ images }: Props) => {
  return (
    <Gallery
      additionalClass={styles.gallery}
      items={images}
      thumbnailPosition="left"
      showThumbnails
      showPlayButton={false}
      showFullscreenButton={false}
      showNav
      lazyLoad
    />
  );
};
