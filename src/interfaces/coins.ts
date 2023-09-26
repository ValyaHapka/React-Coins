import { Status, SortType } from './commonInterfaces';

export interface ICoins {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface QueryCoins {
  timestamp: number;
  data: ICoins[];
}

export interface CoinsState {
  status: Status;
  statusAllCoins: Status;
  baseItems: ICoins[];
  items: ICoins[];
  allCoins: ICoins[];
  searchValue: string;
  sortType: SortType;
  currentPage: number;
}

export interface FetchCoinsParams {
  currentPage: number;
}
