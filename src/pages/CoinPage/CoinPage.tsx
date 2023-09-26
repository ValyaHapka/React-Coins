import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import { Header } from '../../components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changeAddModal, changePortfolioModal } from '../../redux/slices/portfolio-slice';
import { fetchCoinsByID } from '../../redux/slices/active-coin-slice';
import { fetchHistoryByID } from '../../redux/slices/chart-slice';
import { CoinInfo } from '../../components/ActiveCoin/CoinInfo';
import { ChartSection } from '../../components/ActiveCoin/CoinChart/ChartSection';
import { QueryProps } from '../../interfaces/historyCoin';
import back from '../../assets/icons/back.svg';
import Loader from '../../assets/json/loader.json';

import styles from './CoinPage.module.scss';
import { fetchCoins } from '../../redux/slices/coins-slice';

export const CoinPage = () => {
  const dispatch = useAppDispatch();
  const { chartTime, statusHistory } = useAppSelector((state) => state.history);
  const { statusCoin } = useAppSelector((state) => state.activeCoin);
  const { isPortfolioModalOpen, isAddModalOpen } = useAppSelector((state) => state.portfolio);
  const navigate = useNavigate();
  const params = useParams();

  const coinID = params.coinID as string;

  const clickOverlay = () => {
    if (isPortfolioModalOpen) {
      dispatch(changePortfolioModal(false));
    } else if (isAddModalOpen) {
      dispatch(changeAddModal(false));
    }
  };

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(fetchCoins({ currentPage: 1 }));
      dispatch(fetchCoinsByID(coinID as string));
    };

    fetchingData();
  }, [coinID, dispatch]);

  useEffect(() => {
    if (isPortfolioModalOpen || isAddModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPortfolioModalOpen, isAddModalOpen]);

  useEffect(() => {
    const queryHistory = async () => {
      let interval = 'h2';
      if (chartTime === '1d') {
        interval = 'h2';
      } else {
        interval = 'd1';
      }

      const props: QueryProps = { id: coinID, interval };
      dispatch(fetchHistoryByID(props));
    };
    queryHistory();
  }, [dispatch, chartTime, coinID]);

  return (
    <>
      {statusCoin === 'loaded' && (
        <>
          <Header />
          {(isPortfolioModalOpen || isAddModalOpen) && (
            <div className={styles.blur} onClick={clickOverlay} />
          )}
          <img className={styles.back} src={back} onClick={() => navigate('/')} />
          {statusCoin === 'loaded' && statusHistory === 'loaded' && (
            <div className={styles.page}>
              <CoinInfo />
              <ChartSection />
            </div>
          )}
          {statusHistory === 'loading' && (
            <Lottie animationData={Loader} className={styles.loader} />
          )}
        </>
      )}
      {statusCoin === 'error' && <span className={styles.error}>There is no such coin :(</span>}
    </>
  );
};
