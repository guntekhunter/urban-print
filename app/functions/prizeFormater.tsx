export const prize = (thePrize: any) => {
  const formattedPrize = new Intl.NumberFormat("id-ID").format(thePrize);
  return `Rp. ${formattedPrize}`;
};
