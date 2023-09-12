type Column = {
  header: string;
  accessor: string;
};

export const columns: Column[] = [
  {
    header: '#',
    accessor: 'rank',
  },
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: '',
    accessor: 'symbol',
  },
  {
    header: 'Price',
    accessor: 'priceUsd',
  },
  {
    header: '24h %',
    accessor: 'changePercent24Hr',
  },
  {
    header: 'Market Cap',
    accessor: 'marketCapUsd',
  },
  {
    header: '',
    accessor: 'add',
  },
];
