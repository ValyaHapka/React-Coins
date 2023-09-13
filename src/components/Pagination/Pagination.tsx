import React from 'react';
import ReactPaginate from 'react-paginate';

import { PaginationProps } from '../../interfaces/pagination';

import styles from './Pagination.module.scss';

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      forcePage={currentPage - 1}
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={1}
      marginPagesDisplayed={2}
      pageCount={22}
      previousLabel="<"
    />
  );
};
export default Pagination;
