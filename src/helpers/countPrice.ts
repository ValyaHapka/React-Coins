import { PortfolioCoin } from '../interfaces/portfolio';

export function countPrice(arr: PortfolioCoin[]) {
  return arr.reduce((acc, cv: PortfolioCoin) => acc + cv.price * cv.quantity, 0);
}
