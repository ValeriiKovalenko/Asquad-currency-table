export const epochToLocalDate = (seconds: number) => {
  const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  return new Date(date.setUTCSeconds(seconds)).toLocaleString();
};
