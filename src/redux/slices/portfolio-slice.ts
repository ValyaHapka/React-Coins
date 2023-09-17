import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PortfolioCoin, PortfolioState } from '../../interfaces/portfolio';

const initialState: PortfolioState = {
  coins: [],
  isPortfolioModalOpen: false,
  isAddModalOpen: false,
  chosenCoin: { name: '', symbol: '', price: 0, quantity: 0 },
  price: 0,
  difference: 0,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCoins: (state, action: PayloadAction<PortfolioCoin>) => {
      const coins = state.coins;
      if (coins.length === 0) {
        coins.push(action.payload);
      } else {
        coins.forEach((coin) => {
          if (coins.some((coin) => coin.name === action.payload.name)) {
            coin.quantity += action.payload.quantity;
          } else {
            coins.push(action.payload);
          }
        });
      }
    },
    addCoinsFromStorage: (state, action) => {
      state.coins = action.payload;
    },
    removeCoin: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter((coin) => coin.name !== action.payload);
      if (state.coins.length === 0) {
        localStorage.removeItem('portfolio');
      }
    },
    changePortfolioModal: (state, action) => {
      state.isPortfolioModalOpen = action.payload;
    },
    changeAddModal: (state, action) => {
      state.isAddModalOpen = action.payload;
    },
    chooseCoin: (state, action) => {
      state.chosenCoin = action.payload;
    },
    changePrice: (state, action) => {
      state.price = action.payload;
    },
    changeDifference: (state, action) => {
      state.difference = action.payload;
    },
  },
});

export const {
  addCoins,
  addCoinsFromStorage,
  changePortfolioModal,
  changeAddModal,
  removeCoin,
  chooseCoin,
  changePrice,
  changeDifference,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
