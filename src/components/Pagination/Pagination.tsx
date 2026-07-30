import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

import styles from "./Pagination.module.css"

export function Pagination( {current, total, onPageChange} ) {
    return (
        <div className={styles.pagination}>
            <ResponsivePagination
                current={current}
                total={total}
                onPageChange={onPageChange}
            />
        </div>
    )
}
