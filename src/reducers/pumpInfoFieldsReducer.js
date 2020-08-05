function init() {
  let data = {};
  const pumps = ["pump1", "pump2", "pump3", "pump4"];
  const products = ["diesel", "accelrate", "jxpremium"];
  const fields = ["mgn", "cal"];

  pumps.forEach((pump) => {
    data[pump] = {};
    products.forEach((product) => {
      data[pump][product] = {};
      fields.forEach((field) => {
        data[pump][product][field] = true;
      });
    });
  });
  console.log(JSON.stringify(data));
  return data;
}
const initialState = init();

export default (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_PUMP_INFO_FIELD": {
      const { number, field, product, switchSet } = action.payload;
      return {
        ...state,
        [`pump${number}`]: {
          ...state[`pump${number}`],
          [product]: {
            ...state[`pump${number}`][product],
            [`${field}`]: switchSet,
          },
        },
      };
    }
    default:
      return state;
  }
};
