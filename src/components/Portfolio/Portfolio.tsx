import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { changePortfolioModal, removeCoin } from '../../redux/slices/portfolio-slice';
import close from '../../assets/icons/close-modal.svg';

import styles from './Portfolio.module.scss';

export const Portfolio: React.FC = () => {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.portfolio);

  const setModal = () => {
    dispatch(changePortfolioModal(false));
  };
  return (
    <div className={styles.portfolio}>
      <img src={close} onClick={setModal} className={styles.portfolio_close} />
      {coins.length > 0 ? (
        <ul className={styles.portfolio_list}>
          {coins.map((c) => (
            <li className={styles.portfolio_list_element}>
              <div className={styles.portfolio_list_element_info}>
                <h4>{c.name}</h4>
                <span>{c.symbol}</span>
                <h5>{c.price.toFixed(2) !== '0.00' ? c.price.toFixed(2) : c.price}</h5>
              </div>
              <div className={styles.portfolio_list_element_actions}>
                <h6>{c.quantity}</h6>
                <p onClick={() => dispatch(removeCoin(c.name))}>Delete</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h6>Add some coins to your portfolio</h6>
      )}
    </div>
  );
};
