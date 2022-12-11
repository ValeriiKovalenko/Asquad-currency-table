export type ICurrencyRow = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateSell: number;
  rateBuy?: number;
  rateCross?: number;
};
export type IError = {
  errorDescription: string;
};

export type ICurrencyList = ICurrencyRow[];
export const getCurrencyList = async () => {
  return fetch("https://api.monobank.ua/bank/currency").then(
    (res) => res.json() as Promise<ICurrencyList | IError>
  );
};
