import axios from 'axios';

export const AxiosCoins = axios.create({
  baseURL: 'https://api.coincap.io/v2',
});

export const AxiosIcon = axios.create({
  baseURL: 'https://assets.coincap.io',
  headers: { 'Access-Control-Allow-Origin': '*' },
});
