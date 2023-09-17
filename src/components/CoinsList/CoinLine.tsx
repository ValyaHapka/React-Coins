import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { coinsSliceSelector } from '../../redux/slices/coins-slice';
import { ICoins } from '../../interfaces/coins';
import { columns } from '../../assets/json/columns';
import { changeAddModal, chooseCoin } from '../../redux/slices/portfolio-slice';
import AddCoins from '../Portfolio/AddCoin';
import { PortfolioCoin } from '../../interfaces/portfolio';
import { buildLink } from '../../helpers/buildLink';

const CoinLine: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => coinsSliceSelector(state));
  const { isAddModalOpen, chosenCoin } = useAppSelector((state) => state.portfolio);

  const navigate = useNavigate();

  const path = (id: string) => {
    return `/${id}`;
  };

  const handleClick = (e: React.MouseEvent, data: PortfolioCoin) => {
    e.stopPropagation();
    dispatch(chooseCoin(data));
    dispatch(changeAddModal(true));
  };

  return (
    <>
      <tbody>
        {items.map((row) => (
          <tr key={row.name} onClick={!isAddModalOpen ? () => navigate(path(row.id)) : () => null}>
            <td>
              <img src={buildLink(row.symbol)} />
            </td>
            {columns.map((column) => (
              <>
                {(isNaN(Number(row[column.accessor as keyof ICoins])) ||
                  column.accessor === 'rank') &&
                column.accessor !== 'add' ? (
                  <td key={column.accessor}>{row[column.accessor as keyof ICoins]}</td>
                ) : column.accessor === 'add' ? (
                  <>
                    <td
                      onClick={(e) =>
                        handleClick(e, {
                          name: row.name,
                          price: +row.priceUsd,
                          symbol: row.symbol,
                          quantity: 0,
                        })
                      }>
                      add
                    </td>
                  </>
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
      {isAddModalOpen && <AddCoins data={chosenCoin as PortfolioCoin} />}
    </>
  );
};

export default CoinLine;
