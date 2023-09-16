import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changeAddModal } from '../../redux/slices/portfolio-slice';
import icon from '../../assets/icons/coin-icon.svg';

import styles from '../../pages/CoinPage/CoinPage.module.scss';
import AddCoins from '../Portfolio/AddCoin';

const CoinInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { coin } = useAppSelector((state) => state.activeCoin);
  const { isAddModalOpen } = useAppSelector((state) => state.portfolio);

  return (
    <section className={styles.page_info}>
      <div className={styles.page_info_common}>
        <span className={styles.page_info_common_rank}>{coin.rank}</span>
        <img className={styles.page_info_common_logo} src={icon} />
        <h3 className={styles.page_info_common_name}>{coin.name}</h3>
        <span className={styles.page_info_common_symbol}>{coin.symbol}</span>
      </div>
      <h1 className={styles.page_info_price}>${Number(coin.priceUsd).toFixed(2)}</h1>{' '}
      <button className={styles.page_info_add} onClick={() => dispatch(changeAddModal(true))}>
        Add
      </button>
      {isAddModalOpen && (
        <AddCoins
          data={{ name: coin.name, quantity: 0, symbol: coin.symbol, price: +coin.priceUsd }}
        />
      )}
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
  );
};

export default CoinInfo;
