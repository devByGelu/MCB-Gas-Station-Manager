import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const ProtectedRoute = ({ auth, component }) => {
  return auth.isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/auth" }} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
