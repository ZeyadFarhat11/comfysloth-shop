export const randomId = (length = 10) => {
  const chars =
    "0123456789ASDZFXGCHVJBKNLMPOIUYTREWQzxcvbnmlpkojihugyftdrseawq";
  return chars
    .split("")
    .sort((_) => Math.random() - 0.5)
    .slice(0, length)
    .join("");
};
