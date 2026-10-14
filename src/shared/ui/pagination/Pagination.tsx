import ResponsivePagination from 'react-responsive-pagination';
import { dropEllipsis } from 'react-responsive-pagination/narrowBehaviour';
import 'react-responsive-pagination/themes/classic.css';

import styles from "./Pagination.module.css"

interface PaginationProps {
    current: number;
    total: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ current, total, onPageChange }: PaginationProps) {
    return (
        <div className={styles.pagination}>
            <ResponsivePagination
                current={current}
                total={total}
                onPageChange={onPageChange}
                narrowBehaviour={dropEllipsis}
            />
        </div>
    )
}
