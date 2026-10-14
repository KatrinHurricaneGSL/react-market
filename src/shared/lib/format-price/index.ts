const rubleFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number): string {
  return rubleFormatter.format(price);
}
