import React, { useCallback } from 'react';

import { useAppDispatch } from '../../redux/store';
import { changeSortType, sortCoins } from '../../redux/slices/coins-slice';
import { columns } from '../../assets/json/columns';

const CoinColumns: React.FC = () => {
  const dispatch = useAppDispatch();

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
          <th key={column.accessor} onClick={() => sortCoinsLocal(column.accessor)}>
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CoinColumns;
