import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export const DialogTitle = ({ children }) => {
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography align="center" className={classes.typography}>{children}</Typography>
    </MuiDialogTitle>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 0
  },
  typography: {
    fontWeight: "bold",
    fontSize: 16,
  },
}));
