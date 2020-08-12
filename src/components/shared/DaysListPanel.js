import React, { useEffect } from "react";
import {
  CardHeader,
  Grid,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import DaysList from "../pages/AddShiftReport/DaysList";
import FormCard from "../pages/AddShiftReport/ShiftReport/FormCard";
import { fetchMonthForms } from "../../actions";
import { connect } from "react-redux";
import SelectedDayPanel from "./SelectedDayPanel";
import Skeleton from "@material-ui/lab/Skeleton";
const dateFormat = require("dateformat");
const DaysListPanel = ({ year, month, fetchMonthForms, monthForms }) => {
  useEffect(() => {
    fetchMonthForms(year, month);
  }, [year, month]);

  if (monthForms.error) return <>An error occured</>;
  // else if (monthForms.loading || !monthForms.results) return <Skeleton />;
  // else {
  const d = new Date(year, parseInt(month) - 1);
  let title = dateFormat(d, "mmmm, yyyy");
  return (
    <Grid container justify="center" spacing={2} alignItems="center">
      <Grid>
        <FormCard title={title}>
          {monthForms.loading || !monthForms.results ? (
            <Skeleton height={100} width={204} />
          ) : (
            <DaysList monthForms={monthForms} />
          )}
        </FormCard>
      </Grid>
    </Grid>
  );
  // }
};
const mapStateToProps = (state) => ({
  monthForms: state.monthForms,
});
export default connect(mapStateToProps, { fetchMonthForms })(DaysListPanel);
