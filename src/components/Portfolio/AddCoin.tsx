import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import close from '../../assets/icons/close-modal.svg';
import { changeAddModal, chooseCoin } from '../../redux/slices/portfolio-slice';
import { AddButton } from '../UI/AddButton';
import { PortfolioCoin } from '../../interfaces/portfolio';
import { AddCoinProps } from '../../interfaces/addCoin';

import styles from './AddCoins.module.scss';

export const AddCoins: React.FC<AddCoinProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('0');
  const { chosenCoin } = useAppSelector((state) => state.portfolio);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const setModal = () => {
    dispatch(changeAddModal(false));
  };

  useEffect(() => {
    const interceptedData = { ...data, quantity: +inputValue };
    dispatch(chooseCoin(interceptedData));
  }, [dispatch, inputValue]);

  return (
    <div className={styles.add}>
      <img src={close} onClick={setModal} className={styles.add_close} />
      <div className={styles.add_actions}>
        <h6>How many coins of {`${(chosenCoin as PortfolioCoin).name}`} you want to add?</h6>
        <input type="number" ref={inputRef} value={inputValue} onChange={changeValue} />
        <AddButton data={chosenCoin as PortfolioCoin} />
      </div>
    </div>
  );
};
