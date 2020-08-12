import React from "react";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Icon, Badge, makeStyles } from "@material-ui/core";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
const dateFormat = require("dateformat");
const useStyles = makeStyles({
  badge: {
    top: 16,
    right: 43,
  },
});
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
// Get suffix of a number
function nth(n) {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

export default function DaysListItemMenu({
  children,
  shiftReports,
  nextAmPlacement,
  nextPmPlacement,
  day,
}) {
  const history = useHistory();

  let { path, url } = useRouteMatch();

  const params = useParams();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNextAmPlacement = () => {
    if (shiftReports) {
      const amReports = shiftReports.filter((report) => report.shift == "AM");
      return amReports.length
        ? parseInt(amReports[amReports.length - 1].placement) + 1
        : 1;
    }
    return 1;
  };
  const getNextPmPlacement = () => {
    if (shiftReports) {
      const pmReports = shiftReports.filter((report) => report.shift == "PM");
      return pmReports.length
        ? parseInt(pmReports[pmReports.length - 1].placement) + 1
        : getNextAmPlacement();
    }
    return 1;
  };
  const shifts = ["AM", "PM"];
  // Count number of shift reports that has shift = AM
  return (
    <div>
      <div
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {children}
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {shiftReports &&
          shiftReports.map((report, index) => {
            const d = new Date(report.date);
            const shift = report.shift;
            const placement = report.placement;
            const year = dateFormat(d, "yyyy");
            const month = dateFormat(d, "m");
            const day = dateFormat(d, "d");
            return (
              <StyledMenuItem
                key={index}
                onDoubleClick={() =>
                  history.push(
                    `/app/shift-reports/open/${params.year}/${params.month}/${day}/${shift}/${placement}`
                  )
                }
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon fontSize="small" />
                </ListItemIcon>
                <Badge
                  badgeContent={report.placement + "" + nth(report.placement)}
                  classes={{
                    badge: classes.badge,
                  }}
                  color="secondary"
                >
                  <ListItemText primary={report.shift} />
                </Badge>
              </StyledMenuItem>
            );
          })}
        {shiftReports && (
          <DaysListItemMenu
            nextAmPlacement={getNextAmPlacement()}
            nextPmPlacement={getNextPmPlacement()}
            day={day}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <AddCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Add DSR" />
            </StyledMenuItem>
          </DaysListItemMenu>
        )}
        {!shiftReports &&
          shifts.map((shift, index) => {
            return (
              <StyledMenuItem
                key={index}
                onDoubleClick={
                  shift == "AM"
                    ? () =>
                        history.push(
                          `/app/shift-reports/open/${params.year}/${params.month}/${day}/${shift}/${nextAmPlacement}`
                        )
                    : () =>
                        history.push(
                          `/app/shift-reports/open/${params.year}/${params.month}/${day}/${shift}/${nextPmPlacement}`
                        )
                }
              >
                <ListItemIcon>
                  <AddCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${shift} next is ${
                    shift == "AM" ? nextAmPlacement : nextPmPlacement
                  } 
                  `}
                />
              </StyledMenuItem>
            );
          })}
      </StyledMenu>
    </div>
  );
}
