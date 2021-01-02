import React, { useState, useEffect, useContext } from "react";
import { Grid, Paper, makeStyles, Button } from "@material-ui/core";
import { Stage, Layer, Circle, Image, Rect } from "react-konva";
import useImage from "use-image";
import { BoardContext } from "../index";
import { PlayersContext } from "components/App";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: 30,
  },
}));

const options = {
  circleRadius: 20,
  spacing: 9.5,
};

const PlayerAvatar = ({
  players,
  x,
  y,
  id,
  radius,
  width,
  height,
  ...props
}) => {
  const [image] = useImage(players[id].imgSrc);
  const offset = 10;
  return (
    <>
      <Image
        image={image}
        x={x - radius + offset / 2}
        y={y - radius + offset / 2}
        width={width - offset}
        height={height - offset}
        {...props}
      />
      <Circle
        x={x}
        y={y}
        radius={radius}
        stroke={players[id].color}
        strokeWidth={5}
      />
    </>
  );
};

export default function Board({
  players,
  winner,
  setWinner,
  setLatestStep,
  activePlayer,
  setActivePlayer,
}) {
  const classes = useStyles();
  const { circleRadius: r, spacing = 0 } = options;
  const { board, setBoard } = useContext(BoardContext);
  const { tournament } = useContext(PlayersContext);
  const [activeColumn, setActiveColumn] = useState();
  const [connectedTiles, setConnectedTiles] = useState([]);
  useEffect(() => {
    const result = doesConnectExist(activePlayer);
    if (result) {
      setConnectedTiles(result);
      setWinner(activePlayer);
    } else {
      setConnectedTiles([]);
    }
  }, [board]);

  const play = (playerId, columnIndex) => {
    const nextAvailablePositionInColumn = (columnIndex) => {
      for (let i = 0; i < 8; i++) {
        // Check index = columnIndex of each row to find the first available position
        if (board[columnIndex][i] === null) return i;
      }
      // If no position is available...
      return -1;
    };
    const newPositionIndex = nextAvailablePositionInColumn(columnIndex);
    if (newPositionIndex === -1) return false;
    else {
      // Create a copy of the old board
      const newBoard = [...board.map((rowItem) => [...rowItem])];
      // Add the latest play to the board
      newBoard[columnIndex][newPositionIndex] = playerId;
      setBoard(newBoard);
    }
    setLatestStep(columnIndex);
  };
  const doesConnectExist = (playerId, connectLimit = 4) => {
    // Check rows
    for (let i = 0; i < 8; i++) {
      let startPosition = null;
      let connectedTiles = [];
      for (let j = 0; j < 8; j++) {
        if (board[j][i] === playerId) {
          if (startPosition === null) {
            startPosition = j;
          }
          connectedTiles.push([j, i]);
        } else {
          if (startPosition >= 0) {
            startPosition = null;
            connectedTiles = [];
          }
        }
        if (connectedTiles.length === connectLimit) return connectedTiles;
      }
    }
    //  Check columns
    for (let i = 0; i < 8; i++) {
      let startPosition = null;
      let connectedTiles = [];
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === playerId) {
          if (startPosition === null) {
            startPosition = j;
          }
          connectedTiles.push([i, j]);
        } else {
          if (startPosition >= 0) {
            startPosition = null;
            connectedTiles = [];
          }
        }
        if (connectedTiles.length === connectLimit) return connectedTiles;
      }
    }
    //  Check forward diagonal - 1st Half
    for (let i = 0; i < 8; i++) {
      let k = 0;
      let startPosition = null;
      let connectedTiles = [];
      for (let j = 7 - i; j < 8; j++) {
        if (board[k][j] === playerId) {
          if (startPosition === null) {
            startPosition = j;
          }
          connectedTiles.push([k, j]);
        } else {
          if (startPosition >= 0) {
            startPosition = null;
            connectedTiles = [];
          }
        }
        if (connectedTiles.length === connectLimit) return connectedTiles;
        k++;
      }
    }
    //  Check forward diagonal - 2nd Half
    for (let i = 1; i < 8; i++) {
      let k = i;
      let startPosition = null;
      let connectedTiles = [];
      for (let j = 0; j < 8 - i; j++) {
        if (board[k][j] === playerId) {
          if (startPosition === null) {
            startPosition = j;
          }
          connectedTiles.push([k, j]);
        } else {
          if (startPosition >= 0) {
            startPosition = null;
            connectedTiles = [];
          }
        }
        if (connectedTiles.length === connectLimit) return connectedTiles;
        k++;
      }
    }
    //  Check backward diagonal - 1st Half
    for (let i = 0; i < 8; i++) {
      let k = 0;
      let startPosition = null;
      let connectedTiles = [];
      for (let j = i; j >= 0; j--) {
        if (board[k][j] === playerId) {
          if (startPosition === null) {
            startPosition = j;
          }
          connectedTiles.push([k, j]);
        } else {
          if (startPosition >= 0) {
            startPosition = null;
            connectedTiles = [];
          }
        }
        if (connectedTiles.length === connectLimit) return connectedTiles;
        k++;
      }
    }
    //  Check backward diagonal - 2nd Half
    for (let i = 1; i < 8; i++) {
      let k = i;
      let startPosition = null;
      let connectedTiles = [];
      for (let j = 7; j < 8 - i; j--) {
        if (board[k][j] === playerId) {
          if (startPosition === null) {
            startPosition = j;
          }
          connectedTiles.push([k, j]);
        } else {
          if (startPosition >= 0) {
            startPosition = null;
            connectedTiles = [];
          }
        }
        if (connectedTiles.length === connectLimit) return connectedTiles;
        k++;
      }
    }
    return false;
  };
  const onPlay = (columnIndex) => {
    play(activePlayer, columnIndex);
    const playersArray = Object.keys(players).map((item) => parseInt(item));
    setActivePlayer(
      playersArray[
        (playersArray.indexOf(activePlayer) + 1) % playersArray.length
      ]
    );
  };
  return (
    <Paper
      component={Grid}
      className={classes.root}
      item
      md={8}
      container
      justify="center"
    >
      <Stage
        width={(r * 2 + spacing * 2) * 8}
        height={(r * 2 + spacing * 2) * 8}
      >
        <Layer
          offsetX={-r - spacing}
          offsetY={r + spacing}
          onMouseLeave={() => setActiveColumn(null)}
        >
          <Rect
            offsetX={r + spacing}
            offsetY={-r - spacing}
            width={(r * 2 + spacing * 2) * 8}
            height={(r * 2 + spacing * 2) * 8}
            fill="#84A4FC"
            cornerRadius={30}
          />
          {board.map((column, columnIndex) => {
            return column.map((row, rowIndex) => {
              const isActiveColumn = activeColumn === columnIndex;
              const isWinningTile =
                connectedTiles.findIndex(
                  ([x, y]) => x === columnIndex && y === rowIndex
                ) > -1;
              const getStrokeColor = () => {
                if (isActiveColumn) return "#FFA200";
              };
              return (
                <>
                  <Circle
                    x={(r + spacing) * 2 * columnIndex}
                    y={(r + spacing) * 2 * (8 - rowIndex)}
                    radius={r}
                    stroke={getStrokeColor()}
                    strokeWidth={3}
                    shadowColor={isActiveColumn ? "none" : "#434343"}
                    shadowOpacity={isActiveColumn ? 0 : 0.65}
                    shadowBlur={isActiveColumn ? 0 : 7}
                    fill={isActiveColumn ? "#f5f5f5" : "white"}
                    onMouseEnter={() => !winner && setActiveColumn(columnIndex)}
                    onClick={() => !winner && onPlay(columnIndex)}
                  />
                  {row && (
                    <PlayerAvatar
                      players={players}
                      x={(r + spacing) * 2 * columnIndex}
                      y={(r + spacing) * 2 * (8 - rowIndex)}
                      width={r * 2}
                      height={r * 2}
                      radius={r}
                      id={row}
                    />
                  )}
                  {isWinningTile && (
                    <Circle
                      x={(r + spacing) * 2 * columnIndex}
                      y={(r + spacing) * 2 * (8 - rowIndex)}
                      radius={r + 5}
                      stroke={"#FFFF00"}
                      strokeWidth={5}
                    />
                  )}
                </>
              );
            });
          })}
        </Layer>
      </Stage>
    </Paper>
  );
}
