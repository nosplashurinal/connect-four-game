import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Progress from "components/common/Progress";

const PRIMARY = "primary";
const SECONDARY = "secondary";
const ERROR = "error";

export const palette = {
  PRIMARY,
  SECONDARY,
  ERROR,
};

const START = "flex-start";
const END = "flex-end";
const CENTER = "center";

export const ALIGNMENT = {
  START,
  END,
  CENTER,
};

export const DialogActions = function ({
  onSuccessAction,
  onCancelAction,
  autoFocus = false,
  successText,
  cancelText,
  dialogType = palette.PRIMARY,
  isDisabled,
  isSending = false,
  alignment = ALIGNMENT.END,
  hideCancelButton = false,
}) {
  const classes = useStyles({ dialogType });
  return (
    <MuiDialogActions className={classes.root}>
      <Grid spacing={1} container direction="row" justify={alignment}>
        {hideCancelButton ? null : (
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancelAction}
            >
              {cancelText}
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            disabled={isSending || isDisabled}
            variant="contained"
            onClick={() => onSuccessAction()}
            color="primary"
            className={classes.successButton}
            endIcon={isSending && <Progress size={24} color="primary" />}
          >
            {successText}
          </Button>
        </Grid>
      </Grid>
    </MuiDialogActions>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    "& .MuiButton-root": {
      padding: theme.spacing(1, 2),
      borderRadius: 10
    },
  },
  successButton: ({ dialogType }) => ({
    backgroundColor:
      dialogType === palette.ERROR
        ? theme.palette.error.main
        : theme.palette.primary.main,
    "&:hover": {
      backgroundColor:
        dialogType === palette.ERROR
          ? theme.palette.error.dark
          : theme.palette.primary.dark,
    },
  }),
}));
