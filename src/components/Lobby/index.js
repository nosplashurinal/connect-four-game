import React, { useState, useContext } from "react";
import {
  Grid,
  Paper,
  Button,
  makeStyles,
  Divider,
  TextField,
  Snackbar,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import PlayerItem from "./PlayerItem";
import { BaseModal } from "components/common/BaseModal";
import SelectItem from "./SelectItem";
import MuiAlert from "@material-ui/lab/Alert";
import { ALIGNMENT } from "components/common/BaseModal/DialogActions";
import { PlayersContext } from "components/App";

function Alert(props) {
  return <MuiAlert elevation={1} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    borderRadius: 30,
    padding: theme.spacing(2),
  },
  listRoot: {
    width: "100%",
    "& > *:not(:first-child)": {
      marginTop: theme.spacing(2),
    },
  },
  listItemRoot: {
    flex: "0 1 100%",
    background: "#EFF3FF",
    border: `1px solid #70707026`,
    borderRadius: 15,
  },
  avatar: {
    border: `5px solid #B1C4F9`,
  },
  image: {
    width: "auto",
    height: "20px",
  },
}));

const gamesOptions = [
  {
    value: 1,
    label: "2 Games",
  },
  {
    value: 2,
    label: "3 Games",
  },
  {
    value: 3,
    label: "5 Games",
  },
  {
    value: 4,
    label: "10 Games",
  },
];

const gameTypesOptions = [
  {
    value: 1,
    label: "Alternate Turn",
  },
  {
    value: 2,
    label: "Looser First",
  },
  {
    value: 3,
    label: "Winner First",
  },
  {
    value: 4,
    label: "Always Player 01",
  },
  {
    value: 5,
    label: "Always Player 02",
  },
];

export default function Lobby() {
  const classes = useStyles();
  const { players, setPlayers, tournament, setTournament } = useContext(
    PlayersContext
  );
  const [showGamesModal, setShowGamesModal] = useState(false);
  const [showStartsModal, setShowStartsModal] = useState(false);
  const onSetPlayerName = (id, value) => {
    const newState = {
      ...players,
      [id]: {
        ...players[id],
        name: value,
      },
    };
    setPlayers(newState);
  };
  const isStartDisabled = () => {
    if (
      !tournament.games ||
      !tournament.startWith ||
      Object.keys(players).find((id) => !players[id].name)
    )
      return true;
    return false;
  };
  return (
    <>
      <Paper
        component={Grid}
        className={classes.root}
        container
        justify="center"
        alignItems="center"
        direction="column"
        wrap="nowrap"
        item
        xs={12}
      >
        {isStartDisabled() && (
          <Alert severity="info">Enter player names to start playing!</Alert>
        )}
        <List
          component={Grid}
          item
          xs={12}
          container
          className={classes.listRoot}
        >
          {Object.keys(players).map((playerId) => (
            <Grid item xs={12}>
              <PlayerItem
                onChange={onSetPlayerName}
                players={players}
                playerId={playerId}
              />
            </Grid>
          ))}
        </List>
        <List className={classes.listRoot}>
          <ListItem className={classes.listItemRoot}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <img className={classes.image} src={"./winner.png"} />
              </Avatar>
            </ListItemAvatar>
            <form noValidate autoComplete="off">
              <TextField
                value={
                  gamesOptions.find((item) => item.value === tournament.games)
                    .label
                }
                onClick={() => setShowGamesModal(true)}
                label={`Number of Games`}
              />
            </form>
          </ListItem>
          <ListItem className={classes.listItemRoot}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <img className={classes.image} src={"./run.png"} />
              </Avatar>
            </ListItemAvatar>
            <form noValidate autoComplete="off">
              <TextField
                value={
                  gameTypesOptions.find(
                    (item) => item.value === tournament.gameType
                  ).label
                }
                onClick={() => setShowStartsModal(true)}
                label={`Who Starts`}
              />
            </form>
          </ListItem>
        </List>
        <Divider />
        <Button
          component={Link}
          to="/game"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isStartDisabled()}
        >
          Start Game
        </Button>
      </Paper>
      <BaseModal
        fullWidth={false}
        maxWidth="sm"
        successText="Cancel"
        title="Number of Games"
        hideCancelButton
        isModalOpen={showGamesModal}
        renderBody={() => (
          <SelectItem
            initialValue={tournament.games}
            onChange={(value) => {
              setTournament({
                ...tournament,
                games: gamesOptions.find((item) => item.value === value).value,
              });
              setShowGamesModal(false);
            }}
            options={gamesOptions}
          />
        )}
        alignment={ALIGNMENT.CENTER}
        modalActions={{
          onSuccessAction: (value) => setShowGamesModal(false),
        }}
      />
      <BaseModal
        maxWidth="md"
        successText="Cancel"
        title="Who Starts"
        isModalOpen={showStartsModal}
        alignment={ALIGNMENT.CENTER}
        initialValue={tournament.gameType}
        renderBody={() => (
          <SelectItem
            onChange={(value) => {
              setTournament({
                ...tournament,
                gameType: value,
              });
              setShowStartsModal(false);
            }}
            options={gameTypesOptions}
          />
        )}
        hideCancelButton
        modalActions={{
          onSuccessAction: () => setShowStartsModal(false),
        }}
      />
    </>
  );
}
