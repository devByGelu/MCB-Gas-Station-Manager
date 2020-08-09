import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const ProtectedRoute = ({ auth, component }) => {
  const history = useHistory();
  return !auth.isAuthenticated ? history.push("/auth") : component;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
