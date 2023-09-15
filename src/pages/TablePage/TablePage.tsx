import { useEffect } from 'react';
import Lottie from 'lottie-react';

import CoinsList from '../../components/CoinsList/CoinsList';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changePage, fetchCoins } from '../../redux/slices/coins-slice';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../assets/json/loader.json';

import styles from './TablePage.module.scss';

const TablePage = () => {
  const dispatch = useAppDispatch();
  const { currentPage, status } = useAppSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins({ currentPage }));
  }, [dispatch, currentPage]);

  return (
    <div className={styles.coins}>
      {status === 'loaded' && (
        <>
          <Search />
          <CoinsList />
          <Pagination
            currentPage={currentPage}
            onChangePage={(number) => dispatch(changePage(number))}
          />
        </>
      )}

      {status === 'loading' && <Lottie animationData={Loader} className={styles.loader} />}
    </div>
  );
};

export default TablePage;
