import React from 'react';

import { useAppSelector } from '../../../redux/store';
import { TimeButtonProps } from '../../../interfaces/historyCoin';

import styles from './TimeButton.module.scss';

const TimeButton: React.FC<TimeButtonProps> = ({ valueButton, click }) => {
  const { chartTime } = useAppSelector((state) => state.history);

  return (
    <button
      className={chartTime === valueButton ? styles.button_active : styles.button}
      onClick={() => click(valueButton)}>
      {valueButton}
    </button>
  );
};

export default TimeButton;
