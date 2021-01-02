import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { PlayersContext } from "components/App";

const useStyles = makeStyles((theme) => ({
  root: ({ winner, activePlayer, players, playerId }) => ({
    background: lighten(players[playerId].color, 0.7),
    border:
      activePlayer == playerId && !winner ? `2px solid #FFA200` : `1px solid #70707026`,
    borderRadius: 15,
  }),
  avatar: ({ players, playerId }) => ({
    border: `5px solid ${players[playerId].color}`,
  }),
  image: {
    width: "auto",
    height: "100%",
  },
}));

export default function PlayerCard({ winner, activePlayer, playerId, index }) {
  const { players, tournament } = useContext(PlayersContext);
  const classes = useStyles({ winner, activePlayer, players, playerId });
  return (
    <ListItem component={Grid} item className={classes.root}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <img className={classes.image} src={players[playerId].imgSrc} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={players[playerId].name}
        secondary={`Player ${index}`}
      />
      <ListItemText primary={"Score"} secondary={tournament.score[playerId]} />
    </ListItem>
  );
}
