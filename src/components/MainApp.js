import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ClippedDrawer from "./pages/ShiftForm/ClippedDrawer";
import { Route } from "react-router-dom";
import ShiftReport from "./pages/AddShiftReport/ShiftReport/ShiftReport";
import AddShiftReport from "./pages/AddShiftReport/AddShiftReport";
import DownloadOptions from "./pages/DownloadShiftReport/DownloadOptions";

const MainApp = () => {
  return (
    <ClippedDrawer>
      <Route
        exact
        path="/shift-reports/open/:year/:month/:day/:shift/:placement"
        render={(props) => <ShiftReport {...props} filledUpBy={1} />}
      />
      <Route
        path="/shift-reports/view/:year/:month"
        exact
        component={AddShiftReport}
      />
      <Route path={"/shift-reports/download/select/option"}>
        <DownloadOptions />
      </Route>
    </ClippedDrawer>
  );
};

MainApp.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
