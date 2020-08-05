import React, { useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useRouteMatch, useHistory, Route, useParams } from "react-router-dom";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchMonthForms } from "../../../actions";
import renderTextField from "../../shared/renderTextField";
import DownloadShiftReportBtn from "./DownloadShiftReportBtn";
import submitDownloadShiftReports from "./submitDownloadShiftReports";
const fieldProps = {
  size: "small",
  type: "date",
  margin: "none",
  component: renderTextField,
};
function DownloadOptions({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit(submitDownloadShiftReports)}>
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
          spacing={1}
        >
          <Grid item>
            <DateRangeIcon />
          </Grid>
          <Grid item><Typography color='action'>Select a timeframe</Typography></Grid>
          <Grid item xs={12}>
            <Field {...fieldProps} name="startDate" label="Start" />
          </Grid>
          <Grid item xs={12}>
            <Field {...fieldProps} name="endDate" label="End" />
          </Grid>
          <Grid item align="center" xs={12}>
            <DownloadShiftReportBtn />
          </Grid>
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
  })(DownloadOptions)
);
