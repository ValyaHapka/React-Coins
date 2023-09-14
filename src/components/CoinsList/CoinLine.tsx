import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../redux/store';
import { coinsSliceSelector } from '../../redux/slices/coins-slice';
import { ICoins } from '../../interfaces/coins';
import { columns } from '../../assets/json/columns';
import icon from '../../assets/icons/coin-icon.svg';

const CoinLine: React.FC = () => {
  const { items } = useAppSelector((state) => coinsSliceSelector(state));
  const navigate = useNavigate();

  const path = (id: string) => {
    return `/${id}`;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <tbody>
      {items.map((row) => (
        <tr key={row.name} onClick={() => navigate(path(row.id))}>
          <td>
            <img src={icon} />
          </td>
          {columns.map((column) => (
            <>
              {(isNaN(Number(row[column.accessor as keyof ICoins])) ||
                column.accessor === 'rank') &&
              column.accessor !== 'add' ? (
                <td key={column.accessor}>{row[column.accessor as keyof ICoins]}</td>
              ) : column.accessor === 'add' ? (
                <td onClick={handleClick}>add</td>
              ) : Number(row[column.accessor as keyof ICoins]).toFixed(2) !== '0.00' ? (
                <td key={column.accessor}>
                  {Number(row[column.accessor as keyof ICoins]).toFixed(2)}
                </td>
              ) : Number(row[column.accessor as keyof ICoins]) !== 0 ? (
                <td key={column.accessor}>{Number(row[column.accessor as keyof ICoins])}</td>
              ) : (
                <td key={column.accessor}>--</td>
              )}
            </>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default CoinLine;
