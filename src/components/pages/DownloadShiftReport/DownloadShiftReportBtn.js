import React from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";

function DownloadShiftReportBtn(props) {
  const btnProps = {
    variant: "contained",
    size: "normal",
    color: "primary",
    fullWidth: true,
  };
  return (
    <Button
      type="submit"
      {...btnProps}
      variant="outlined"
      startIcon={<GetAppIcon />}
    >
      Download
    </Button>
  );
}

export default DownloadShiftReportBtn;
