import { useAppSelector } from '../../redux/store';
import { coinsSliceSelector } from '../../redux/slices/coins-slice';
import { CoinLine } from './CoinLine';
import { CoinColumns } from './CoinColumns';

import styles from './CoinsList.module.scss';

export const CoinsList = () => {
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
