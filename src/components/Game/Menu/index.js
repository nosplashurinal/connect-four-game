import React, { useContext } from "react";
import { Grid, Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayerCard from "./PlayerCard";
import List from "@material-ui/core/List";
import { PlayersContext } from "components/App";
import { Link } from "react-router-dom";
import { BoardContext } from "../index";
import { getInitialBoard } from "components/Game";

const useStyles = makeStyles((theme) => ({
  footer: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  listRoot: {
    "& > *": {
      marginBottom: theme.spacing(1),
    },
  },
  warning: {
    color: theme.palette.error.main,
  },
  root: {
    padding: theme.spacing(2),
  },
}));

export default function Menu({
  winner,
  setWinner,
  gameNumber,
  setGameNumber,
  latestStep,
  activePlayer,
  getPlayer,
}) {
  const classes = useStyles();
  const { board, setBoard } = useContext(BoardContext);
  const { players, tournament, setTournament } = useContext(PlayersContext);
  const handleUndo = () => {
    const newBoard = board.map((column, index) => {
      if (index === latestStep) {
        let lastIndexWithValue = null;
        let index = 0;
        while (index < column.length) {
          if (column[index] === null) {
            lastIndexWithValue = index - 1;
            break;
          } else {
            index++;
          }
        }
        if (lastIndexWithValue === null) lastIndexWithValue = column.length - 1;
        const newColumn = column.map((item, index) =>
          index === lastIndexWithValue ? null : item
        );
        return newColumn;
      } else return column;
    });
    setBoard(newBoard);
  };
  const onClickNextGame = () => {
    setGameNumber(gameNumber + 1);
    getPlayer();
    setWinner(null);
    setBoard(getInitialBoard);
  };
  const onClickPlayAgain = () => {
    setGameNumber(1);
    setWinner(null);
    setBoard(getInitialBoard);
    setTournament({
      ...tournament,
      score: {
        1: 0,
        2: 0,
      },
    });
  };
  return (
    <Grid
      className={classes.root}
      container
      item
      md={4}
      align="center"
      direction="column"
      wrap="nowrap"
    >
      <Typography
        component={Grid}
        xs={12}
        align="center"
        item
        noWrap
        variant="h6"
      >
        {`${tournament.games} Games Tournament`}
      </Typography>
      {winner ? (
        <>
          <Typography
            component={Grid}
            xs={12}
            align="center"
            item
            noWrap
            variant="h5"
          >
            Congratulations!
          </Typography>
          <Typography
            item
            align="center"
            component={Grid}
            noWrap
            xs={12}
            variant="body1"
          >{`${players[winner].name}, you've won ${
            gameNumber === tournament.games
              ? `the tournament!`
              : `Game ${gameNumber}`
          }`}</Typography>
        </>
      ) : (
        <Typography
          component={Grid}
          xs={12}
          align="center"
          item
          noWrap
          variant="body1"
        >
          {`Playing Game ${gameNumber}`}
        </Typography>
      )}
      <List className={classes.listRoot}>
        {Object.keys(players).map((playerId, index) => (
          <PlayerCard
            winner={winner}
            activePlayer={activePlayer}
            playerId={playerId}
            index={index}
          />
        ))}
      </List>
      <Divider />
      <Grid
        className={classes.footer}
        container
        direction="column"
        wrap="nowrap"
      >
        {!winner && (
          <Button onClick={handleUndo} color="primary" variant="contained">
            Undo Step
          </Button>
        )}
        {winner &&
          (gameNumber < tournament.games ? (
            <Button
              color="primary"
              variant="contained"
              onClick={onClickNextGame}
            >
              Next Game
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={onClickPlayAgain}
            >
              Play Again
            </Button>
          ))}
        <Button
          color="secondary"
          className={classes.warning}
          component={Link}
          to="/lobby"
          variant="contained"
        >
          End Tournament
        </Button>
      </Grid>
    </Grid>
  );
}
