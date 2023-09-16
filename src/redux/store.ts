import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import coinsReducer from './slices/coins-slice';
import activeCoinReducer from './slices/active-coin-slice';
import historyReducer from './slices/chart-slice';
import portfolioReducer from './slices/portfolio-slice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    activeCoin: activeCoinReducer,
    history: historyReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
