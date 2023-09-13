import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changeSortType, coinsSliceSelector, sortCoins } from '../../redux/slices/coins-slice';
import { ICoins } from '../../interfaces/coins';
import { columns } from '../../assets/json/columns';

import styles from './CoinsList.module.scss';

const CoinsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, sortType } = useAppSelector((state) => coinsSliceSelector(state));

  const sortCoinsLocal = useCallback(
    (type: string) => {
      dispatch(changeSortType(type));
      dispatch(sortCoins());
    },
    [dispatch, sortType.desc],
  );

  return (
    <>
      {status === 'loaded' && (
        <div className={styles.table_container}>
          <table className={styles.crypto_table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.accessor} onClick={() => sortCoinsLocal(column.accessor)}>
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.name}>
                  {columns.map((column) => (
                    <>
                      {(isNaN(Number(row[column.accessor as keyof ICoins])) ||
                        column.accessor === 'rank') &&
                      column.accessor !== 'add' ? (
                        <td key={column.accessor}>{row[column.accessor as keyof ICoins]}</td>
                      ) : column.accessor === 'add' ? (
                        <td>add</td>
                      ) : (
                        <td key={column.accessor}>
                          {Number(row[column.accessor as keyof ICoins]).toFixed(2)}
                        </td>
                      )}
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CoinsList;
