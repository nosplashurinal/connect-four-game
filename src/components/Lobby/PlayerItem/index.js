import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, lighten } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: ({ players, playerId }) => ({
    background: lighten(players[playerId].color, 0.7),
    border: `1px solid #70707026`,
    borderRadius: 15,
    flex: "0 1 100%"
  }),
  avatar: ({ players, playerId }) => ({
    border: `5px solid ${players[playerId].color}`,
  }),
  image: {
    width: "auto",
    height: "100%",
  },
}));

export default function PlayerItem({ players, playerId, onChange }) {
  const classes = useStyles({ players, playerId });
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(playerId, event.target.value);
  };
  return (
    <ListItem className={classes.root}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <img className={classes.image} src={players[playerId].imgSrc} />
        </Avatar>
      </ListItemAvatar>
      <form noValidate autoComplete="off">
        <TextField
          value={value}
          onChange={handleChange}
          label={`Player ${Object.keys(players).indexOf(playerId)}`}
        />
      </form>
    </ListItem>
  );
}
