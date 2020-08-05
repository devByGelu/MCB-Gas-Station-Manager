import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import nextId from "react-id-generator";
import Skeleton from "@material-ui/lab/Skeleton";
import MailIcon from "@material-ui/icons/Mail";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { fetchMonthForms, changeSelectedDate } from "../../../actions";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Stepper,
  Step,
  StepButton,
  Button,
  StepContent,
  ListSubheader,
  Badge,
} from "@material-ui/core";
import DaysListItemMenu from "./DaysListItemMenu";
const dateFormat = require("dateformat");

function numberOfDays(month, year) {
  return new Date(year, month, 0).getDate();
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 430,
  },
  liTextRoot: {
    paddingLeft: 0,
    paddingRight: 10,
  },
}));
const DaysList = ({ changeSelectedDate, monthForms }) => {
  // Store in reverse days of the month
  const getDays = () => {
    const { month, year } = monthForms;
    let lastDayOfMonth = numberOfDays(month, year);
    let days = [];
    for (let index = 0; index < lastDayOfMonth; index++)
      days.unshift(index + 1);
    return days;
  };
  // Filter results with same date
  const countShiftReports = (checkedDay) => {
    let count = 0;
    monthForms.results.forEach((shiftForm) => {
      const date = new Date(shiftForm.date);
      if (checkedDay == dateFormat(date, "d")) count += 1;
    });
    return count;
  };
  // Get number of days in a month
  let days = getDays();
  const classes = useStyles();
  const getDay = (date) => dateFormat(date, "dddd");
  return (
    <List className={classes.root}>
      {days.map((day, index) => {
        // Get date under list item
        const selectedDate = new Date(
          monthForms.year,
          parseInt(monthForms.month) - 1,
          day
        );
        // Get all shift reports under a specific date
        const getShiftReports = (selectedDate) => {
          return monthForms.results.filter(
            (form) =>
              dateFormat(form.date, "isoDate") ==
              dateFormat(selectedDate, "isoDate")
          );
        };

        return (
          <DaysListItemMenu
            day={day}
            shiftReports={getShiftReports(selectedDate)}
            key={index}
          >
            <ListItem
              key={index}
              button
              onClick={() => {
                changeSelectedDate(selectedDate);
              }}
            >
              <ListItemIcon>
                <Badge badgeContent={countShiftReports(day)} color="primary">
                  <AssignmentIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText
                classes={{ root: classes.liTextRoot }}
                inset
                primary={`${day}`}
                secondary={getDay(selectedDate)}
              />
            </ListItem>
          </DaysListItemMenu>
        );
      })}
    </List>
  );
};
const mapStateToProps = (state) => {
  return {
    monthForms: state.monthForms,
  };
};
export default connect(mapStateToProps, { changeSelectedDate })(DaysList);
