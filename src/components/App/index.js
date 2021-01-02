import React, { useState, createContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Game from "components/Game";
import Home from "components/Home";
import Lobby from "components/Lobby";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const PlayersContext = createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
    background: theme.palette.background.default,
  },
}));

function App() {
  const classes = useStyles();
  const [players, setPlayers] = useState({
    1: {
      name: "",
      imgSrc: "avatar01.png",
      color: "#37AC5D",
    },
    2: {
      name: "",
      imgSrc: "avatar02.png",
      color: "#F8D146",
    },
  });
  const [tournament, setTournament] = useState({
    games: 3,
    score: {
      1: 0,
      2: 0,
    },
    gameType: 1,
    startWith: parseInt(Object.keys(players)[0]),
  });
  return (
    <Router>
      <PlayersContext.Provider
        value={{ players, setPlayers, tournament, setTournament }}
      >
        <Grid
          container
          xs={12}
          className={classes.root}
          alignItems="center"
          justify="center"
        >
          <Switch>
            <Route path="/lobby">
              <Lobby />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </Grid>
      </PlayersContext.Provider>
    </Router>
  );
}

export default App;
