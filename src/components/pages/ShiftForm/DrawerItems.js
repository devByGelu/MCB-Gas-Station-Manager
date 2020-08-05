import React, { useEffect } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExpandLess from "@material-ui/icons/ExpandLess";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import {
  Divider,
  ListItemText,
  ListItemIcon,
  List,
  ListItem,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const dateFormat = require("dateformat");
const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
function DrawerItems({ expandableDrawerItems, toggleMenuItem }) {
  const classes = useStyles();
  const history = useHistory();
  const d = new Date();
  const handleClick = () => toggleMenuItem(0);
  return (
    <>
      <List>
        <ListItem
          onClick={() => history.push("/dashboard")}
          button
          key={"DashBoard"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Shift Form" />
          {expandableDrawerItems[0] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      <Collapse in={expandableDrawerItems[0]} unmountOnExit timeout="auto">
        <List component="div" disablePadding>
          <ListItem
            className={classes.nested}
            onClick={() =>
              history.push(
                `/shift-reports/view/${dateFormat(d, "yyyy")}/${dateFormat(d, "m")}`
              )
            }
            button
            key={"Add Shift Form"}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Add"} />
          </ListItem>

          <ListItem
            className={classes.nested}
            onClick={() =>
              history.push(`/shift-reports/download/select/option/monthly`)
            }
            button
            key={"Download"}
          >
            <ListItemIcon>
              <GetAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Download"} />
          </ListItem>
        </List>
      </Collapse>
      <Divider />
    </>
  );
}
const mapStateToProps = (state, ownProps) => ({
  expandableDrawerItems: state.expandableDrawerItems,
});
export default connect(mapStateToProps, null)(DrawerItems);
