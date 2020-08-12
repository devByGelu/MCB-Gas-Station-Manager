import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  return props.auth.isAuthenticated ? (
    <props.component path={props.path} />
  ) : (
    <Redirect to={{ pathname: "/auth" }} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
