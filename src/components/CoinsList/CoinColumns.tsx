import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changeSortType, coinsSliceSelector, sortCoins } from '../../redux/slices/coins-slice';
import { columns } from '../../assets/json/columns';
import sortDesc from '../../assets/icons/sort-desc.svg';
import sortAsc from '../../assets/icons/sort-asc.svg';
import { SortTypeEnum } from '../../interfaces/commonInterfaces';

const CoinColumns: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortType } = useAppSelector((state) => coinsSliceSelector(state));

  const sortCoinsLocal = useCallback(
    (type: string) => {
      dispatch(changeSortType(type));
      dispatch(sortCoins());
    },
    [dispatch],
  );
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.accessor}>
            <span onClick={() => sortCoinsLocal(column.accessor)}>
              {column.header}{' '}
              {sortType.type === column.accessor &&
                (column.accessor === SortTypeEnum.CHANGE24H ||
                  column.accessor === SortTypeEnum.MARKETCAP ||
                  column.accessor === SortTypeEnum.PRICE ||
                  column.accessor === SortTypeEnum.RANK) && (
                  <img src={sortType.desc ? sortDesc : sortAsc} alt="" />
                )}
            </span>{' '}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CoinColumns;
