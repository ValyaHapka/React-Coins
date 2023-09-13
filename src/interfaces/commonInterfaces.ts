export enum Status {
  EMPTY = '',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export enum SortTypeEnum {
  EMPTY = '',
  MARKETCAP = 'marketCapUsd',
  PRICE = 'priceUsd',
  CHANGE24H = 'changePercent24Hr',
  RANK = 'rank',
}

export interface SortType {
  type: SortTypeEnum;
  desc: boolean;
}
