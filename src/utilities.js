export const randomId = (length = 10) => {
  const chars =
    "0123456789ASDZFXGCHVJBKNLMPOIUYTREWQzxcvbnmlpkojihugyftdrseawq";
  return chars
    .split("")
    .sort((_) => Math.random() - 0.5)
    .slice(0, length)
    .join("");
};

export const getCartTotal = (cart) => {
  return cart
    .map((e) => (+e.price.toString().slice(0, -2) + 0.99) * e.quantity)
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2);
};
