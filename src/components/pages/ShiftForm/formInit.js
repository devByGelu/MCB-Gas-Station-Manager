const formInit = () => {
  let initialValues = {
    Cashier: 2,
    pumpAttendants: [{ PA: 1 }],
    pumpPrices: [{}, {}],
    advanceReading: [{}, {}, {}, {}],
    dipstick: [{}, {}, {}],
    lastDropBreakdown: [{ denomination: 1000, quantity: 0 }],
    expenses: [{}],
    creditsales: [{}],
    cashadvance: [{}],
  }
  let pumps = ["1", "2", "3", "4"]
  let products = ["Diesel", "Accelrate", "JxPremium"]
  let suffixes = ["END", "CAL", "MGN"]
  pumps.forEach((pump) => {
    products.forEach((product) => {
      suffixes.forEach((suffix) => {
        let field = `pump${pump}${product}${suffix}`
        if (suffix == "CAL") initialValues[field] = 0
        if (pump == "1") {
          if (suffix == "MGN" && product == "Diesel") initialValues[field] = 4
          if (
            suffix == "MGN" &&
            (product == "Accelrate" || product == "JxPremium")
          )
            initialValues[field] = 4.3
        }
        if (pump == "3") {
          if (suffix == "MGN" && product == "Diesel") initialValues[field] = 3
          if (
            suffix == "MGN" &&
            (product == "Accelrate" || product == "JxPremium")
          )
            initialValues[field] = 3.3
        }
        if(pump == '2'){
          if (suffix == "MGN" && product == "JxPremium") initialValues[field] = 4
          if (
            suffix == "MGN" &&
            (product == "Accelrate" || product == "Diesel")
          )
            initialValues[field] = 4.3
        }
        if (pump == "4") {
          if (suffix == "MGN" && product == "JxPremium") initialValues[field] = 3
          if (
            suffix == "MGN" &&
            (product == "Diesel" || product == "Accelrate")
          )
            initialValues[field] = 3.3
        }
      })
    })
  })
  return initialValues
}
export default formInit
