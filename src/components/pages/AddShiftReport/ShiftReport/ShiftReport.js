import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import {
  Grid,
  MenuItem,
  CircularProgress,
  ThemeProvider,
  Box,
  Button,
} from "@material-ui/core";
import nextId from "react-id-generator";
import FormCard from "./FormCard";
import { Fields, Field, reduxForm } from "redux-form";
import renderTextField from "../../../shared/renderTextField";
import renderSelectField from "../../../shared/renderSelectField";
import BasicInformationPanel from "./BasicInformationPanel";
import { fetchEmployees, fetchFormData } from "../../../../actions";
import DenseTable from "./DenseTable";
import PumpInfo from "./PumpInfo";
import Dipstick from "./Dipstick";
import Drop from "./Drop";
import Breakdown from "./Breakdown";
import formTheme from "../../../../formTheme";
import Withdrawals from "./Withdrawals";
import CashAdvance from "./CashAdvance";
import CreditSales from "./CreditSales";
import ProductPrices from "./ProductPrices";
import submitShiftForm from "../../../shared/submitShiftForm";

const Report = (props) => {
  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    fetchFormData,
    formData,
  } = props;
  useEffect(() => {
    fetchFormData();
  }, []);
  const pumps = [1, 2, 3, 4];
  if (formData.error) return <>An error occured</>;
  else if (formData.loading || !formData.results)
    return (
      <Grid container alignItems="center" justify="center">
        <CircularProgress style={{ marginTop: 400 }} />
      </Grid>
    );
  else if (formData.results) {
    const {
      employees,
      customers,
      expenseCategories,
      products,
    } = formData.results;
    return (
      <>
        <Grid container spacing={3} justify="center" alignItems="flex-start">
          <form onSubmit={handleSubmit(submitShiftForm)}>
            {/* Basic Info */}
            <ThemeProvider theme={formTheme}>
              <Grid container spacing={2} item md={12} direction="row">
                <Grid item md={6}>
                  <BasicInformationPanel employees={employees} />
                </Grid>
                <Grid item md={6}>
                  <ProductPrices />
                </Grid>
              </Grid>
              {/* Pump Summaries */}
              {pumps.map((num, index) => (
                <Grid item key={index} md={12} style={{ marginBottom: 6 }}>
                  <PumpInfo key={index} number={num} />
                </Grid>
              ))}
              {/* Dipstick */}
              <Grid item md={12} style={{ marginBottom: 6 }}>
                <Grid item container spacing={2}>
                  <Grid item md={5}>
                    <Dipstick />
                  </Grid>
                  <Grid item md={3}>
                    <Drop />
                  </Grid>
                  <Grid item md={2}>
                    <Breakdown />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4} style={{ marginBottom: 6 }}>
                <CashAdvance employees={employees} />
              </Grid>
              <Grid  item md={10} style={{ marginBottom: 6 }}>
                <Withdrawals expenseCategories={expenseCategories} />
              </Grid>
              <Grid item md={12} style={{ marginBottom: 6 }}>
                <CreditSales products={products} customers={customers}/>
              </Grid>
            </ThemeProvider>
            <Button type='submit'>Submit!</Button>
          </form>
        </Grid>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  formData: state.formData,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, { fetchFormData })(
  reduxForm({
    form: "shiftForm",
  })(Report)
);
