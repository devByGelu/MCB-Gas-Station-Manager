import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { red, lightBlue } from "@material-ui/core/colors";
import { Typography, ListItem } from "@material-ui/core";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {},
  scroll: {
    overflow: "auto",
    maxHeight: 120,
    overflowX: "hidden",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardHeaderTab: {
    background: theme.palette.background.default,
    maxHeight: 40,
  },
  cardHeaderText: {
    fontSize: 15,
    textAlign: "right",
    // paddingRight: 200,
    color: theme.palette.primary.contrastText,
  },
  scrollList: {
    overflow: "autoStyle",
    maxHeight: 300,
  },
}));

export default function FormCard(props) {
  const { title, children, width = 2000 } = props;
  const classes = useStyles();
  return (
    <Card style={{ maxWidth: width }}>
      <CardHeader
        className={classes.cardHeaderTab}
        title={
          <Typography variant="overline" style={{ color: "white" }}>
            {title}
          </Typography>
        }
      />

      <CardContent>{children}</CardContent>
    </Card>
  );
}
