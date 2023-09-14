import { Status } from './commonInterfaces';

export enum ChartTimeEnum {
  DAY = '1d',
  WEEK = '7d',
  MONTH = '1m',
}

export interface HistoryData {
  priceUsd: string;
  time: number;
}

export interface QueryHistoryCoinById {
  timestamp: number;
  data: HistoryData[];
}

export interface HistoryState {
  status: Status;
  history: HistoryData[];
  chartTime: ChartTimeEnum;
}
