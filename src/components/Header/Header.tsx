import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { Portfolio } from '../Portfolio/Portfolio';
import {
  changeDifference,
  changePortfolioModal,
  changePrice,
} from '../../redux/slices/portfolio-slice';
import { PortfolioCoin } from '../../interfaces/portfolio';
import { percentage } from '../../helpers/percentage';
import { Status } from '../../interfaces/commonInterfaces';

import styles from './Header.module.scss';
import { countPrice } from '../../helpers/countPrice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isPortfolioModalOpen, coins, difference } = useAppSelector((state) => state.portfolio);
  const { status, baseItems } = useAppSelector((state) => state.coins);
  const [portfolioPrice, setPortfolioPrice] = useState(0);

  const setModal = () => {
    dispatch(changePortfolioModal(true));
  };

  useEffect(() => {
    setPortfolioPrice(countPrice(coins));
    dispatch(changePrice(portfolioPrice));
  }, [coins, dispatch, portfolioPrice]);

  useEffect(() => {
    const storagePortfolio = JSON.parse(localStorage.getItem('portfolio') as string);

    if (storagePortfolio && status === Status.LOADED) {
      dispatch(changePrice(storagePortfolio.price));

      const coinsInPortfolio: PortfolioCoin[] = storagePortfolio.coins.map(
        (coin: PortfolioCoin) => {
          for (let i = 0; i < baseItems.length; i++) {
            if (baseItems[i].name === coin.name) {
              return (coin = { ...coin, price: +baseItems[i].priceUsd });
            }
          }
        },
      );

      const newPrice = countPrice(coinsInPortfolio);

      dispatch(changeDifference(newPrice - portfolioPrice));
    }
  }, [baseItems, dispatch, portfolioPrice, status]);

  const topCoins = baseItems.slice(0, 3);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_coins}>
          {topCoins.map((coin) => (
            <div className={styles.header_coins_element} key={coin.id}>
              <span className={styles.header_coins_element_name}>{coin.name}</span>
              <span className={styles.header_coins_element_price}>
                ${Number(coin.priceUsd).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.header_portfolio} onClick={setModal}>
          <h4>Portfolio</h4>
          <span className={styles.header_portfolio_price}>
            {`${portfolioPrice.toFixed(2)}`}${' '}
            {difference > 0
              ? `+${difference.toFixed(2)} (${percentage(difference, portfolioPrice).toFixed(2)}%)`
              : difference !== 0 && coins.length > 0
              ? `${difference.toFixed(2)} (${percentage(difference, portfolioPrice).toFixed(2)})%`
              : ''}
          </span>
        </div>
        {isPortfolioModalOpen && <Portfolio />}
      </header>
    </>
  );
};
