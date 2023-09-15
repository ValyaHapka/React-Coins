import { ICoins } from './coins';
import { Status } from './commonInterfaces';

export interface QueryCoinById {
  timestamp: number;
  data: ICoins;
}

export interface ActiveCoinState {
  statusCoin: Status;
  coin: ICoins | Record<string, never>;
}
