export const reducer = (action, state) => {
  switch (action.type) {
    case "login":
      const user = action.payload[0];
      const products = action.payload[1];
      const cart = action.payload[2];

      return { user, products, cart };

    default:
      return state;
  }
};
