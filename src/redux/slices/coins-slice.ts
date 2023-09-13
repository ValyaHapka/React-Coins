import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosCoins } from '../../axios/axios';
import { SortTypeEnum, Status } from '../../interfaces/commonInterfaces';
import { RootState } from '../store';
import { CoinsState, FetchCoinsParams, ICoins, QueryCoins } from '../../interfaces/coins';

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async (params: FetchCoinsParams) => {
  const { currentPage } = params;

  const offsetValidate = () => {
    if (currentPage === 1) {
      return 0;
    } else {
      return currentPage * 100;
    }
  };

  const query = await AxiosCoins.get<QueryCoins>(`/assets?offset=${offsetValidate()}`);

  return query.data;
});

const initialState: CoinsState = {
  status: Status.EMPTY,
  baseItems: [],
  items: [],
  searchValue: '',
  sortType: { type: SortTypeEnum.EMPTY, desc: true },
  currentPage: 1,
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    changeSortType: (state, action) => {
      if (state.sortType.type !== action.payload) {
        state.sortType = { type: action.payload, desc: true };
      } else {
        state.sortType = { type: action.payload, desc: !state.sortType.desc };
      }
    },
    sortCoins: (state) => {
      function sortItems(type: SortTypeEnum) {
        if (state.sortType.desc) {
          return state.items.sort(
            (a, b) =>
              (b[type as keyof ICoins] as unknown as number) -
              (a[type as keyof ICoins] as unknown as number),
          );
        }

        return state.items.sort(
          (a, b) =>
            (a[type as keyof ICoins] as unknown as number) -
            (b[type as keyof ICoins] as unknown as number),
        );
      }

      state.items = sortItems(state.sortType.type);
    },

    searchByName: (state, action) => {
      state.searchValue = action.payload;

      function filterBySearch(coins: ICoins[]) {
        return coins.filter((coin) =>
          coin.name.toLowerCase().includes(state.searchValue.toLowerCase()),
        );
      }

      if (state.searchValue === '') {
        state.items = state.baseItems;
      } else {
        state.items = filterBySearch(state.baseItems);
      }
    },

    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCoins.pending, (state) => {
      state.status = Status.LOADING;
      state.baseItems = [];
      state.items = [];
    });
    builder.addCase(fetchCoins.fulfilled, (state, action: PayloadAction<QueryCoins>) => {
      state.baseItems = action.payload.data;
      state.items = action.payload.data;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchCoins.rejected, (state) => {
      state.status = Status.ERROR;
      state.baseItems = [];
      state.items = [];
    });
  },
});

export const { changeSortType, sortCoins, searchByName, changePage } = coinsSlice.actions;

export const coinsSliceSelector = (state: RootState) => state.coins;

export default coinsSlice.reducer;
