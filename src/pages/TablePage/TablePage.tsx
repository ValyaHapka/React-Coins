import { useEffect } from 'react';

import CoinsList from '../../components/CoinsList/CoinsList';
import { useAppDispatch } from '../../redux/store';
import { fetchCoins } from '../../redux/slices/coins-slice';

const TablePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  return <CoinsList />;
};

export default TablePage;
