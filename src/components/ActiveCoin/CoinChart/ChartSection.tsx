import React from 'react';

import styles from '../../../pages/CoinPage/CoinPage.module.scss';
import CoinChart, { ChartData } from './CoinChart';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { changeTime } from '../../../redux/slices/chart-slice';
import TimeButton from './TimeButton';
import { ChartTimeEnum } from '../../../interfaces/historyCoin';

const ChartSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { history, status, chartTime } = useAppSelector((state) => state.history);

  let data: ChartData[] = [];
  const dayData = [...new Array(12)];
  const weekData = [...new Array(7)];
  const monthData = [...new Array(30)];

  const timeButtons = ['1d', '7d', '1m'];

  const timeClick = (value: ChartTimeEnum) => {
    dispatch(changeTime(value));
  };

  if (status === 'loaded') {
    switch (chartTime) {
      case '1d':
        data = dayData.map((__, i) => {
          return {
            time: new Date(history[i].time).toLocaleTimeString('en-GB'),
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
    <section className={styles.page_chart}>
      <div className={styles.page_chart_time}>
        {timeButtons.map((el) => {
          return <TimeButton valueButton={el as ChartTimeEnum} click={timeClick} />;
        })}
      </div>
      {status === 'loaded' && <CoinChart data={data} />}
    </section>
  );
};

export default ChartSection;