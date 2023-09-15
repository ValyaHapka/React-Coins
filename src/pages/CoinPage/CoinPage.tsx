import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCoinsByID } from '../../redux/slices/active-coin-slice';
import { fetchHistoryByID } from '../../redux/slices/chart-slice';
import back from '../../assets/icons/back.svg';

import styles from './CoinPage.module.scss';
import CoinInfo from '../../components/ActiveCoin/CoinInfo';
import ChartSection from '../../components/ActiveCoin/CoinChart/ChartSection';
import { QueryProps } from '../../interfaces/historyCoin';

const CoinPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chartTime } = useAppSelector((state) => state.history);
  const navigate = useNavigate();
  const params = useParams();

  const coinID = params.coinID as string;

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(fetchCoinsByID(coinID as string));
    };

    fetchingData();
  }, [coinID, dispatch]);

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
      <img className={styles.back} src={back} onClick={() => navigate('/')} />
      <div className={styles.page}>
        <CoinInfo />
        <ChartSection />
      </div>
    </>
  );
};

export default CoinPage;
