import React from 'react';

import { useAppSelector } from '../../redux/store';
import { coinsSliceSelector } from '../../redux/slices/coins-slice';
import { ICoins } from '../../interfaces/coins';
import { columns } from '../../assets/json/columns';

const CoinLine: React.FC = () => {
  const { items } = useAppSelector((state) => coinsSliceSelector(state));

  return (
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
  );
};

export default CoinLine;
