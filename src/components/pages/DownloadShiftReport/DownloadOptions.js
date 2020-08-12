import React, { useEffect } from "react";
import { Grid, Button, Typography, Box } from "@material-ui/core";
import { useRouteMatch, useHistory, Route, useParams } from "react-router-dom";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { connect } from "react-redux";
import { reduxForm, Field, clearSubmitErrors } from "redux-form";
import { fetchMonthForms } from "../../../actions";
import renderTextField from "../../shared/renderTextField";
import DownloadShiftReportBtn from "./DownloadShiftReportBtn";
import submitDownloadShiftReports from "./submitDownloadShiftReports";
import Alert from "@material-ui/lab/Alert";
const dateFormat = require("dateformat");
const fieldProps = {
  size: "small",
  type: "date",
  margin: "none",
  component: renderTextField,
};
function DownloadOptions({ handleSubmit, submitting, error }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={3}
        flex="nowrap"
        style={{ height: "80vh" }}
      >
        <Grid
          item
          container
          alignItems="center"
          justify="center"
          md={3}
          sm={5}
          xs={8}
          spacing={1}
        >
          <Box width="100%">
            <Alert severity="info">Select Range</Alert>
          </Box>

          <Field
            {...fieldProps}
            name="startDate"
            label="Start"
            margin="normal"
          />
          <Field {...fieldProps} name="endDate" label="End" margin="normal" />
          {submitting ? (
            <></>
          ) : error ? (
            <Box marginBottom={2} width="100%">
              <Alert severity="warning">{error}</Alert>
            </Box>
          ) : (
            <></>
          )}
          <DownloadShiftReportBtn />
        </Grid>
      </Grid>
    </form>
  );
}

export default connect(
  null,
  null
)(
  reduxForm({
    form: "shiftReportDownloadForm",
    initialValues: {
      startDate: dateFormat(new Date(), "yyyy-mm-dd"),
      endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    },
    onSubmit: submitDownloadShiftReports,
    onChange: (values, dispatch, props) => {
      if (props.error) dispatch(clearSubmitErrors("shiftReportDownloadForm"));
    },
  })(DownloadOptions)
);
