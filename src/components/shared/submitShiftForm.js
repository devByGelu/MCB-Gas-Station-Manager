import { SubmissionError } from "redux-form";
import ShiftFormAPI from "../../apis/ShiftFormAPI";
import validate from "../shared/validate";

const submitShiftForm = async (values, dispatch, props) => {
  return new Promise(async (resolve, reject) => {
    const errors = validate(values);
    if (errors) {
      reject(new SubmissionError(errors));
    } else {
      // INSERT mode
      // For shift employees
      const shiftEmployees = [];
      shiftEmployees.push({ eId: values.cashier, role: "Cashier" }); // push cashier
      values.pumpAttendants.forEach((attendant) => {
        if (attendant != null)
          shiftEmployees.push({ eId: attendant, role: "Pump Attendant" });
      });
      //  For pump prices
      const pumpGroupPrices = [];
      const fields = ["diesel", "jxpremium", "accelrate"];
      fields.forEach((field) => {
        // Group 1
        pumpGroupPrices.push({
          groupNum: 1,
          pName: field,
          price: values.group1[field],
        });
        // Group 2
        pumpGroupPrices.push({
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
        dipstickReadings.push({
          pName: product,
          closingLevel: values[product].closingLevel,
          closingLiters: values[product].closingLiters,
          openingLevel: values[product].openingLevel,
          openingLiters: values[product].openingLiters,
        });
      });

      // Drop form
      const dropForm = {};
      dropForm.drops = values.dropForm.drops;
      dropForm.amtPerDrop = values.dropForm.amtPerDrop;
      dropForm.lastDrop = values.dropForm.lastDrop;
      // Last Drop Breakdwon
      const lastDropBreakDown = { ...values.breakdown };
      // Cash Advance
      let cashAdvances = [];
      if (props.cashadvance.length) {
        values.cashadvance.forEach((cashadvance) =>
          cashAdvances.push({
            eId: cashadvance.employee,
            amount: cashadvance.amt,
          })
        );
      } else cashAdvances = undefined;
      //  Expenses
      let expenses = [];
      if (props.expenses.length) {
        values.expenses.forEach((expense) => {
          if (expense.description != null && expense.catName != null) {
            expenses.push({ expense });
          }
        });
      } else expenses = undefined;
      //   Credit sales
      let creditSales = [];
      if (props.creditsales.length) creditSales = values.creditsales;
      else creditSales = undefined;

      const { filledUpBy } = props;
      const form = {
        date: values.shiftDate,
        placement: values.placement,
        shift: values.shift,
        filledUpBy,
      };
      const creatingNew = props.formData.results.shiftFormNotFound;
      try {
        if (creatingNew) {
          const response = await ShiftFormAPI.post("/", {
            form,
            shiftEmployees,
            pumpGroupPrices,
            pumpInfos,
            dipstickReadings,
            dropForm,
            lastDropBreakDown,
            cashAdvances,
            expenses,
            creditSales,
          });
          // update initial values
          props.reinitializeFormData(values);
          // disable edit mode
          props.toggleShiftFormEditMode();
          // clear shiftFormNotFound and append fId
          props.setShiftFormCreated(response.data.fId);
        } else {
          alert(JSON.stringify(values));
          await ShiftFormAPI.patch(`/${props.formData.results.fId}`, {
            form,
            shiftEmployees,
            pumpGroupPrices,
            pumpInfos,
            dipstickReadings,
            dropForm,
            lastDropBreakDown,
            cashAdvances,
            expenses,
            creditSales,
          });
          // update initial values
          props.reinitializeFormData(values);
          // disable edit mode
          props.toggleShiftFormEditMode();
        }
        resolve();
      } catch (error) {
        reject(
          new SubmissionError({ _error: "Failed to submit shift report" })
        );
      }
    }
  });
};

export default submitShiftForm;
