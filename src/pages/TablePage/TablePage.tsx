import { useEffect } from 'react';

import CoinsList from '../../components/CoinsList/CoinsList';
import { useAppDispatch } from '../../redux/store';
import { fetchCoins } from '../../redux/slices/coins-slice';
import Search from '../../components/Search/Search';

const TablePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <>
      <Search />
      <CoinsList />
    </>
  );
};

export default TablePage;
