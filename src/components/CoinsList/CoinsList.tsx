import React from 'react';

import { useAppSelector } from '../../redux/store';
import { coinsSliceSelector } from '../../redux/slices/coins-slice';

import styles from './CoinsList.module.scss';
import CoinLine from './CoinLine';
import CoinColumns from './CoinColumns';

const CoinsList: React.FC = () => {
  const { status } = useAppSelector((state) => coinsSliceSelector(state));

  return (
    <>
      {status === 'loaded' && (
        <div className={styles.table_container}>
          <table className={styles.crypto_table}>
            <CoinColumns />
            <CoinLine />
          </table>
        </div>
      )}
    </>
  );
};

export default CoinsList;
