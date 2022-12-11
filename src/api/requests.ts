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

const BASE_URL = "https://api.monobank.ua";

export const getCurrencyList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/bank/currency`);
    const data: Promise<ICurrencyList | IError> = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
