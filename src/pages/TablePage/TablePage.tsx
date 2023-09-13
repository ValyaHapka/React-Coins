import { useEffect } from 'react';

import CoinsList from '../../components/CoinsList/CoinsList';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changePage, fetchCoins } from '../../redux/slices/coins-slice';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';

const TablePage = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins({ currentPage }));
  }, [dispatch, currentPage]);

  return (
    <>
      <Search />
      <CoinsList />
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(changePage(number))}
      />
    </>
  );
};

export default TablePage;
