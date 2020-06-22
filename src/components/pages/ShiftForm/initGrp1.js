export const init = () => {
  let initialValues = {}
  let part1 = {
    Cashier: 2,
    pumpAttendants: [{ PA: 1 }],
    pumpPrices: [ {diesel:1,accelrate:2,jxpremium:3},{diesel:1,accelrate:2,jxpremium:3}],
    advanceReading: [{}, {}, {}, {}],
    dipstick: [{}, {}, {}],
    lastDropBreakdown: [{ denomination: 1000, quantity: 0 }],
    expenses: [{}],
    creditsales: [{}],
    cashadvance: [{}],
  }
  initialValues = { ...initialValues, ...part1 }
  let pumpLiters = {}
  const pumpNums = ['1', '2', '3', '4']
  const products = ['Diesel', 'Accelrate', 'JxPremium']
  const suffixes = ['END', 'CAL', 'MGN']
  pumpNums.forEach((pumpNum) =>
    products.forEach((product) => suffixes.forEach((suffix) => {
        pumpLiters[`pump${pumpNum}${product}${suffix}`]=1
    }))
  )

  initialValues = { ...initialValues, ...pumpLiters }
  return initialValues
}
