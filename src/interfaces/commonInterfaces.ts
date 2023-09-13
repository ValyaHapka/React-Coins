export enum Status {
  EMPTY = '',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export enum SortTypeEnum {
  EMPTY = '',
  MARKETCAP = 'marketCap',
  PRICE = 'price',
  CHANGE24H = 'changePercent24Hr',
}

export interface SortType {
  type: SortTypeEnum;
  desc: boolean;
}
