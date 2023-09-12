import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosCoins } from '../../axios/axios';
import { Status } from '../../interfaces/commonInterfaces';
import { RootState } from '../store';
import { CoinsState, ICoins, QueryCoins } from '../../interfaces/coins';

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
  const query = await AxiosCoins.get<QueryCoins>('/assets');
  console.log(query.data);

  return query.data;
});

const initialState: CoinsState = {
  status: Status.EMPTY,
  baseItems: [],
  items: [],
  searchValue: '',
  sortTypeDesc: true,
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    //   sortBooks: (state, action) => {
    //     state.sortTypeDesc = action.payload;

    //     function sortItems() {
    //       if (action.payload) {
    //         return state.items.sort((a, b) => (b.rating as number) - (a.rating as number));
    //       }

    //       return state.items.sort((a, b) => (a.rating as number) - (b.rating as number));
    //     }

    //     state.items = sortItems();
    //   },

    //   filterBooks: (state, action: PayloadAction<string>) => {
    //     function filterByCategory() {
    //       return state.baseItems.filter((book) =>
    //         book.categories?.some((category: string) => category === action.payload)
    //       );
    //     }

    //     function filterBySearch(books: IBooks[]) {
    //       return books.filter((book) => book.title.toLowerCase().includes(state.searchValue.toLowerCase()));
    //     }

    //     if (action.payload === 'Все книги') {
    //       state.items = filterBySearch(state.baseItems);
    //     }

    //     if (state.searchValue && action.payload !== 'Все книги') {
    //       state.items = filterBySearch(filterByCategory());
    //     } else if (!state.searchValue && action.payload !== 'Все книги') {
    //       state.items = filterByCategory();
    //     }
    //   },

    setReduxSearchValue: (state, action) => {
      state.searchValue = action.payload;
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

export const coinsSliceSelector = (state: RootState) => state.coins;

export default coinsSlice.reducer;
