import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosCoins } from '../../axios/axios';
import { RootState } from '../store';
import { ActiveCoinState, QueryCoinById } from '../../interfaces/activeCoin';
import { Status } from '../../interfaces/commonInterfaces';

export const fetchCoinsByID = createAsyncThunk('coins/fetchCoinsByID', async (id: string) => {
  const query = await AxiosCoins.get<QueryCoinById>(`/assets/${id}`);

  return query.data;
});

const initialState: ActiveCoinState = {
  statusCoin: Status.EMPTY,
  coin: {},
};

export const activeCoinSlice = createSlice({
  name: 'activeCoin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCoinsByID.pending, (state) => {
      state.statusCoin = Status.LOADING;
      state.coin = {};
    });
    builder.addCase(fetchCoinsByID.fulfilled, (state, action: PayloadAction<QueryCoinById>) => {
      state.coin = action.payload.data;
      state.statusCoin = Status.LOADED;
    });
    builder.addCase(fetchCoinsByID.rejected, (state) => {
      state.statusCoin = Status.ERROR;
      state.coin = {};
    });
  },
});

export const activeCoinSelector = (state: RootState) => state.activeCoin;

export default activeCoinSlice.reducer;
