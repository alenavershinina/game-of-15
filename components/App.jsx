'use strict';

import React, { useState } from "react";
import Grid from "./Grid";
import { generateInitialGrid, shuffleTiles, changeGrid } from "../game";

const PUZZLE_SIZES = [2, 3, 4, 5, 6];

const App = () => {
  const [initialGrid, setInitialGrid] = useState([]);
  const [grid, setGrid] = useState([]);
  const [status, setStatus] = useState("ready");

  const startGame = (event) => {
    const field = generateInitialGrid(Number(event.target.value));
    setInitialGrid(field);
    setGrid(shuffleTiles(field));
    setStatus("started");
  }

  const checkWin = (grid) => {
    return grid.join() === initialGrid.join();
  }

  const moveTile = (tile) => {
    const newGrid = changeGrid(grid, tile);
    setGrid(newGrid);
    if (checkWin(newGrid)) {
      setStatus("finished");
    }
  }

  const onShuffle = () => {
    setGrid(shuffleTiles(initialGrid));
    setStatus("started");
  }

  return (<div>
    <h1>Game of Fifteen</h1>
    <h2>
      {
        status === "ready"
          ? "Please choose size to start game:"
          : status === "finished"
            ? "Press 'Shuffle puzzle' or select new puzzle size to start new game."
            : "The goal of the puzzle is to place the tiles in numerical order."
      }
    </h2>
    <button disabled={status === "ready" ? true : false} onClick={onShuffle}>Shuffle puzzle</button>
    <label htmlFor="size">Choose size: </label>
    <select id="size" defaultValue="0" onChange={startGame}>
      <option value="0" disabled>Select</option>
      {PUZZLE_SIZES.map(size => {
        return <option key={size} value={size}>{size + "x" + size}</option>
      })}
    </select>
    <h2 style={{visibility: status === "finished" ? "visible" : "hidden", color: "red"}}>YOU WON THE GAME!</h2>
    <Grid grid={grid} cellClicked={moveTile} gridDisabled={status === "finished"}/>
  </div>)
}

export default App;
