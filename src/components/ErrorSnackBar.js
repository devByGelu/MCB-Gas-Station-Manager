import React from "react"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { switchErrorSnackBar } from "../actions"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

function ErrorSnackBar({ message, switchErrorSnackBar, errorSnackBar }) {
  const classes = useStyles()

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    switchErrorSnackBar(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={errorSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
export default connect(
  (state) => ({
    message: state.errors.msg,
    errorSnackBar: state.errorSnackBar,
  }),
  {
    switchErrorSnackBar,
  }
)(ErrorSnackBar)
