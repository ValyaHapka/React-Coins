import { useEffect } from 'react';
import Lottie from 'lottie-react';

import { Header } from '../../components/Header/Header';
import { CoinsList } from '../../components/CoinsList/CoinsList';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changePage, fetchCoins } from '../../redux/slices/coins-slice';
import { Search } from '../../components/Search/Search';
import { Pagination } from '../../components/Pagination/Pagination';
import Loader from '../../assets/json/loader.json';
import {
  addCoinsFromStorage,
  changeAddModal,
  changePortfolioModal,
} from '../../redux/slices/portfolio-slice';

import styles from './TablePage.module.scss';

export const TablePage = () => {
  const dispatch = useAppDispatch();
  const { currentPage, status } = useAppSelector((state) => state.coins);
  const { isPortfolioModalOpen, isAddModalOpen, coins, price } = useAppSelector(
    (state) => state.portfolio,
  );

  useEffect(() => {
    dispatch(fetchCoins({ currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (isPortfolioModalOpen || isAddModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPortfolioModalOpen, isAddModalOpen]);

  useEffect(() => {
    const storagePortfolio = JSON.parse(localStorage.getItem('portfolio') as string);

    if (coins.length !== 0) {
      localStorage.setItem('portfolio', JSON.stringify({ coins, price: price.toFixed(2) }));
    } else if (storagePortfolio) {
      dispatch(addCoinsFromStorage(storagePortfolio.coins));
    }
  }, [coins, dispatch, price]);

  const clickOverlay = () => {
    if (isPortfolioModalOpen) {
      dispatch(changePortfolioModal(false));
    } else if (isAddModalOpen) {
      dispatch(changeAddModal(false));
    }
  };

  return (
    <>
      {(isPortfolioModalOpen || isAddModalOpen) && (
        <div className={styles.blur} onClick={clickOverlay} />
      )}
      <div className={styles.coins}>
        {status === 'loaded' && (
          <>
            <Header />
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
    </>
  );
};
