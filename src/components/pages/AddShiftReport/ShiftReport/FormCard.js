import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { red, lightBlue } from "@material-ui/core/colors";
import { Typography, ListItem, Button } from "@material-ui/core";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {},
  scroll: {
    overflow: "auto",
    maxHeight: 120,
    overflowX: "hidden",
  },
  cardHeader: {
    background: theme.palette.background.default,
  },
}));

export default function FormCard(props) {
  const { action, title, children, width = 2000 } = props;
  const classes = useStyles();
  return (
    <Card style={{ maxWidth: width }}>
      <CardHeader
        action={action}
        className={classes.cardHeader}
        title={
          <Typography variant="h6" style={{ color: "white" }}>
            {title}
          </Typography>
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
