export const CoinList = () =>
  `https://api.coinranking.com/v2/coins`;

export const SingleCoin = (id) =>
  `https://api.coinranking.com/v2/coin/${id}`;

export const HistoricalChart = (id, days = '24h') =>
  `https://api.coinranking.com/v2/coin/${id}/history?timePeriod=${days}`;

