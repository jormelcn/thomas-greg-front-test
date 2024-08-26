export function formatMoney(
  money: { amount: number; currency: string },
  locale: string = "es-CO"
): string {
  console.log(money.currency)
  const currencyFormater = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  return currencyFormater.format(money.amount);
}
