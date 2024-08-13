export const BUY_LICENSE = 'BUY_LICENSE';
export const SELL_LICENSE = 'SELL_LICENSE';

export const buyLicense = (gameId, quantity) => {
  return {
    type: BUY_LICENSE,
    payload: { gameId, quantity },
  };
};

export const sellLicense = (gameId, quantity) => {
  return {
    type: SELL_LICENSE,
    payload: { gameId, quantity },
  };
};
