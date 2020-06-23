import React from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
const SubmitButton = ({ editMode, submitting, dispatch }) => {
  const renderText = editMode ? "Edit" : "Save";
  const renderIcon = editMode ? <EditIcon /> : <SaveIcon />;
  return (
    <Button
      variant='contained'
      color='primary'
      size='large'
      startIcon={renderIcon}
      disabled={submitting}
      type='submit'>
      {renderText}
    </Button>
  );
};

export default connect()(SubmitButton);
