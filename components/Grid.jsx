'use strict';

import React from 'react';

const Grid = (props) => {

  const handleClick = event => {
    if (!props.gridDisabled) {
      const x = Number(event.target.dataset.xPosition);
      const y = Number(event.target.dataset.yPosition);
      const cell = {value: event.target.innerText, x: x, y: y};
      props.cellClicked(cell);
    }
  }

  const getRows = array => {
    return array.map((row, index) => {
      return (<tr key={index}>{getCells(row, index)}</tr>)
    });
  }
  const getCells = (row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return (
        <td
          key={`${cellIndex}-${rowIndex}`}
          data-x-position={cellIndex}
          data-y-position={rowIndex}
          onClick={handleClick}
        >
            {cell}
        </td>
      )
    })
  }
  return (
    <table>
      <tbody>
        {getRows(props.grid)}
      </tbody>
    </table>
  )
}

export default Grid;
