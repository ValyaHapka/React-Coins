import React from 'react';

import { AddCoinProps } from '../../interfaces/addCoin';
import { useAppDispatch } from '../../redux/store';
import { addCoins, changeAddModal } from '../../redux/slices/portfolio-slice';

import styles from './AddButton.module.scss';

export const AddButton: React.FC<AddCoinProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const click = () => {
    if (data.quantity > 0 && data.quantity < 5000) {
      dispatch(addCoins(data));
      dispatch(changeAddModal(false));
    }
  };

  return (
    <button className={styles.button} onClick={click}>
      Add to portfolio
    </button>
  );
};
