export interface PortfolioCoin {
  name: string;
  symbol: string;
  price: number;
  quantity: number;
}

export interface PortfolioState {
  coins: PortfolioCoin[];
  isPortfolioModalOpen: boolean;
  isAddModalOpen: boolean;
  chosenCoin: PortfolioCoin;
  price: number;
  difference: number;
}
