import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
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
import {
  Fields,
  Field,
  reduxForm,
  formValueSelector,
  isDirty,
} from "redux-form";
import renderTextField from "../../../shared/renderTextField";

import renderSelectField from "../../../shared/renderSelectField";
import BasicInformationPanel from "./BasicInformationPanel";
import {
  resetFormData,
  fetchEmployees,
  fetchFormData,
  toggleShiftFormEditMode,
  reinitializeFormData,
  setShiftFormCreated,
} from "../../../../actions";
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
import ShiftFormAPI from "../../../../apis/ShiftFormAPI";
import { useLocation, useParams } from "react-router-dom";
import SubmitShiftFormButton from "./SubmitShiftFormButton";
const ShiftReport = (props) => {
  const useStyles = makeStyles((theme) => ({
    editBtn: {
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(10),
    },
    resetBtn: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(10),
    },
  }));
  const classes = useStyles();
  const {
    filledUpBy,
    error,
    handleSubmit,
    reset,
    pristine,
    submitting,
    fetchFormData,
    formData,
    resetFormData,
    toggleShiftFormEditMode,
    dirty,
    reinitializeFormData,
    setShiftFormCreated,
  } = props;
  let { year, month, day, shift, placement } = useParams();
  const isCreating = () => formData.results.shiftFormNotFound;
  useEffect(() => {
    fetchFormData(year, month, day, shift, placement);
    return () => {
      resetFormData();
    };
  }, [year, month, day, shift, placement]);
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
    const submitButtonProps = formData.editing
      ? { type: "submit", disabled: !dirty || submitting }
      : { type: "button", onClick: () => toggleShiftFormEditMode() };
    const isFieldDisabled = formData.editing === false || submitting;
    return (
      <>
        <Grid container spacing={3} justify="center" alignItems="flex-start">
          <form onSubmit={handleSubmit(submitShiftForm)}>
            {/* Basic Info */}
            <ThemeProvider theme={formTheme}>
              <Grid
                style={{ marginBottom: 1 }}
                container
                spacing={2}
                item
                md={12}
                direction="row"
              >
                <Grid item md={6}>
                  <BasicInformationPanel
                    employees={employees}
                    isFieldDisabled={isFieldDisabled}
                  />
                </Grid>
                <Grid item md={6}>
                  <ProductPrices isFieldDisabled={isFieldDisabled} />
                </Grid>
                {/* Pump Summaries */}
                {pumps.map((num, index) => (
                  <Grid item key={index} md={6} style={{ marginBottom: 6 }}>
                    <PumpInfo
                      key={index}
                      number={num}
                      isFieldDisabled={isFieldDisabled}
                    />
                  </Grid>
                ))}
                {/* Dipstick */}
                <Grid item md={12} style={{ marginBottom: 6 }}>
                  <Grid item container spacing={2}>
                    <Grid item md={5}>
                      <Dipstick isFieldDisabled={isFieldDisabled} />
                    </Grid>
                    <Grid item md={3}>
                      <Drop isFieldDisabled={isFieldDisabled} />
                    </Grid>
                    <Grid item md={3}>
                      <Breakdown isFieldDisabled={isFieldDisabled} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={5} style={{ marginBottom: 6 }}>
                  <CashAdvance
                    employees={employees}
                    isFieldDisabled={isFieldDisabled}
                  />
                </Grid>
                <Grid item md={8} style={{ marginBottom: 6 }}>
                  <Withdrawals
                    expenseCategories={expenseCategories}
                    isFieldDisabled={isFieldDisabled}
                  />
                </Grid>
                <Grid item md={10} style={{ marginBottom: 6 }}>
                  <CreditSales
                    products={products}
                    customers={customers}
                    isFieldDisabled={isFieldDisabled}
                  />
                </Grid>
              </Grid>
            </ThemeProvider>
            <SubmitShiftFormButton
              type="reset"
              disabled={!formData.editing || submitting}
              onClick={() => {
                reset();
                toggleShiftFormEditMode();
              }}
              className={classes.resetBtn}
            >
              <SettingsBackupRestoreIcon />
            </SubmitShiftFormButton>
            <SubmitShiftFormButton
              className={classes.editBtn}
              {...submitButtonProps}
            >
              {formData.editing ? <SaveIcon /> : <EditIcon />}
            </SubmitShiftFormButton>
          </form>
        </Grid>
      </>
    );
  }
};
const selector = formValueSelector("shiftForm"); // <-- same as form name
const mapStateToProps = (state) => {
  return {
    formData: state.formData,
    initialValues: state.formData.results,
  };
};

export default connect(mapStateToProps, {
  fetchFormData,
  resetFormData,
  toggleShiftFormEditMode,
  reinitializeFormData,
  setShiftFormCreated,
})(
  reduxForm({
    form: "shiftForm",
    enableReinitialize: true,
  })(ShiftReport)
);
