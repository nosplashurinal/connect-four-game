import React, { useContext, useEffect, useState, createContext } from "react";
import { Grid, Paper, makeStyles, Button } from "@material-ui/core";
import Board from "./Board";
import Menu from "./Menu";
import { PlayersContext } from "components/App";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#F5F5F5",
    borderRadius: 30,
    border: `1px solid #f7f7f7`,
  },
}));

export const BoardContext = createContext();

export const getInitialBoard = () =>
  //  Creates and returns multi-dimensional 8x8 array filled with null values
  new Array(8).fill(null).map(() => new Array(8).fill(null));

export default function Game() {
  const classes = useStyles();
  const { players, tournament, setTournament } = useContext(PlayersContext);
  const [activePlayer, setActivePlayer] = useState(tournament.startWith);
  const [whoStarts, setWhoStarts] = useState(tournament.startWith);
  const [winner, setWinner] = useState(null);
  const [latestStep, setLatestStep] = useState();
  const [gameNumber, setGameNumber] = useState(1);
  const [board, setBoard] = useState(getInitialBoard());
  useEffect(() => {
    setTournament({
      ...tournament,
      score: {
        ...tournament.score,
        [winner]: tournament.score[winner] + 1,
      },
    });
  }, [winner]);
  const getPlayer = () => {
    const playersArray = Object.keys(players).map((item) => parseInt(item));
    let whoStarts;
    switch (tournament.gameType) {
      case 1:
        // Alternate Turn
        whoStarts =
          playersArray[
            (playersArray.indexOf(whoStarts) + 1) % playersArray.length
          ];
        break;
      case 2:
        //  Looser First
        whoStarts =
          playersArray[
            (playersArray.indexOf(winner) + 1) % playersArray.length
          ];

        break;
      case 3:
        // Winner First
        whoStarts = winner;
        break;
      case 4:
        //  Always Player 01
        whoStarts = parseInt(Object.keys(players)[0]);
        break;
      case 4:
        //  Always Player 02
        whoStarts = parseInt(Object.keys(players)[1]);
        break;
    }
    setWhoStarts(whoStarts);
    setActivePlayer(whoStarts);
  };
  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      <Grid container justify="center" alignItems="center">
        <Paper
          component={Grid}
          item
          container
          xs={12}
          md={8}
          elevation={10}
          className={classes.root}
        >
          <Board
            gameNumber={gameNumber}
            activePlayer={activePlayer}
            setActivePlayer={setActivePlayer}
            setLatestStep={setLatestStep}
            players={players}
            winner={winner}
            setWinner={setWinner}
          ></Board>
          <Menu
            latestStep={latestStep}
            winner={winner}
            setWinner={setWinner}
            activePlayer={activePlayer}
            gameNumber={gameNumber}
            setGameNumber={setGameNumber}
            players={players}
            getPlayer={getPlayer}
          ></Menu>
        </Paper>
      </Grid>
    </BoardContext.Provider>
  );
}
