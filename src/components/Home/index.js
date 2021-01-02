import {
  Grid,
  Paper,
  makeStyles,
  Button,
  Divider,
  Typography,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { BaseModal } from "components/common/BaseModal";
import { ALIGNMENT } from "components/common/BaseModal/DialogActions";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#EEEEEE",
    borderRadius: 30,
    position: "relative",
  },
  topContainer: {
    minHeight: 150,
  },
  paperRoot: {
    borderRadius: 30,
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  banner: {
    width: "auto",
    height: 300,
    position: "absolute",
    top: -100,
  },
  buttonContainer: {
    paddingTop: theme.spacing(2),
  },
  icon: {
    width: 25,
    marginRight: theme.spacing(0.75),
  },
  startButton: {
    background: "#FF7243",
    boxShadow: "10px 10px 50px #FF724373",
    borderRadius: 20,
    letterSpacing: 1.5,
    padding: theme.spacing(2, 3),
    "& .MuiButton-startIcon": {
      margin: 0,
    },
    "& .MuiSvgIcon-root": {
      color: "#FFF",
    },
    "& .MuiButton-label": {
      display: "flex",
      flexDirection: "column",
      flexWrap: "no-wrap",
    },
  },
  startButtonContainer: {
    margin: "auto",
  },
  footer: {
    padding: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [showNoOpModal, setShowNoOpModal] = useState(false);
  return (
    <>
      <Grid className={classes.root}>
        <Paper
          className={classes.paperRoot}
          component={Grid}
          container
          direction="column"
          wrap="nowrap"
          item
          xs={12}
        >
          <Grid className={classes.topContainer} container wrap="nowrap">
            <Grid item xs={6} container align="center" justify="center">
              <Box className={classes.startButtonContainer}>
                <Grid className={classes.startButton}>
                  <PlayCircleOutlineIcon fontSize="medium" />
                  <Typography>PLAY</Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <img className={classes.banner} src="./4inarow.png" />
            </Grid>
          </Grid>
          <Divider />
          <Grid container className={classes.buttonContainer} spacing={2}>
            <Grid xs={6} item>
              <Button
                onClick={() => setShowNoOpModal(true)}
                startIcon={<img className={classes.icon} src="./one.png" />}
                color="primary"
                fullWidth
                variant="contained"
              >
                Custom Game
              </Button>
            </Grid>
            <Grid xs={6} item>
              <Button
                onClick={() => setShowNoOpModal(true)}
                startIcon={<img className={classes.icon} src="./online.png" />}
                color="primary"
                fullWidth
                variant="contained"
              >
                Game Online
              </Button>
            </Grid>
            <Grid xs={6} item>
              <Link to="/lobby">
                <Button
                  startIcon={<img className={classes.icon} src="./two.png" />}
                  color="primary"
                  fullWidth
                  variant="contained"
                >
                  Two Players
                </Button>
              </Link>
            </Grid>
            <Grid xs={6} item>
              <Button
                onClick={() => setShowNoOpModal(true)}
                startIcon={
                  <img className={classes.icon} src="./training.png" />
                }
                color="primary"
                fullWidth
                variant="contained"
              >
                Training Game
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Box className={classes.footer}>
          <Typography component={Grid} item variant="caption">
            2020
          </Typography>
        </Box>
      </Grid>
      <BaseModal
        isModalOpen={showNoOpModal}
        fullWidth={false}
        maxWidth="sm"
        successText="Close"
        alignment={ALIGNMENT.CENTER}
        hideCancelButton
        modalActions={{
          onSuccessAction: () => setShowNoOpModal(false),
        }}
        title="Coming Soon!"
      />
    </>
  );
}
