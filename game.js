'use strict';

const generateInitialGrid = (width) => {
  const array = [...Array.from({length: width * width - 1}, (_, i) => i + 1), ""];
  const result = [];
  while (array.length) {
    result.push(array.splice(0, width));
  }
  return result;
}

const getEmplyCell = array => {
  const y = array.findIndex(array => array.includes(""));
  const x = array[y].findIndex(el => el === "");
  return {value: "", x: x, y: y};
}

const getNeighbours = (array, element) => {
  const x = element.x;
  const y = element.y;
  const neighbours = [];
  if (y > 0) {
    neighbours.push({value: array[y - 1][x], x: x, y: y - 1});
  }
  if (y < array.length - 1) {
    neighbours.push({value: array[y + 1][x], x: x, y: y + 1});
  }
  if (x > 0) {
    neighbours.push({value: array[y][x - 1], x: x - 1, y: y});
  }
  if (x < array.length - 1) {
    neighbours.push({value: array[y][x + 1], x: x + 1, y: y});
  }
  return neighbours;
}

const swapCells = (array, cellWithNumber, emptyCell) => {
  array[emptyCell.y][emptyCell.x] = cellWithNumber.value;
  array[cellWithNumber.y][cellWithNumber.x] = "";
  return array;
}

const shuffleTiles = (startArray) => {
  const numberOfShuffles = 15 * startArray.length ** 2;
  let array = startArray.map(row => [...row]);
  for (let i = 0; i < numberOfShuffles; i++) {
    const emptyCell = getEmplyCell(array);
    const neighbours = getNeighbours(array, emptyCell);
    const randomChosenNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
    array = swapCells(array, randomChosenNeighbour, emptyCell);
  }
  return array;
}

const changeGrid = (oldGrid, clickedElement) => {
  let newGrid = oldGrid.map(row => [...row]);
  const neighbours = getNeighbours(newGrid, clickedElement);
  if (neighbours.some(element => element.value === "")) {
    const emptyCell = neighbours.find(element => element.value === "");
    newGrid = swapCells(newGrid, clickedElement, emptyCell);
  }
  return newGrid;
}

export { generateInitialGrid, shuffleTiles, changeGrid };
