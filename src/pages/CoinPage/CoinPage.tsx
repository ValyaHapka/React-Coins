import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCoinsByID } from '../../redux/slices/active-coin-slice';
import back from '../../assets/icons/back.svg';
import icon from '../../assets/icons/coin-icon.svg';

import styles from './CoinPage.module.scss';
import CoinChart, { ChartData } from '../../components/ActiveCoin/CoinChart';
import { changeTime, fetchHistoryByID } from '../../redux/slices/chart-slice';
import TimeButton from '../../components/ActiveCoin/TimeButton';

const CoinPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { coin } = useAppSelector((state) => state.activeCoin);
  const { history, status, chartTime } = useAppSelector((state) => state.history);
  const navigate = useNavigate();
  const { coinID } = useParams();

  let data: ChartData[] = [];
  const dayData = [...new Array(10)].fill(null);
  const weekData = [...new Array(7)];
  const monthData = [...new Array(30)];

  const timeButtons = ['1d', '7d', '1m'];

  const timeClick = (value: string) => {
    dispatch(changeTime(value));
  };

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(fetchCoinsByID(coinID as string));
    };

    const queryHistory = async () => {
      dispatch(fetchHistoryByID(coinID as string));
    };
    queryHistory();
    fetchingData();
  }, [coinID, dispatch]);

  if (status === 'loaded') {
    switch (chartTime) {
      case '1d':
        data = dayData.map((__, i) => {
          return {
            time: new Date(history[i].time).toDateString(),
            price: Number(history[i].priceUsd),
          };
        });

        break;
      case '7d':
        data = weekData.map((__, i) => {
          return {
            time: new Date(history[i].time).toDateString(),
            price: Number(history[i].priceUsd),
          };
        });
        break;
      case '1m':
        data = monthData.map((__, i) => {
          return {
            time: new Date(history[i].time).toDateString(),
            price: Number(history[i].priceUsd),
          };
        });
    }
  }

  return (
    <>
      <img className={styles.back} src={back} onClick={() => navigate('/')} />
      <div className={styles.page}>
        <section className={styles.page_info}>
          <div className={styles.page_info_common}>
            <span className={styles.page_info_common_rank}>{coin.rank}</span>
            <img className={styles.page_info_common_logo} src={icon} />
            <h3 className={styles.page_info_common_name}>{coin.name}</h3>
            <span className={styles.page_info_common_symbol}>{coin.symbol}</span>
          </div>
          <h1 className={styles.page_info_price}>${Number(coin.priceUsd).toFixed(2)}</h1>{' '}
          <button className={styles.page_info_add}>Add to watchlist</button>
          <ul className={styles.page_info_other}>
            <li className={styles.page_info_other_element}>
              <span>Market Cap</span>
              {coin.marketCapUsd ? Number(coin.marketCapUsd).toFixed(3) : '--'}
            </li>{' '}
            <li className={styles.page_info_other_element}>
              <span>Supply</span>
              {Math.round(Number(coin.supply))} {coin.symbol}
            </li>{' '}
            <li className={styles.page_info_other_element}>
              <span>Max Supply</span>
              {coin.maxSupply ? Math.round(Number(coin.maxSupply)) : '∞'}
            </li>
          </ul>
        </section>
        <section className={styles.page_chart}>
          <div className={styles.page_chart_time}>
            {timeButtons.map((el) => {
              return <TimeButton valueButton={el} click={timeClick} />;
            })}
          </div>
          {status === 'loaded' && <CoinChart data={data} />}
        </section>
      </div>
    </>
  );
};

export default CoinPage;
