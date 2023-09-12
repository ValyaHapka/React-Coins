import axios from 'axios';

export const AxiosCoins = axios.create({
  baseURL: 'https://api.coincap.io/v2',
});
