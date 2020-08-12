import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reduxForm, Field, clearSubmitErrors } from "redux-form";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import renderTextField from "../../shared/renderTextField";
import submitAuthForm from "./submitAuthForm";
import Alert from "@material-ui/lab/Alert";
import { toggleSignInMode, returnErrors } from "../../../actions";
const textFieldProps = {
  variant: "outlined",
  margin: "normal",
  fullWidth: true,
  component: renderTextField,
};
const SignUpForm = () => {
  const textFieldProps1 = { ...textFieldProps, size: "small", margin: "dense" };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Field {...textFieldProps1} label="First Name" name="fName" autoFocus />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Field {...textFieldProps1} label="Initial" name="mInit" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Field {...textFieldProps1} label="Last Name" name="lName" />
      </Grid>
      <Grid item xs={12}>
        <Field {...textFieldProps1} label="Nickname" name="nickName" />
      </Grid>
      <Grid item xs={12}>
        <Field {...textFieldProps1} label="Username" name="uName" />
      </Grid>
      <Grid item xs={12}>
        <Field {...textFieldProps1} label="Password" name="password" />
      </Grid>
    </Grid>
  );
};

const SignInForm = ({ error, submitting, clearSubmitErrors }) => {
  return (
    <>
      <Field
        {...textFieldProps}
        label="Username"
        name="uName"
        autoComplete="username"
        autoFocus
      />
      <Field
        {...textFieldProps}
        type="password"
        id="password"
        label="Password"
        name="password"
        autoComplete="current-password"
      />

      {submitting ? (
        <></>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <></>
      )}
    </>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Auth({
  handleSubmit,
  signInMode,
  toggleSignInMode,
  pristine,
  submitting,
  error,
  isAuthenticated,
}) {
  const classes = useStyles();
  const history = useHistory();
  if (isAuthenticated) return <Redirect to={{ pathname: "/app/dashboard" }} />;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signInMode ? "Sign In" : "Sign Up"}
          </Typography>
          <>
            <form className={classes.form} onSubmit={handleSubmit}>
              {signInMode ? (
                <>
                  <SignInForm error={error} submitting={submitting} />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </>
              ) : (
                <SignUpForm />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={pristine || submitting}
              >
                {signInMode ? "Sign In" : "Sign Up"}
              </Button>
            </form>
            <Grid container>
              <Grid item xs>
                {signInMode ? (
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item>
                <Link
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    toggleSignInMode(false);
                  }}
                  variant="body2"
                >
                  {signInMode
                    ? "Don't have an account? Sign Up"
                    : "Switch to Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  signInMode: state.authForm.signInMode,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { toggleSignInMode, returnErrors })(
  reduxForm({
    form: "authForm",
    onSubmit: submitAuthForm,
    onChange: (values, dispatch, props) => {
      if (props.error) dispatch(clearSubmitErrors("authForm"));
    },
  })(Auth)
);
