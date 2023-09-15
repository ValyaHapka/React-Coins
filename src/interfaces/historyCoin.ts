import { Status } from './commonInterfaces';

export enum ChartTimeEnum {
  DAY = '1d',
  WEEK = '7d',
  MONTH = '1m',
}

export interface TimeButtonProps {
  valueButton: ChartTimeEnum;
  click: (value: ChartTimeEnum) => void;
}

export interface HistoryData {
  priceUsd: string;
  time: number;
}

export interface QueryProps {
  id: string;
  interval: string;
}

export interface QueryHistoryCoinById {
  timestamp: number;
  data: HistoryData[];
}

export interface HistoryState {
  statusHistory: Status;
  history: HistoryData[];
  chartTime: ChartTimeEnum;
}
