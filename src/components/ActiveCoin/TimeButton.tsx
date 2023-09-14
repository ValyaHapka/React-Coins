import React from 'react';

import { useAppSelector } from '../../redux/store';

import styles from './TimeButton.module.scss';

interface TimeButtonProps {
  valueButton: string;
  click: (value: string) => void;
}

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
