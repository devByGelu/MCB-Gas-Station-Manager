const formInit = () => {
  let initialValues = {
    Cashier: 2,
    pumpAttendants: [{ PA: 1 }],
    pumpPrices: [
      {  },
      {  },
    ],
    advanceReading: [{}, {}, {}, {}],
    dipstick: [{}, {}, {}],
    lastDropBreakdown: [{ denomination: 1000, quantity: 0 }],
    expenses: [{}],
    creditsales: [{}],
    cashadvance: [{}],
  }
  return initialValues
}
export default formInit