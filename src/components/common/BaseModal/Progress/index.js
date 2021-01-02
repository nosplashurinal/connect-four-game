import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: ({ size = 48 }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -(size / 2),
    marginLeft: -(size / 2),
  }),
}));

function Progress(props) {
  const classes = useStyles({ size: props.size });
  return <CircularProgress className={classes.root} {...props} />;
}

Progress.propTypes = {};

export default Progress;
