import { SubmissionError } from "redux-form";
import FormAPI from "../../apis/FormAPI";
const getEid = (employees, nickName) => {
  let employee = employees.find((emp) => emp.nickName == nickName);
  return employee.eId;
};
const submitShiftForm = async (values, dispatch, props) => {
  const { fId } = props;
  const { employees } = props.employees.results;
  // For shift employees
  const shiftEmployees = [];
  shiftEmployees.push({ fId, eId: values.cashier, role: "Cashier" }); // push cashier
  values.pumpAttendants.forEach((attendant) => {
    if (attendant != null)
      shiftEmployees.push({ fId, eId: attendant, role: "Pump Attendant" });
  });
  //  For pump prices
  const pumpGroupPrices = [];
  const fields = ["diesel", "jxpremium", "accelrate"];
  fields.forEach((field) => {
    //   Group 1
    pumpGroupPrices.push({
      fId,
      groupNum: 1,
      pName: field,
      price: values.group1[field],
    });
    // Group 2
    pumpGroupPrices.push({
      fId,
      groupNum: 2,
      pName: field,
      price: values.group2[field],
    });
  });

  // Pump infos
  const pumpInfos = [];
  const pumps = ["pump1", "pump2", "pump3", "pump4"];
  const products = ["diesel", "accelrate", "jxpremium"];
  pumps.forEach((pump, index) =>
    products.forEach((product) => {
      pumpInfos.push({
        fId,
        end: values[pump][product]["end"],
        cal: values[pump][product]["cal"],
        mgn: values[pump][product]["mgn"],
        advance_reading: values[pump][product]["advRd"],
        pumpNum: index + 1,
        pName: product,
      });
    })
  );
  // Dipstick
  const dipstickReadings = [];
  products.forEach((product) => {
    dipstickReadings.push({ fId, pName: product, ...values[product] });
  });

  // Drop form
  const dropForm = {};
  dropForm.fId = fId;
  dropForm.drops = values.dropForm.drops;
  dropForm.amtPerDrop = values.dropForm.amtPerDrop;
  dropForm.lastDrop = values.dropForm.lastDrop;
  // Last Drop Breakdwon
  const lastDropBreakDown = { fId, ...values.breakdown };
  // Cash Advance
  const cashAdvances = [];
  values.cashadvance.forEach((cashadvance) =>
    cashAdvances.push({
      fId,
      eId: getEid(employees, cashadvance.employee),
      amount: cashadvance.amt,
    })
  );
  //  Expenses
  const expenses = [];
  values.expenses.forEach((expense) => expenses.push({ fId, ...expense }));
  //   Credit sales
  const creditsales = [];
  values.creditsales.forEach((creditsale) =>
    creditsales.push({ fId, ...creditsale })
  );
  try {
    await FormAPI.post("/", {
      shiftEmployees,
      pumpGroupPrices,
      pumpInfos,
      dipstickReadings,
      dropForm,
      lastDropBreakDown,
      cashAdvances,
      expenses,
    });
    // Update fetchMonthForms and props.openedForm
  } catch (error) {
    throw new SubmissionError({ _error: "Failed to submit basic information" });
  }
};

export default submitShiftForm;
