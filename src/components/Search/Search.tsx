import React, { useRef, useState } from 'react';

import { useAppDispatch } from '../../redux/store';
import { searchByName } from '../../redux/slices/coins-slice';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState('');

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    dispatch(searchByName(event.target.value));
  };
  return (
    <>
      <input
        value={localValue}
        placeholder="Search Coin"
        ref={searchRef}
        onChange={updateValues}
        className={styles.search}
      />
    </>
  );
};

export default Search;
