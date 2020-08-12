import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import GetAppIcon from "@material-ui/icons/GetApp";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, List, Collapse } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const dateFormat = require("dateformat");
const d = new Date();
const month = dateFormat(d, "m");
const year = dateFormat(d, "yyyy");
const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const MainListItems = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(true);

  const triggerCollapse = () => {
    setOpen(!open);
  };

  function handleClick(event) {
    event.preventDefault();
    const { id } = event.currentTarget;
    const url =
      id === "dashboard"
        ? "/app/dashboard"
        : id === "dsr-add"
        ? `/app/shift-reports/view/${year}/${month}`
        : "/app/shift-reports/download/select/option/monthly";
    history.push(url);
  }
  const classes = useStyles();
  const itemProps = { button: true, onClick: handleClick };
  const nestedItem = { ...itemProps, className: classes.nested };
  return (
    <div>
      <ListItem id="dashboard" {...itemProps}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem id="dsr" button onClick={triggerCollapse}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="DSR" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem id="dsr-add" {...nestedItem}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
          <ListItem id="dsr-download" {...nestedItem}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
