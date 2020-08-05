import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

export default function SubmitShiftFormButton({ children, ...other }) {
  return (
    <Fab {...other} color="primary" aria-label="add">
      {children}
    </Fab>
  );
}
