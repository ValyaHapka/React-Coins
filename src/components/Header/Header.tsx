import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { Portfolio } from '../Portfolio/Portfolio';
import {
  changeDifference,
  changePortfolioModal,
  changePrice,
} from '../../redux/slices/portfolio-slice';
import { PortfolioCoin } from '../../interfaces/portfolio';

import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { baseItems } = useAppSelector((state) => state.coins);
  const { isPortfolioModalOpen, coins, difference } = useAppSelector((state) => state.portfolio);
  const storagePortfolio = JSON.parse(localStorage.getItem('portfolio') as string);

  function percentage(partialValue: number, totalValue: number) {
    return (100 * partialValue) / totalValue;
  }

  const setModal = () => {
    dispatch(changePortfolioModal(true));
  };

  const portfolioPrice = coins.reduce((acc, cv) => acc + cv.price * cv.quantity, 0);

  useEffect(() => {
    dispatch(changePrice(portfolioPrice));
  }, [dispatch, portfolioPrice]);

  useEffect(() => {
    if (storagePortfolio) {
      const coinsInPortfolio: PortfolioCoin[] = storagePortfolio.coins.map(
        (coin: PortfolioCoin) => {
          for (let i = 0; i < baseItems.length; i++) {
            if (baseItems[i].name === coin.name) {
              return (coin = { ...coin, price: +baseItems[i].priceUsd });
            }
          }
        },
      );

      const newPrice = coinsInPortfolio.reduce(
        (acc, cv: PortfolioCoin) => acc + cv.price * cv.quantity,
        0,
      );

      dispatch(changeDifference(newPrice - portfolioPrice));
    }
  }, [dispatch, baseItems]);

  const topCoins = baseItems.slice(0, 3);
  return (
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
  );
};
