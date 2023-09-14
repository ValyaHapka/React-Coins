import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosCoins } from '../../axios/axios';
import { RootState } from '../store';
import { Status } from '../../interfaces/commonInterfaces';
import { ChartTimeEnum, HistoryState, QueryHistoryCoinById } from '../../interfaces/historyCoin';

export const fetchHistoryByID = createAsyncThunk('coins/fetchHistoryByID', async (id: string) => {
  const { data } = await AxiosCoins.get<QueryHistoryCoinById>(`/assets/${id}/history?interval=h2`);

  return data;
});

const initialState: HistoryState = {
  status: Status.EMPTY,
  history: [],
  chartTime: ChartTimeEnum.DAY,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    changeTime: (state, action) => {
      state.chartTime = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchHistoryByID.pending, (state) => {
      state.status = Status.LOADING;
      state.history = [];
    });
    builder.addCase(
      fetchHistoryByID.fulfilled,
      (state, action: PayloadAction<QueryHistoryCoinById>) => {
        state.history = action.payload.data;
        state.status = Status.LOADED;
      },
    );
    builder.addCase(fetchHistoryByID.rejected, (state) => {
      state.status = Status.ERROR;
      state.history = [];
    });
  },
});

export const historySelector = (state: RootState) => state.history;

export const { changeTime } = historySlice.actions;

export default historySlice.reducer;
