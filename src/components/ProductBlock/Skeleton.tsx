import style from "./ProductBlock.module.css"
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className={style.skeleton}
    speed={2}
    width={280}
    height={400}
    viewBox="0 0 280 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" width="280" height="280" />
    <rect x="0" y="290" rx="8" ry="8" width="280" height="24" />
    <rect x="0" y="363" rx="8" ry="8" width="105" height="27" />
    <rect x="128" y="354" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);
