import cc from "currency-codes";

const formatCurrencyCode = (code: number) => {
  const string = code.toString().trim();
  if (string.length === 3) {
    return string;
  }
  if (string.length === 2) {
    return `0${string}`;
  }
  if (string.length === 1) {
    return `00${string}`;
  }
  return "";
};

export const convertCurrencyCode = (code: number) => {
  return cc.number(formatCurrencyCode(code));
};
