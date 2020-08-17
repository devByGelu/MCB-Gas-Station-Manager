import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import TodayReminder from "../../shared/TodayReminder/TodayReminder";
import PreviousReminder from "../../shared/PreviousReminder/PreviousReminder";
import DaysList from "./DaysList";
import DaysListPanel from "../../shared/DaysListPanel";
import { useParams } from "react-router-dom";
const AddShiftReport = () => {
  let { year,month } = useParams();
  return <DaysListPanel year={year} month={month} />;
};

export default connect(null, null)(AddShiftReport);
